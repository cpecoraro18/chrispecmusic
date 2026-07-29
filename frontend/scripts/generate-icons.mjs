/**
 * Generates `data/icons.generated.ts` from the Font Awesome Free SVG files in
 * node_modules, pulling only the icons this site actually uses.
 *
 * Why this exists: the site used to load Font Awesome's kit script from
 * kit.fontawesome.com, which meant a third-party origin, a DNS lookup plus TLS
 * handshake, and a few hundred KB of JavaScript whose job was to inject markup
 * for 21 icons. Icons rendered after that script ran, so they popped in a beat
 * after the surrounding text — including the chevron in the homepage hero.
 * Inlining the path data ships the same glyphs as part of the HTML, with no
 * extra request and nothing to wait for.
 *
 * The path data is read from the package rather than copied by hand because
 * several call sites used Font Awesome 4 aliases (`fa-map-marker`,
 * `fa-play-circle`) whose modern equivalents are differently drawn and have
 * different viewBoxes. Transcribing 21 path strings by hand would silently
 * produce slightly wrong icons.
 *
 * Run `npm run icons` after changing ICONS. The output is committed, so a normal
 * build never touches @fortawesome/fontawesome-free — it is a devDependency used
 * only by this script.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const faDir = resolve(rootDir, 'node_modules/@fortawesome/fontawesome-free/svgs');
const outFile = resolve(rootDir, 'data/icons.generated.ts');

/**
 * The icons the site renders, keyed by the name passed to <AppIcon name="...">.
 * `style` picks the Font Awesome directory; `file` is the icon's canonical
 * Font Awesome 6/7 name, which is not always the name we call it by.
 */
const ICONS = {
  calendar: { style: 'solid', file: 'calendar' },
  'champagne-glasses': { style: 'solid', file: 'champagne-glasses' },
  'chevron-down': { style: 'solid', file: 'chevron-down' },
  download: { style: 'solid', file: 'download' },
  drum: { style: 'solid', file: 'drum' },
  envelope: { style: 'solid', file: 'envelope' },
  guitar: { style: 'solid', file: 'guitar' },
  headphones: { style: 'solid', file: 'headphones' },
  lock: { style: 'solid', file: 'lock' },
  // Was `fa-map-marker`, a Font Awesome 4 name. `location-dot` is the current
  // spelling of the same pin.
  'location-dot': { style: 'solid', file: 'location-dot' },
  'martini-glass': { style: 'solid', file: 'martini-glass' },
  music: { style: 'solid', file: 'music' },
  // Was `fa-play-circle`, likewise a Font Awesome 4 name.
  'circle-play': { style: 'solid', file: 'circle-play' },
  rotate: { style: 'solid', file: 'rotate' },
  sliders: { style: 'solid', file: 'sliders' },
  spinner: { style: 'solid', file: 'spinner' },
  users: { style: 'solid', file: 'users' },
  video: { style: 'solid', file: 'video' },
  xmark: { style: 'solid', file: 'xmark' },
  instagram: { style: 'brands', file: 'instagram' },
  youtube: { style: 'brands', file: 'youtube' },
};

function extract(name, { style, file }) {
  const path = resolve(faDir, style, `${file}.svg`);

  let svg;
  try {
    svg = readFileSync(path, 'utf8');
  } catch {
    throw new Error(
      `Icon "${name}" expects ${style}/${file}.svg, which is not in the Font Awesome package. ` +
        `Run npm install, or check the icon's current name at fontawesome.com/icons.`
    );
  }

  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);

  if (!viewBox) throw new Error(`Icon "${name}" (${style}/${file}.svg) has no viewBox.`);

  // The component renders exactly one <path>. Every icon in ICONS is currently
  // a single path with no other shapes, and this guards that assumption rather
  // than quietly dropping half a glyph if a future icon is built differently.
  if (paths.length !== 1) {
    throw new Error(
      `Icon "${name}" (${style}/${file}.svg) has ${paths.length} <path> elements; AppIcon renders one. ` +
        `Either pick a single-path icon or extend AppIcon.vue to handle multiple.`
    );
  }
  if (/<(circle|rect|polygon|ellipse|g|defs|use)\b/.test(svg)) {
    throw new Error(
      `Icon "${name}" (${style}/${file}.svg) contains shapes other than <path>, which AppIcon drops.`
    );
  }

  return { viewBox, path: paths[0] };
}

const entries = Object.entries(ICONS)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, spec]) => [name, extract(name, spec)]);

const faVersion = JSON.parse(
  readFileSync(resolve(rootDir, 'node_modules/@fortawesome/fontawesome-free/package.json'), 'utf8')
).version;

const body = entries
  .map(
    ([name, { viewBox, path }]) =>
      `  ${JSON.stringify(name)}: {\n    viewBox: '${viewBox}',\n    path: '${path}',\n  },`
  )
  .join('\n');

// The attribution below opens with `/*!` deliberately. The icons are CC BY 4.0,
// which requires credit, and Font Awesome's license asks that the credit comment
// not be stripped from code. A plain `/**` comment is discarded by the minifier,
// which would ship their artwork with the credit removed. Minifiers preserve
// `/*!` comments as legal notices, so this one reaches the built bundle. It is
// kept to four lines because the license asks that attribution stay terse, and
// it is in every visitor's download. Verify with:
//   npx esbuild data/icons.generated.ts --minify | head -c 200
const out = `/*!
 * Icon path data from Font Awesome Free ${faVersion} (https://fontawesome.com)
 * License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
 * Copyright Fonticons, Inc.
 */

/**
 * GENERATED FILE — do not edit by hand.
 * Run \`npm run icons\` to regenerate from scripts/generate-icons.mjs.
 */
export interface IconDefinition {
  viewBox: string;
  path: string;
}

export const ICONS: Record<string, IconDefinition> = {
${body}
};

export type IconName = keyof typeof ICONS;
`;

writeFileSync(outFile, out, 'utf8');
console.info(`[icons] wrote ${entries.length} icons to data/icons.generated.ts (Font Awesome ${faVersion})`);
