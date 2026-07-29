export const SITE_URL = 'https://chrispecmusic.com';
export const SITE_NAME = 'Chris Pecoraro';

/**
 * The one-word form of the name — the domain, the Instagram handle, the YouTube
 * channel. People search this as often as the two-word name, so it is declared
 * as an `alternateName` in the structured data and appears in the homepage copy.
 * Kept next to SITE_NAME so the two cannot drift apart.
 */
export const BRAND_NAME = 'ChrisPecMusic';

/**
 * Default social sharing image. BuddyGuys.webp is 1133x581 — a 1.95:1 ratio,
 * near enough to the 1.91:1 that Open Graph wants that platforms won't crop
 * anything meaningful, and it shows Chris playing rather than posed.
 *
 * WebP is fine here: Facebook, LinkedIn, X, iMessage and Slack all render it in
 * link previews. If this is ever replaced, the ideal is a purpose-made 1200x630.
 */
const DEFAULT_OG_IMAGE = '/img/BuddyGuys.webp';
const DEFAULT_OG_IMAGE_ALT =
  "Chris Pecoraro playing upright bass with the Sean McKee Band at Buddy Guy's Legends in Chicago";

/**
 * Sets the title, description, canonical URL, Open Graph, and Twitter Card tags
 * for a page in one call.
 *
 * Before this existed the site had no OG or Twitter tags at all, so every link
 * shared to a client, a DM, or a social post rendered as a bare URL with no
 * image, title, or description.
 *
 * @param {object}  options
 * @param {string}  options.title        Page title, also used as og:title.
 * @param {string}  options.description  Meta description, also used as og:description.
 * @param {string} [options.image]       Absolute path to a share image, e.g. '/img/x.webp'.
 * @param {string} [options.imageAlt]    Alt text for that image.
 * @param {string} [options.type]        Open Graph type. Defaults to 'website'.
 * @param {boolean} [options.noindex]    Keep the page out of search results.
 *   Always paired with `follow`, so the page still passes link equity to
 *   everything it points at. Also add the route to EXCLUDED_ROUTES in
 *   scripts/generate-sitemap.mjs — advertising a page in the sitemap while
 *   telling crawlers to ignore it is a contradictory signal.
 */
export function useSeo({ title, description, image, imageAlt, type = 'website', noindex = false }) {
  const route = useRoute();

  // Trailing slash only on the root, matching what the sitemap advertises.
  const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '');
  const canonical = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}${image ?? DEFAULT_OG_IMAGE}`;

  useSeoMeta({
    title,
    description,
    ...(noindex ? { robots: 'noindex, follow' } : {}),

    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonical,
    // The one-word form, matching the domain. This is the name of the site as a
    // property, which is not the same thing as the name of the person who runs
    // it — that stays SITE_NAME everywhere it appears in visible copy.
    ogSiteName: BRAND_NAME,
    ogLocale: 'en_US',
    ogImage,
    ogImageAlt: imageAlt ?? DEFAULT_OG_IMAGE_ALT,

    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterImageAlt: imageAlt ?? DEFAULT_OG_IMAGE_ALT,
  });

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  });
}
