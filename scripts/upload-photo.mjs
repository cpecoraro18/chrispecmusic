#!/usr/bin/env node
/**
 * Puts photos on the website: makes the 1400 px WebP for the gallery, and
 * uploads it to `web/` and the full-size JPG to `full/` in the chrispecphotos
 * bucket, with the headers each one needs (see "Media on S3" in CLAUDE.md).
 *
 *   node scripts/upload-photo.mjs <photo>... [--name <stem>] [--shape <shape>]
 *                                 [--replace] [--dry-run]
 *   node scripts/upload-photo.mjs --check-order
 *
 * A photo shows on the site as soon as it is uploaded, at the end of the
 * gallery. --shape also adds it to the end of photo-order.json; moving it
 * somewhere better is a hand edit, followed by --check-order.
 *
 * Needs ImageMagick (`magick`) and a signed-in AWS CLI (`aws`) on the PATH.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BUCKET = 'chrispecphotos';
const WEB_EDGE = 1400;
const QUALITY = 92;
// Every object is served as immutable for a year, which is why an existing
// name is refused below: browsers that have seen the old photo keep it.
const CACHE = 'public,max-age=31536000,immutable';
const ORDER_FILE = join(dirname(fileURLToPath(import.meta.url)), '../backend/getWebsitePhotos/photo-order.json');

// Width in columns and height in three-row bands, at six/four/two columns.
// Mirrors the .photo-tile--* rules in frontend/pages/photos.vue.
const SHAPES = {
  portrait: { w: 1, h: 1 },
  landscape: { w: 2, h: 1 },
  'tall-feature': { w: 2, h: 2 },
  feature: { w: 4, h: 2, phone: { w: 2, h: 1 } },
};

function parseArgs(argv) {
  const opts = { files: [], replace: false, dryRun: false, checkOrder: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--name') opts.name = argv[++i];
    else if (arg === '--shape') opts.shape = argv[++i];
    else if (arg === '--replace') opts.replace = true;
    else if (arg === '--dry-run') opts.dryRun = true;
    else if (arg === '--check-order') opts.checkOrder = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg.startsWith('--')) fail(`Unknown option ${arg}`);
    else opts.files.push(arg);
  }
  return opts;
}

function fail(message) {
  console.error(`\n${message}`);
  process.exit(1);
}

const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

/** "IMG_2041 (1).JPG" -> "img-2041-1". */
const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function existsOnS3(key) {
  try {
    run('aws', ['s3api', 'head-object', '--bucket', BUCKET, '--key', key]);
    return true;
  } catch {
    return false;
  }
}

function upload(file, key, headers, dryRun) {
  const args = ['s3', 'cp', file, `s3://${BUCKET}/${key}`, '--only-show-errors',
    '--content-type', headers.type, '--cache-control', CACHE];
  if (headers.disposition) args.push('--content-disposition', headers.disposition);
  if (dryRun) {
    console.log(`  would upload ${key}`);
    return;
  }
  run('aws', args);
  console.log(`  uploaded ${key}`);
}

function uploadPhoto(file, opts, work) {
  if (!existsSync(file)) fail(`No such file: ${file}`);
  const stem = opts.name ?? slug(basename(file, extname(file)));
  if (!stem) fail(`Can't make a name from ${file}; pass --name.`);
  console.log(`\n${basename(file)} -> ${stem}`);

  if (!opts.replace && existsOnS3(`web/${stem}.webp`)) {
    fail(`"${stem}" is already on the site. Pick another --name; replacing it ` +
      `(--replace) only reaches visitors who haven't loaded the old one, ` +
      `because the photos are cached for a year.`);
  }

  // The download is the original, untouched, when it is already a JPG with
  // nothing to hide. A photo carrying GPS is re-encoded without its EXIF, since
  // the download is public and the location is often home. Other formats
  // (PNG, TIFF, HEIC) become a JPG, which is what the page links to.
  const isJpg = /^\.jpe?g$/i.test(extname(file));
  const hasGps = run('magick', ['identify', '-format', '%[EXIF:GPSLatitude]', `${file}[0]`]) !== '';
  let full = file;
  if (!isJpg || hasGps) {
    full = join(work, `${stem}.jpg`);
    run('magick', [`${file}[0]`, '-auto-orient', '+profile', '!icc,*', '-quality', '95', full]);
    if (hasGps) console.log('  removed the GPS location from the download');
  }

  // +profile keeps the colour profile and drops the rest (EXIF, XMP), which
  // the gallery never reads.
  const web = join(work, `${stem}.webp`);
  run('magick', [`${file}[0]`, '-auto-orient', '-resize', `${WEB_EDGE}x${WEB_EDGE}>`,
    '+profile', '!icc,*', '-quality', String(QUALITY), '-define', 'webp:method=6', web]);
  const [w, h] = run('magick', ['identify', '-format', '%w %h', web]).split(' ').map(Number);
  const suggested = h > w ? 'portrait' : 'landscape';
  console.log(`  web version ${w}x${h}, a ${suggested}`);

  // Full size first: the gallery lists web/, so a photo appears the moment its
  // WebP lands, and its download link should already work by then.
  upload(full, `full/${stem}.jpg`, {
    type: 'image/jpeg',
    disposition: `attachment; filename=ChrisPecMusic-${stem}.jpg`,
  }, opts.dryRun);
  upload(web, `web/${stem}.webp`, { type: 'image/webp' }, opts.dryRun);

  return { name: stem, suggested };
}

