// @ts-check
import { defineConfig } from 'astro/config';

// The public URL of the site. Used for canonical links, Open Graph tags and sitemap.xml.
// Set SITE_URL in Cloudflare Pages (Settings → Environment variables) once the custom
// domain is connected, or change the fallback below.
const SITE_URL = process.env.SITE_URL || 'https://sulakshna-umrit.pages.dev';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
