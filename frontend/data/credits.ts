/**
 * What Chris actually did on a given record or video.
 *
 * Shared by data/discography.ts and data/videos.ts so the same role is spelled
 * the same way in both. These render as visible text on /portfolio, and 'Mix'
 * in one file drifting to 'Mixing' in the other would show up on the page.
 *
 * To add a role — 'Guitar' on a track, 'Master', 'Production' — add it to the
 * union below and it is immediately usable in either file.
 */
export type Credit =
  | 'Bass'
  | 'Upright Bass'
  | 'Electric Bass'
  | 'Guitar'
  | 'Mix';

/** Anything with something to credit beyond playing bass. */
export interface Credited {
  /** Omit when the answer is just bass; see DEFAULT_CREDITS. */
  credits?: Credit[];
}

/**
 * Most entries are bass and nothing else, so they leave `credits` off rather
 * than repeating ['Bass'] a few dozen times.
 */
export const DEFAULT_CREDITS: readonly Credit[] = ['Bass'];

/** The roles to display for an entry, filled in with the default. */
export function creditsFor(item: Credited): readonly Credit[] {
  return item.credits?.length ? item.credits : DEFAULT_CREDITS;
}

/** The one-line form used on the cards, e.g. "Bass · Mix". */
export function creditLine(item: Credited): string {
  return creditsFor(item).join(' · ');
}
