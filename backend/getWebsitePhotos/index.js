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

// The gallery order, by file stem. S3 only lists alphabetically, so the order
// lives here and the whole prefix is listed and sorted on every request — at a
// few dozen photos that is one S3 call. A photo uploaded but not yet added here
// still shows, after the listed ones, alphabetically; a stem listed here with no
// file behind it is simply skipped.
const ORDER = require('./photo-order.json');
const rank = new Map(ORDER.map((stem, i) => [stem, i]));

const listAllStems = async (bucketName) => {
  const stems = [];
  let ContinuationToken;
  do {
    const data = await s3.listObjectsV2({
      Bucket: bucketName,
      Prefix: LIST_PREFIX,
      ContinuationToken,
    }).promise();
    for (const file of data.Contents) {
      if (file.Key === LIST_PREFIX) continue;
      stems.push(file.Key.slice(LIST_PREFIX.length).replace(/\.[^.]+$/, ''));
    }
    ContinuationToken = data.IsTruncated ? data.NextContinuationToken : undefined;
  } while (ContinuationToken);
  return stems;
};

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;

  // Number(...) rather than the previous `|| 8`: a non-numeric ?maxKeys= used
  // to produce NaN, which S3 rejects, so a junk query string turned into a 500
  // rather than a sensible default.
  const requested = Number.parseInt(event.queryStringParameters?.maxKeys, 10);
  const maxKeys = Number.isFinite(requested) && requested > 0
    ? Math.min(requested, MAX_PAGE_SIZE)
    : DEFAULT_PAGE_SIZE;

  // The token is now an offset into the sorted list rather than an S3
  // continuation token, which cannot page through a custom order. Anything
  // unparseable — including an old S3 token from a page loaded before this
  // deployed — starts from the top.
  // Digits only: S3 tokens often begin with one, and parseInt would read them as
  // a small offset.
  const token = event.queryStringParameters?.token;
  const start = /^\d+$/.test(token ?? '') ? Number(token) : 0;

  try {
    const stems = await listAllStems(bucketName);
    const position = stem => rank.has(stem) ? rank.get(stem) : ORDER.length;
    stems.sort((a, b) => position(a) - position(b) || a.localeCompare(b));

    const base = `https://${bucketName}.s3.amazonaws.com`;

    const photos = stems.slice(start, start + maxKeys).map(stem => ({
      name: stem,
      web: `${base}/${LIST_PREFIX}${stem}.webp`,
      full: `${base}/${DOWNLOAD_PREFIX}${stem}.jpg`,
    }));

    const end = start + maxKeys;
    const isTruncated = end < stems.length;

    return {
      statusCode: 200,
      body: JSON.stringify({
        photos,
        // Kept for one deploy. The two halves of this repo deploy independently
        // off the same push, so an additive response means it does not matter
        // which finishes first. Remove once the frontend reading `photos` is
        // live.
        images: photos.map(photo => photo.web),
        isTruncated,
        token: isTruncated ? String(end) : null,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
