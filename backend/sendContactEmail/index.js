const AWS = require('aws-sdk');
const axios = require('axios');

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const AWS_REGION = process.env.AWS_REGION || 'us-east-2';
const RECAPTCHA_SCORE_THRESHOLD = process.env.RECAPTCHA_SCORE_THRESHOLD || 0.5;

const ses = new AWS.SES({ region: AWS_REGION });

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

        // Send email using SES
        const params = {
            Destination: {
                ToAddresses: [EMAIL_ADDRESS]
            },
            Message: {
                Body: {
                    Text: {
                        Data: `🎸 New Contact Form Submission! 🎶\n\nFrom: ${body.email}\n\nMessage:\n${body.message}`
                    }
                },
                Subject: { Data: '🎵 New Contact Form Submission - ChrisPecMusic.com 🎵' }
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
