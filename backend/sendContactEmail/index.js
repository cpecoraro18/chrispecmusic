const AWS = require('aws-sdk');
const axios = require('axios');

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const AWS_REGION = process.env.AWS_REGION || 'us-east-2';
const RECAPTCHA_SCORE_THRESHOLD = process.env.RECAPTCHA_SCORE_THRESHOLD || 0.5;

const ses = new AWS.SES({ region: AWS_REGION });

// Caps on what a single submission can contain. Without these a bot can POST a
// multi-megabyte body, which SES would reject anyway but only after we have
// paid for the reCAPTCHA round trip and the invocation time.
const MAX_LENGTHS = {
    name: 100,
    email: 254, // the maximum length of an address per RFC 5321
    message: 5000,
};

// Deliberately loose: the address is used as the Reply-To, so it only has to be
// well-formed enough that SES will accept it. Anything stricter starts
// rejecting real addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async (event) => {
    try {
        let body;
        try {
            body = JSON.parse(event.body);
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid JSON in the request body', error: error.message })
            };
        }

        // Check if required fields are missing
        if (!body.email || !body.message || !body.recaptcha) {
            console.error('Missing required form data:', body);
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing email, message, or reCAPTCHA response in form data' })
            };
        }

        // The name input carries `required`, but the form is `novalidate` and
        // nothing checks it before submitting, so an empty name genuinely does
        // reach here. Treat it as optional rather than reject a real inquiry
        // over a field the visitor was never actually forced to fill in.
        const name = typeof body.name === 'string' ? body.name.trim() : '';
        const email = String(body.email).trim();
        const message = String(body.message).trim();

        const tooLong = Object.entries({ name, email, message })
            .find(([field, value]) => value.length > MAX_LENGTHS[field]);

        if (tooLong) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `The ${tooLong[0]} field is too long (max ${MAX_LENGTHS[tooLong[0]]} characters)`
                })
            };
        }

        if (!EMAIL_PATTERN.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid email address' })
            };
        }

        // Verify reCAPTCHA
        try {
            const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
                params: {
                    secret: RECAPTCHA_SECRET,
                    response: body.recaptcha
                }
            });

            const data = response.data;

            if (!data.success || data.score < RECAPTCHA_SCORE_THRESHOLD) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'reCAPTCHA verification failed' })
                };
            }
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'reCAPTCHA verification error', error: error.message })
            };
        }

        // Send email using SES.
        //
        // Source has to stay as the verified sender address — SES will not send
        // on behalf of an arbitrary submitter — so the visitor's address goes in
        // ReplyToAddresses instead. Without it, hitting Reply in a mail client
        // replies to Chris rather than to the person who filled in the form.
        const subjectName = name
            ? ` from ${name.replace(/[\r\n]+/g, ' ')}` // never let a newline reach a header
            : '';

        const params = {
            Destination: {
                ToAddresses: [EMAIL_ADDRESS]
            },
            ReplyToAddresses: [email],
            Message: {
                Body: {
                    Text: {
                        Data: `You have a new booking inquiry from your website.\n\nFrom: ${name || 'Not provided'}\nReply to: ${email}\n\nMessage:\n${message}`
                    }
                },
                Subject: { Data: `New Booking Inquiry${subjectName} - Chris Pec Music` }
            },
            Source: EMAIL_ADDRESS
        };

        try {
            await ses.sendEmail(params).promise();
        } catch (error) {
            console.error('SES error:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ 
                    status: "error",
                    message: 'Error sending email',
                    error: error.message || 'An unknown error occurred with SES' 
                })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                status: "success",
                message: 'Email sent successfully'
            })
        };

    } catch (error) {
        console.error('Unexpected error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                status: "error",
                message: 'Error sending email',
                error: error.message || 'An unknown error occurred'
            })
        };
    }
};
