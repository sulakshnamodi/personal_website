// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

// The public URL of the site. Used for canonical links, Open Graph tags and sitemap.xml.
// Set SITE_URL in Cloudflare Pages (Settings → Environment variables) once the custom
// domain is connected, or change the fallback below.
const SITE_URL = process.env.SITE_URL || 'https://sulakshna-umrit.pages.dev';

// Every file in /public, e.g. "/images/portrait.jpg". Listed here (plain Node, project
// root known) so Media.astro can show a placeholder for missing images on any build machine.
const publicDir = fileURLToPath(new URL('./public/', import.meta.url));
const publicFiles = fs
  .readdirSync(publicDir, { recursive: true, withFileTypes: true })
  .filter((d) => d.isFile())
  .map((d) => '/' + path.relative(publicDir, path.join(d.parentPath, d.name)).split(path.sep).join('/'));

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  vite: {
    define: {
      __PUBLIC_FILES__: JSON.stringify(publicFiles),
    },
  },
});
