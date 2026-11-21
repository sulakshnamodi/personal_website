# Sulakshna Umrit — personal website

Single-page portfolio built with [Astro](https://astro.build) (static output) and plain CSS, hosted on Cloudflare Pages. The contact form is a Cloudflare Pages Function that checks Cloudflare Turnstile and sends email through [Resend](https://resend.com).

## Requirements

- Node.js 22 or newer (see `.nvmrc`)
- npm

## Run locally

```bash
npm install
npm run dev          # http://localhost:4321 — fast preview of the page (the contact form API is not available here)
```

To test the full site **including the contact form**, run it on Cloudflare's local runtime:

```bash
cp .dev.vars.example .dev.vars   # then edit the values
npm run preview:cf               # builds, then serves dist/ + functions/ at http://127.0.0.1:8788
```

With the example values, Turnstile uses Cloudflare's test keys (always passes). Sending will fail until `RESEND_API_KEY` is a real key.

Other commands:

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run build`   | Builds the static site into `dist/`           |
| `npm run preview` | Serves `dist/` locally (no contact form API)  |

## Editing content

- **All text and links:** `src/data/content.ts`
- **Images:** drop files into `public/images/` with these exact names. Until a file exists, a neutral placeholder is shown.
  - `portrait.jpg` (square, at least 560×560)
  - `logo-traveling-waves.png`, `logo-uio.png`, `logo-uis.png` (square, at least 144×144)
  - `about-mauritius.jpg` (tall), `about-kitchen.jpg`, `about-oslo.jpg` (square)
- **CV:** `public/cv/Sulakshna_Umrit_CV_Data_AI.pdf`
- **Colours, fonts, spacing:** `src/styles/global.css` (theme tokens at the top)
- **Social preview image:** `public/og-image.png` (1200×630)

Still to do (from the design handoff): real LinkedIn and GitHub URLs, confirm the "Off duty" line, add photos and logos.

## Project structure

```
functions/api/contact.ts   Cloudflare Pages Function: POST /api/contact
public/                    Static files (images, CV, favicon, OG image)
src/data/content.ts        All site copy
src/components/            Page sections (Nav, Hero, About, Experience, Projects, Stack, Contact)
src/scripts/               Hero canvas, scroll reveal, contact form
src/styles/global.css      Theme and all styles
src/pages/                 index page, robots.txt, sitemap.xml
```

## Environment variables

Set these in Cloudflare Pages → your project → Settings → Variables and Secrets.

| Name                        | Type                | Purpose                                                                                     |
| --------------------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`            | Secret (runtime)    | Resend API key                                                                              |
| `TURNSTILE_SECRET_KEY`      | Secret (runtime)    | Turnstile secret key                                                                        |
| `CONTACT_TO_EMAIL`          | Secret (runtime)    | Inbox that receives messages (never shown on the page)                                      |
| `CONTACT_FROM_EMAIL`        | Optional (runtime)  | Sender, e.g. `Portfolio <contact@yourdomain.com>` — must be on a domain verified in Resend |
| `PUBLIC_TURNSTILE_SITE_KEY` | Plain text (build)  | Turnstile site key, embedded in the page at build time                                      |
| `SITE_URL`                  | Plain text (build)  | Public URL, e.g. `https://yourdomain.com` — used for canonical, Open Graph and sitemap     |
| `NODE_VERSION`              | Plain text (build)  | `22` (only needed if the build image defaults to an older Node)                             |

Changing a build variable (`PUBLIC_…`, `SITE_URL`) needs a new deployment to take effect.

## Deploy

Cloudflare Pages, connected to the GitHub repo:

- Framework preset: Astro (or None)
- Build command: `npm run build`
- Build output directory: `dist`

Every push to `main` deploys to production; other branches get preview URLs.
