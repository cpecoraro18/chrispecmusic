const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;
  const prefix = 'low/';
  const maxKeys = 100;
  const continuationToken = event.queryStringParameters?.continuationToken;

  const params = {
    Bucket: bucketName,
    Prefix: prefix,
    MaxKeys: maxKeys,
  };

  if (continuationToken) {
    params.ContinuationToken = continuationToken;
  }

  try {
    const data = await s3.listObjectsV2(params).promise();

    const imageUrls = data.Contents.map(file => 
      `https://${bucketName}.s3.amazonaws.com/${file.Key}`
    );

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
