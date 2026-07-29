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

export const CONTACT_EMAIL = 'contact@chrispecmusic.com';

export interface PricingTier {
  /** Human label for the project size, e.g. '3 to 4 tracks'. */
  tracks: string;
  /** Per-track price in USD. */
  price: number;
  /** Highlights the tier as the best value. At most one should be true. */
  featured?: boolean;
}

export const PRICING: PricingTier[] = [
  { tracks: '1 track', price: 100 },
  { tracks: '3 to 4 tracks', price: 90 },
  { tracks: '5+ tracks', price: 80, featured: true },
];

/**
 * The lowest per-track rate, quoted as the "from" price in meta descriptions
 * and in the JSON-LD offer. Derived so it cannot contradict the table above.
 */
export const STARTING_PRICE = Math.min(...PRICING.map((tier) => tier.price));
