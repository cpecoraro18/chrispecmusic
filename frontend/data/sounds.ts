/**
 * Clips for the sound gallery on /book-session.
 *
 * This is not the performance videos on /portfolio (data/videos.ts). Those videos show
 * who I've played with. These are short studio clips, one sound each. Genre,
 * bass, and technique are the filters; gear is not shown, but the search finds
 * it, so "B-15" still turns up the clip through the BassRig Fifteen.
 *
 * While this list is empty, `npm run dev` shows the made-up entries in
 * sounds.demo.ts so the gallery can be tried out, and production hides the
 * gallery entirely. See utils/sounds.ts.
 *
 * Like data/videos.ts, `id` is the bare YouTube ID — the eleven characters
 * after `v=` or `youtu.be/`, not the share URL. Unlisted uploads work.
 *
 * Example:
 *
 *   {
 *     id: 'dQw4w9WgXcQ',
 *     title: 'P Bass, flatwounds',
 *     genres: ['Soul', 'R&B'],
 *     bass: 'Fender P Bass',
 *     gear: ['Rupert Neve Designs RNDI', 'Cali76 Bass Compressor'],
 *     techniques: ['Fingerstyle', 'Palm muted'],
 *   },
 */
import type { BassName, GearName } from './gear';

export interface SoundClip {
  /** YouTube video ID, e.g. 'dQw4w9WgXcQ'. Not a URL. */
  id: string;
  /** The bass and a word or two, e.g. 'P Bass, driven' or 'Upright, bowed'. */
  title: string;
  /** Free-form; the genre filter is built from whatever appears. */
  genres: string[];
  /** Must match a bass on /gear exactly — the type checks it in the editor. */
  bass: BassName;
  /** Pedals, amps, DIs, and mics audible in the clip. Names from /gear. Searchable, not shown. */
  gear?: GearName[];
  /** Free-form, e.g. 'Fingerstyle', 'Slap', 'Pick', 'Arco', 'Walking'. The technique filter. */
  techniques?: string[];
}

export const sounds: SoundClip[] = [];
