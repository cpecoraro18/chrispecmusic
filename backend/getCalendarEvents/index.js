const  google = require('google-auth-library');

const CALENDAR_ID = process.env.CALENDAR_ID;
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

exports.handler = async (event) => {
    try {
        const client = google.auth.fromJSON(GOOGLE_CREDENTIALS);
        client.scopes = ['https://www.googleapis.com/auth/calendar.readonly'];

        const response = await client.request({
            url: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
            method: 'GET',
            params: {
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
            }
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