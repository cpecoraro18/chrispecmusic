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
- `getWebsitePhotos/` — paginated listing of low-res watermarked photos from an S3 bucket's `low/` prefix, used by `pages/photos.vue`.
- `createCheckoutSession/` — creates a Stripe Checkout session to purchase a full-res photo download.
- `downloadRedirect/` — after Stripe payment succeeds, generates a short-lived signed S3 URL for the full-res photo (`full/` prefix) and 302-redirects to it.

Photo purchase flow: `getWebsitePhotos` (list) → `createCheckoutSession` (Stripe) → `downloadRedirect` (signed download after payment).

All Lambdas read config from environment variables (Stripe keys, SES sender address, reCAPTCHA secret, Google service account JSON, S3 bucket name, calendar ID) — there are no `.env` files committed; these are configured directly on the Lambda functions in AWS.

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
