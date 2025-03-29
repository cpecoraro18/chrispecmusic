import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const handler = async (event) => {
  const bucketName = "websitephotos2";  // 🔹 Replace with your bucket name

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