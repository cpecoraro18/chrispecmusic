export const SITE_URL = 'https://chrispecmusic.com';
export const SITE_NAME = 'Chris Pecoraro';

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
 */
export function useSeo({ title, description, image, imageAlt, type = 'website' }) {
  const route = useRoute();

  // Trailing slash only on the root, matching what the sitemap advertises.
  const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '');
  const canonical = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}${image ?? DEFAULT_OG_IMAGE}`;

  useSeoMeta({
    title,
    description,

    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonical,
    ogSiteName: SITE_NAME,
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
