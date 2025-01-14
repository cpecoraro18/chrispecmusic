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
        const body = JSON.parse(event.body);
        // Check if the required form elements are present
        if (!body.email || !body.message || !body.recaptcha) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing email, message, or reCAPTCHA response in form data' })
            };
        }

        // Verify reCAPTCHA
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${body.recaptcha}`);
        const data = response.data;

        if (!data.success || data.score < RECAPTCHA_SCORE_THRESHOLD) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'reCAPTCHA verification failed' })
            };
        }

        // Send email using Amazon SES
        const params = {
            Destination: {
                ToAddresses: [EMAIL_ADDRESS]
            },
            Message: {
                Body: {
                    Text: {
                        Data: `Email: ${body.email}\n\nMessage: ${body.message}`
                    }
                },
                Subject: { Data: 'Contact Form Submission' }
            },
            Source: EMAIL_ADDRESS
        };

        await ses.sendEmail(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email', error: error.message })
        };
    }
};