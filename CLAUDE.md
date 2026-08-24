# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose of this site

This is the marketing website for Chris Pecoraro, a professional electric and upright bassist based in Chicago (chrispecmusic.com). The site exists to convert visitors into paying clients: it showcases his portfolio, audio samples, discography, and client reviews (pulled from his Fiverr history), and drives visitors to book remote bass-recording sessions via the contact form / booking page. Every feature should be evaluated against that goal — does it help a prospective client trust his playing and reach out to hire him.

## Architecture

Two independently deployed halves in one repo:

- `frontend/` — a Nuxt 3 (Vue 3) SSR site, statically generated (`nuxi generate`) and deployed to GitHub Pages, served at chrispecmusic.com.
- `backend/` — a set of standalone AWS Lambda functions (plain Node.js, one `index.js` + `package.json` per folder, no shared framework), fronted by API Gateway at `https://api.chrispecmusic.com`, deployed to AWS S3/Lambda.

There is no shared code between the two halves and no local dev server/emulator for the Lambdas — they're only reachable at the deployed `api.chrispecmusic.com` endpoints, so frontend components hit that URL directly (see `EventsList.vue`, `ContactForm.vue`, `pages/photos.vue`) even during local frontend development.

### Frontend (`frontend/`)

- `pages/` — one file per route (Nuxt file-based routing): `index`, `about`, `book-session`, `contact`, `events`, `gear`, `links`, `photos`, `portfolio`.
- `components/` — shared building blocks: `ReviewList.vue` (hardcoded client testimonials pulled from Fiverr — edit this array directly to add reviews, there is no CMS/backend for reviews), `ContactForm.vue`, `EventsList.vue`, `BassAudioSamples.vue`, `DiscographyList.vue`, `SiteHeader.vue`, `SiteFooter.vue`, `SocialLinks.vue`.
- `nuxt.config.ts` — loads Bootstrap 5 (CSS/JS from CDN) and Font Awesome as global head assets, plus Google Tag Manager (GTM-MFS3DSBM). Custom Vite `rollupOptions` rename JS output to `assets/[name]-[hash].js`.
- `public/` — static assets (favicon, sitemap, robots.txt, `audio/`, `img/`).
- Styling is plain scoped `<style>` blocks per component using Bootstrap classes plus CSS custom properties (`--bg-grey`, `--text-color-dark`, `--bg-dark-blue`, etc.) for theming — no CSS framework like Tailwind.
- `frontend/server/` only contains a `tsconfig.json`; there are no Nitro server routes/API handlers in use.

### Backend (`backend/`)

Each subfolder is one independently deployable Lambda function (matching AWS function name), invoked through API Gateway:

- `sendContactEmail/` — validates a reCAPTCHA v3 token, then emails the contact-form submission via AWS SES.
- `getCalendarEvents/` — reads upcoming events from a Google Calendar via a service account (`google-auth-library`), used by `EventsList.vue`.
- `getWebsitePhotos/` — paginated listing of the photo gallery from the `chrispecphotos` S3 bucket, used by `pages/photos.vue`.

### Media on S3

The `chrispecphotos` bucket holds everything too large to commit. All of it is public read, and all of it is linked directly — there is no Lambda in front of any of these:

- `web/` — 1400 px WebP, one per photo. Serves the gallery grid *and* the lightbox; one file for both means opening a photo is a cache hit, not a second download.
- `full/` — the full-resolution original of each photo, for the download link.
- `audio-wav/` — the twelve uncompressed bass samples, for the "Download WAV" links. The MP3s that actually play on the page are committed under `frontend/public/audio/`.

`web/` and `full/` must hold **identically-named files** (same stem, `.webp` vs `.jpg`). `getWebsitePhotos` lists only `web/` and derives the `full/` URL from the stem, so a mismatch is a broken download link rather than a build error.

Two non-obvious things about uploading, both of which have bitten before:

- The AWS CLI's MIME table does not know `.webp`, so a plain `aws s3 sync` uploads WebP as `binary/octet-stream`. Browsers sniff and render it anyway, so the page looks fine — pass `--content-type image/webp` explicitly, and use `cp --recursive` rather than `sync` to fix existing objects (`sync` skips files whose size and mtime already match).
- Anything meant to download rather than display needs `Content-Disposition: attachment` set on the object. The `download` attribute on an `<a>` is **ignored cross-origin**, and these links point at S3. The header also carries a `filename=ChrisPecMusic-<stem>` so saved files are branded.

`low/` is a legacy prefix, superseded by `web/`. Photos are free to download; there is no purchase flow. Two Lambdas (`createCheckoutSession`, `downloadRedirect`) previously sold full-res downloads through Stripe and were removed. **Do not rebuild a signed-URL download endpoint.** The originals are public by a deliberate decision — an endpoint in front of free files adds a Lambda and a redirect while providing no actual access control, which is exactly what made the old one a problem.

`sendContactEmail` catches all of its own errors and returns a 500 response,
which Lambda counts as a *successful* invocation — so the built-in `Errors`
metric never moves when an inquiry is lost, and an alarm on it would never fire.
The handler emits its own metrics in embedded metric format instead, under the
`ChrisPecMusic/ContactForm` namespace with a `Function` dimension: `Failure`
(SES rejected the send, Google was unreachable, the reCAPTCHA secret is wrong),
`Rejected` (a low reCAPTCHA score — the system working, never alarm on it), and
`Success`. Alarming on `Failure` catches the lost inquiries; the built-in
`Errors` and `Throttles` metrics still cover the crashes and timeouts that
happen before any log line runs, so both are worth watching.

Note that a folder added under `backend/` is deployed as a Lambda named after
itself, so anything that is not a function will fail the backend deploy.

All Lambdas read config from environment variables (SES sender address, reCAPTCHA secret, Google service account JSON, S3 bucket name, calendar ID) — there are no `.env` files committed; these are configured directly on the Lambda functions in AWS.

## Commands

### Frontend (`cd frontend`)

- `npm install` — install dependencies (also runs `nuxt prepare` via `postinstall`)
- `npm run dev` — start the Nuxt dev server
- `npm run build` — production SSR build
- `npm run generate` — static site generation (what CI uses for deployment)
- `npm run preview` — preview a built/generated output locally

There is no configured lint or test command/framework in this repo.

### Backend (`backend/<function>/`)

Each function folder is deployed independently; there's no root build script. To work on one:

```
cd backend/<function-name>
npm install
```

There is no local Lambda emulator configured — testing typically means deploying and hitting the real `api.chrispecmusic.com/<route>` endpoint.

## Deployment (CI)

Two GitHub Actions workflows, both triggered on push to `main` and path-scoped to their half of the repo:

- `.github/workflows/deploy-frontend.yml` — runs `npx nuxi generate` in `frontend/`, force-pushes the generated `frontend/.output/public` contents to the `gh-pages` branch (with a `CNAME` for chrispecmusic.com) for GitHub Pages.
- `.github/workflows/deploy-backend.yml` — zips each `backend/*/` folder (after `npm install`) and pushes it with `aws lambda update-function-code` per function, using `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` secrets, region `us-east-2`.

There's no staging environment — pushing to `main` deploys straight to production for both halves.
