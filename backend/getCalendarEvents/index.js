const  google = require('google-auth-library');

const CALENDAR_ID = process.env.CALENDAR_ID;
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

exports.handler = async (event) => {
    try {
        const client = google.auth.fromJSON(GOOGLE_CREDENTIALS);
        client.scopes = ['https://www.googleapis.com/auth/calendar.readonly'];

        const queryParams = event.queryStringParameters || {};
        const { timeMin, timeMax } = queryParams;

        const params = {
            singleEvents: true,
            orderBy: 'startTime'
        };

        // Default to today if no timeMin specified
        if (timeMin) {
            params.timeMin = new Date(timeMin).toISOString();
        } else {
            params.timeMin = new Date().toISOString();
        }

        if (timeMax) {
            params.timeMax = new Date(timeMax).toISOString();
        }

        const response = await client.request({
            url: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
            method: 'GET',
            params
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching calendar events', error: error.message })
        };
    }
};