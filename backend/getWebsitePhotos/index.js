const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Photos returned per request. The gallery grid is four wide on a desktop, so
// the old default of 8 filled two rows and then stopped — most visitors hit
// "Load More" immediately, which is a round trip that buys them half a screen.
// 24 fills six rows.
const DEFAULT_PAGE_SIZE = 24;
const MAX_PAGE_SIZE = 100;

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;
  const prefix = 'low/';

  // Number(...) rather than the previous `|| 8`: a non-numeric ?maxKeys= used
  // to produce NaN, which S3 rejects, so a junk query string turned into a 500
  // rather than a sensible default.
  const requested = Number.parseInt(event.queryStringParameters?.maxKeys, 10);
  const maxKeys = Number.isFinite(requested) && requested > 0
    ? Math.min(requested, MAX_PAGE_SIZE)
    : DEFAULT_PAGE_SIZE;

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
