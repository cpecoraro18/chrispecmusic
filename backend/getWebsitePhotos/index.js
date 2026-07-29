const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Photos returned per request. The gallery grid is four wide on a desktop, so
// the old default of 8 filled two rows and then stopped — most visitors hit
// "Load More" immediately, which is a round trip that buys them half a screen.
// 24 fills six rows.
const DEFAULT_PAGE_SIZE = 24;
const MAX_PAGE_SIZE = 100;

// Every photo exists at two sizes, under two prefixes, sharing one file stem:
//
//   web/    1400px  webp   the grid and the lightbox
//   full/   original jpg   the download
//
// One file serves both grid and lightbox deliberately. The grid renders it at
// ~300px and the lightbox at up to ~1100px, so 1400px covers both — and because
// it is the same URL, opening a photo is a cache hit rather than a second
// download. A separate thumbnail tier would shave the grid but make every
// lightbox open wait on the network.
//
// Only `web/` is listed; the `full/` URL is derived from the stem rather than
// listed separately, which is what keeps the two prefixes to one round trip.
// Both are public, so the page links straight to S3 — the photos are free and
// there is no purchase flow, so an endpoint in front of the originals would add
// a Lambda and a redirect without actually controlling access to anything.
// The originals are uploaded with `Content-Disposition: attachment` because the
// `download` attribute on an `<a>` is ignored cross-origin.
const LIST_PREFIX = 'web/';
const DOWNLOAD_PREFIX = 'full/';

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;

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
    Prefix: LIST_PREFIX,
    MaxKeys: maxKeys,
  };

  if (token) {
    params.ContinuationToken = token;
  }

  try {
    const data = await s3.listObjectsV2(params).promise();

    const base = `https://${bucketName}.s3.amazonaws.com`;

    const photos = data.Contents
      .filter(file => file.Key !== LIST_PREFIX)
      .map(file => {
        const stem = file.Key.slice(LIST_PREFIX.length).replace(/\.[^.]+$/, '');
        return {
          name: stem,
          web: `${base}/${LIST_PREFIX}${stem}.webp`,
          full: `${base}/${DOWNLOAD_PREFIX}${stem}.jpg`,
        };
      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        photos,
        // Kept for one deploy. The two halves of this repo deploy independently
        // off the same push, so an additive response means it does not matter
        // which finishes first. Remove once the frontend reading `photos` is
        // live.
        images: photos.map(photo => photo.web),
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
