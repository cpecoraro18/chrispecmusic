import { readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE_URL = 'https://chrispecmusic.com';

/**
 * Pages that should not be advertised to search engines. Add route paths here
 * (leading slash, no trailing slash).
 */
const EXCLUDED_ROUTES = new Set([]);

/**
 * Relative crawl priority. Anything not listed falls back to DEFAULT_PRIORITY.
 * Note that Google ignores <priority>; it is included because it is
 * conventional and harmless. <lastmod> and <changefreq> are deliberately
 * omitted — CI checks out shallowly, so any date we generated would be the
 * build date rather than a real modification date, and a sitemap full of
 * inaccurate lastmod values is worse than one with none.
 */
const PRIORITIES = {
  '/': '1.0',
  '/book-session': '0.9',
  '/book-live-gig': '0.9',
  '/contact': '0.8',
  '/portfolio': '0.8',
  '/about': '0.7',
};
const DEFAULT_PRIORITY = '0.6';

function collectVueFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return collectVueFiles(full);
    return entry.isFile() && entry.name.endsWith('.vue') ? [full] : [];
  });
}

/** Turns pages/about.vue into /about and pages/index.vue into /. */
function fileToRoute(pagesDir, file) {
  const route = '/' + relative(pagesDir, file).replace(/\\/g, '/').replace(/\.vue$/, '');
  return route.replace(/\/index$/, '') || '/';
}

export function generateSitemap(pagesDir, outputFile) {
  const routes = collectVueFiles(pagesDir)
    .map((file) => fileToRoute(pagesDir, file))
    // Dynamic and catch-all routes have no single canonical URL to list.
    .filter((route) => !route.includes('[') && !route.includes(':'))
    .filter((route) => !EXCLUDED_ROUTES.has(route))
    .sort((a, b) => Number(PRIORITIES[b] ?? DEFAULT_PRIORITY) - Number(PRIORITIES[a] ?? DEFAULT_PRIORITY) || a.localeCompare(b));

  const urls = routes
    .map((route) => {
      const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
      const priority = PRIORITIES[route] ?? DEFAULT_PRIORITY;
      return `  <url>\n    <loc>${loc}</loc>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated at build time from frontend/pages by scripts/generate-sitemap.mjs.
     Do not edit by hand; changes will be overwritten on the next build. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  writeFileSync(outputFile, xml, 'utf8');
  return routes;
}
