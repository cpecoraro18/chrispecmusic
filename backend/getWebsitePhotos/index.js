const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = "chrispecphotos";  // 🔹 Replace with your bucket name

  try {
    const data = await s3.listObjectsV2({ Bucket: bucketName }).promise();

    const imageUrls = data.Contents.map(file => 
      `https://${bucketName}.s3.amazonaws.com/${file.Key}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ images: imageUrls }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};