function addToOrder(entries, dryRun) {
  const order = JSON.parse(readFileSync(ORDER_FILE, 'utf8'));
  for (const entry of entries) {
    if (order.some((e) => e.name === entry.name)) continue;
    order.push(entry);
  }
  // One entry per line, as the file is kept.
  const text = `[\n${order.map((e) => `  ${JSON.stringify(e).replace(/,"/g, ', "').replace(/":/g, '": ')}`).join(',\n')}\n]\n`;
  if (!dryRun) writeFileSync(ORDER_FILE, text);
  console.log(`\n${dryRun ? 'Would add' : 'Added'} ${entries.map((e) => e.name).join(', ')} to the end of photo-order.json.`);
}

/**
 * Lays the gallery out the way the browser does (grid-auto-flow: dense) at
 * each width, and reports any band that isn't full. Bands are three grid rows,
 * so a band here is one row of portraits.
 */
function checkOrder() {
  const order = JSON.parse(readFileSync(ORDER_FILE, 'utf8'));
  let ok = true;
  for (const [label, cols] of [['desktop', 6], ['tablet', 4], ['phone', 2]]) {
    const filled = [];
    const free = (r, c) => !filled[r]?.[c];
    for (const { name, shape } of order) {
      const base = SHAPES[shape];
      if (!base) fail(`"${name}" has an unknown shape "${shape}".`);
      const { w, h } = cols === 2 && base.phone ? base.phone : base;
      for (let r = 0, placed = false; !placed; r++) {
        for (let c = 0; c + w <= cols && !placed; c++) {
          let fits = true;
          for (let y = 0; y < h && fits; y++) for (let x = 0; x < w && fits; x++) fits = free(r + y, c + x);
          if (!fits) continue;
          for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) (filled[r + y] ??= [])[c + x] = true;
          placed = true;
        }
      }
    }
    const gaps = filled.map((row, r) => [r + 1, cols - row.filter(Boolean).length]).filter(([, n]) => n > 0);
    if (gaps.length === 0) {
      console.log(`${label} (${cols} columns): ${filled.length} bands, no gaps`);
    } else {
      ok = false;
      console.log(`${label} (${cols} columns): ` + gaps.map(([r, n]) => `band ${r} is ${n} short`).join(', '));
    }
  }
  if (!ok) process.exitCode = 1;
}

const opts = parseArgs(process.argv.slice(2));
if (opts.help || (!opts.checkOrder && opts.files.length === 0)) {
  console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').match(/\/\*\*([\s\S]*?)\*\//)[1].replace(/^ \* ?/gm, ''));
  process.exit(opts.help ? 0 : 1);
}
if (opts.checkOrder) {
  checkOrder();
  process.exit();
}
if (opts.name && opts.files.length > 1) fail('--name only works with one photo at a time.');
if (opts.name && opts.name !== slug(opts.name)) fail(`Use lowercase words and dashes for --name, e.g. "${slug(opts.name)}".`);
if (opts.shape && !SHAPES[opts.shape]) fail(`--shape is one of: ${Object.keys(SHAPES).join(', ')}.`);
for (const tool of ['magick', 'aws']) {
  try {
    run(tool, ['--version']);
  } catch {
    fail(`Can't find "${tool}" on the PATH.`);
  }
}

const work = mkdtempSync(join(tmpdir(), 'upload-photo-'));
try {
  const uploaded = opts.files.map((file) => uploadPhoto(file, opts, work));
  if (opts.shape) {
    addToOrder(uploaded.map(({ name }) => ({ name, shape: opts.shape })), opts.dryRun);
    console.log('Run --check-order after moving them into place, then commit and push to deploy.');
  } else {
    console.log(`\n${opts.dryRun ? 'Nothing uploaded (dry run).' : 'Live now, at the end of the gallery.'} To place them, add to photo-order.json:`);
    for (const { name, suggested } of uploaded) console.log(`  {"name": "${name}", "shape": "${suggested}"},`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
