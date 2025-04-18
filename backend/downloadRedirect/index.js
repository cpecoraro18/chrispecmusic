const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const query = event.queryStringParameters;
  const imageId = query?.imageId;

  if (!imageId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing imageId' }),
    };
  }

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `full/${imageId}`,
    Expires: 60 * 5,
  };

  try {
    const signedUrl = s3.getSignedUrl('getObject', params);

    return {
      statusCode: 302,
      headers: {
        Location: signedUrl,
      },
      body: '',
    };
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not generate download link' }),
    };
  }
};