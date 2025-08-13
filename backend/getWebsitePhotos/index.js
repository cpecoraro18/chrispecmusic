const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;
  const prefix = 'low/';
  const maxKeys = 10;
  const token = event.queryStringParameters?.token;

  const params = {
    Bucket: bucketName,
    Prefix: prefix,
    MaxKeys: maxKeys,
  };

  if (token) {
    params.ContinuationToken = token;
  }

  try {
    const data = await s3.listObjectsV2(params).promise();

    const imageUrls = data.Contents
    .filter(file => file.Key !== prefix)
    .map(file => `https://${bucketName}.s3.amazonaws.com/${file.Key}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        images: imageUrls,
        isTruncated: data.IsTruncated,
        token: data.NextContinuationToken || null,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
