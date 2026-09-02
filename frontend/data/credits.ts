/**
 * What Chris actually did on a given record or video.
 *
 * Shared by data/discography.ts and data/videos.ts so the same role is spelled
 * the same way in both. These render as visible text on /portfolio, and 'Mix'
 * in one file drifting to 'Mixing' in the other would show up on the page.
 *
 * To add a role — 'Master', 'Production' — add it to the union below and it is
 * immediately usable in either file.
 */
export type Credit =
  | 'Bass'
  | 'Upright Bass'
  | 'Electric Bass'
  | 'Guitar'
  | 'Mix';

/**
 * A role that covers one track rather than the whole release.
 *
 * Singles can use the bare role, but an EP or album cannot: a flat 'Mix' on a
 * six-track record claims all six. Naming the track is the difference between
 * an accurate credit and an overclaim on someone else's release.
 */
export interface ScopedCredit {
  role: Credit;
  /** Exact track title, as it appears on the release. */
  track: string;
}

export type CreditEntry = Credit | ScopedCredit;

/** Anything with something to credit beyond playing bass. */
export interface Credited {
  /** Omit when the answer is just bass; see DEFAULT_CREDITS. */
  credits?: CreditEntry[];
}

/**
 * Most entries are bass and nothing else, so they leave `credits` off rather
 * than repeating ['Bass'] a few dozen times.
 */
export const DEFAULT_CREDITS: readonly CreditEntry[] = ['Bass'];

/** The roles to display for an entry, filled in with the default. */
export function creditsFor(item: Credited): readonly CreditEntry[] {
  return item.credits?.length ? item.credits : DEFAULT_CREDITS;
}

/**
 * A scoped credit always names its track, even where that repeats the title of
 * the release it sits on. The album grid renders these in a popup that carries
 * no album name of its own — and below 768px that popup is centered in the
 * viewport, detached from the cover that opened it — so anything relative to
 * "this record" has nothing to refer back to.
 */
function formatCredit(entry: CreditEntry): string {
  return typeof entry === 'string' ? entry : `${entry.role} on “${entry.track}”`;
}

/** The one-line form used on the cards, e.g. 'Bass · Mix'. */
export function creditLine(item: Credited): string {
  return creditsFor(item).map(formatCredit).join(' · ');
}
