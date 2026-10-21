---
name: add-photo
description: Put one or more photos on chrispecmusic.com's photo gallery. Names them, uploads the full-size JPG and the 1400px WebP to the chrispecphotos S3 bucket with scripts/upload-photo.mjs, and places them in photo-order.json without leaving gaps in the mosaic. Use when the user says /add-photo, "add this photo to the site", "upload photos to the gallery", or gives image files for the website.
---

# Add a photo to the gallery

Read "Media on S3" in the repo's CLAUDE.md first. The script does the upload; your job is
the parts that need judgment: the name, the shape and the position.

## 1. Look at each photo
Open each image with Read so you can see it. If a path isn't given, ask for it (photos usually
live under `E:\Chris\Photography\`).

For each photo, propose:
- **A name**: lowercase words and dashes, describing what's in the shot, in the style of the
  existing names in `backend/getWebsitePhotos/photo-order.json` (e.g. `buddy-guys-jazz-bass-profile`,
  `bw-jazz-bass-tank-top`). It becomes the download's filename, so it should be readable.
  It must not already be in the order file.
- **A shape**: `portrait` or `landscape` from its orientation. Suggest `tall-feature` (a strong
  portrait) or `feature` (a strong landscape) only for a standout shot, and say why.
- **A position**: next to the photos from the same gig or with the same look.

Show these as a short table and wait for the user to approve or change them.

## 2. Upload
One photo at a time, so each gets its own name:

```
node scripts/upload-photo.mjs "<path>" --name <name>
```

The photo is live the moment it lands (at the end of the gallery). The script refuses a name
that is already on S3; don't pass `--replace` unless the user asks to replace a photo, and tell
them old visitors will keep seeing the cached one. If it says the GPS location was removed,
mention it.

## 3. Place it
Insert each entry into `backend/getWebsitePhotos/photo-order.json` at its position, then run:

```
node scripts/upload-photo.mjs --check-order
```

It must report no gaps at all three widths. If a band is short, fix it by changing shapes or
nudging photos (a landscape fills two portrait slots; swapping a portrait for its neighbour
landscape moves the gap). Prefer moving the new photos over reshuffling the existing order.
Show the user the final placement.

## 4. Deploy
The order only takes effect when the `getWebsitePhotos` Lambda redeploys, which happens on push
to `main` (production, no staging). Commit just `photo-order.json` with a message like
"Add <n> photos to the gallery", then ask before pushing.
