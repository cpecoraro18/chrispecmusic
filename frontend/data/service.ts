/**
 * The promises the site makes about how a session works.
 *
 * These appear in body copy on the homepage, on /book-session, and in the
 * structured data. They previously lived as `const TURNAROUND` in two separate
 * pages with a comment asking whoever edited one to remember the other, which
 * is exactly the arrangement that drifts. Change a number here and every place
 * that quotes it follows.
 */
export const TURNAROUND = '2 to 3 days';
export const TAKES_PER_TRACK = 'two or three';

/** Free revision rounds per song; past these, extra rounds are priced up front. */
export const REVISION_ROUNDS = 'two';

/** The highest sample rate files are delivered at. */
export const MAX_SAMPLE_RATE = '96 kHz';

/**
 * The styles I play, in the order they're listed everywhere. The home page,
 * both FAQs, and /book-live-gig all quote this, so the lists can't disagree;
 * a reviewer noticed when they did.
 */
export const GENRES = ['rock', 'soul', 'jazz', 'pop', 'country', 'blues', 'Americana'];

/** 'rock, soul, jazz, …, and Americana' — for mid-sentence use. */
export const GENRE_LIST = `${GENRES.slice(0, -1).join(', ')}, and ${GENRES[GENRES.length - 1]}`;

/** The same, starting with a capital, for use as a sentence or list item. */
export const GENRE_LIST_SENTENCE = GENRE_LIST.charAt(0).toUpperCase() + GENRE_LIST.slice(1);

export const CONTACT_EMAIL = 'contact@chrispecmusic.com';

export interface PricingTier {
  /** Human label for the project size, e.g. '3 to 4 songs'. */
  tracks: string;
  /** Per-song price in USD. */
  price: number;
  /** Highlights the tier as the best value. At most one should be true. */
  featured?: boolean;
}

export const PRICING: PricingTier[] = [
  { tracks: '1 song', price: 100 },
  { tracks: '3 to 4 songs', price: 90 },
  { tracks: '5+ songs', price: 80, featured: true },
];

/**
 * The lowest per-song rate, quoted as the "from" price in meta descriptions
 * and in the JSON-LD offer. Derived so it cannot contradict the table above.
 */
export const STARTING_PRICE = Math.min(...PRICING.map((tier) => tier.price));
