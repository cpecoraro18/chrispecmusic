/**
 * Clips for the searchable sound gallery on /portfolio.
 *
 * This is not the live footage on /portfolio (data/videos.ts). Those videos show
 * who I've played with. These are short studio clips, one sound each, tagged
 * precisely enough that a client can find "upright, walking, jazz" or "P bass
 * through the B-15" and hear exactly that.
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
 *     title: 'Motown P bass, flatwounds',
 *     blurb: 'Muted with the palm, foam under the strings, straight into the RNDI.',
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
  title: string;
  /** One line on how the sound was made. Searched, and shown under the title. */
  blurb?: string;
  /** Free-form; the genre filter is built from whatever appears. */
  genres: string[];
  /** Must match a bass on /gear exactly — the type checks it in the editor. */
  bass: BassName;
  /** Pedals, amps, DIs, and mics audible in the clip. Names from /gear. */
  gear?: GearName[];
  /** Free-form, e.g. 'Fingerstyle', 'Slap', 'Pick', 'Arco', 'Walking'. */
  techniques?: string[];
}

export const sounds: SoundClip[] = [];
