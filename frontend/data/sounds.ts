/**
 * Clips for the sound gallery on the home page.
 *
 * This is not the performance videos on /portfolio (data/videos.ts). Those videos show
 * who I've played with. These are short studio clips, one sound each, described
 * by the gear alone: bass, gear, and technique are the filters. There is no
 * genre — the same rig suits too many styles to pick one honestly.
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
 *     title: 'P Bass, fingerstyle',
 *     bass: 'Fender P Bass',
 *     gear: ['Rupert Neve Designs RNDI', 'Cali76 Bass Compressor'],
 *     techniques: ['Fingerstyle', 'Palm muted'],
 *   },
 */
import type { BassName, GearName } from './gear';

export interface SoundClip {
  /** YouTube video ID, e.g. 'dQw4w9WgXcQ'. Not a URL. */
  id: string;
  /** The bass and a word or two, e.g. 'P Bass, pick' or 'Upright, bowed'. */
  title: string;
  /** Must match a bass on /gear exactly — the type checks it in the editor. */
  bass: BassName;
  /** Pedals, amps, DIs, and mics audible in the clip. Names from /gear. Shown under the title and filterable. */
  gear?: GearName[];
  /** Free-form, e.g. 'Fingerstyle', 'Slap', 'Pick', 'Arco', 'Walking'. The technique filter. */
  techniques?: string[];
}

export const sounds: SoundClip[] = [
  {
    id: 'BwsqrREBctk',
    title: 'P Bass, fingerstyle',
    bass: 'Fender P Bass',
    gear: ['Origin Effects BassRig Fifteen', 'Rupert Neve Designs RNDI'],
    techniques: ['Fingerstyle'],
  },
  {
    id: 'JijbFsOJMFE',
    title: 'Jazz Bass, fingerstyle',
    bass: 'Fender Jazz Bass',
    gear: ['Origin Effects BassRig Fifteen', 'Rupert Neve Designs RNDI'],
    techniques: ['Fingerstyle'],
  },
  {
    id: 'ApxA0x5mT4o',
    title: 'Mustang, pick',
    bass: 'Fender JMJ Mustang Bass',
    gear: ['Origin Effects BassRig Fifteen', 'Rupert Neve Designs RNDI'],
    techniques: ['Pick'],
  },
  {
    id: 'gk80-w0CrM0',
    title: 'Starfire II, pick',
    bass: 'Guild Starfire II Bass',
    gear: ['Origin Effects BassRig Fifteen', 'Rupert Neve Designs RNDI'],
    techniques: ['Pick'],
  },
  {
    id: '8IIk_tuVp1o',
    title: 'Starfire II, chorus',
    bass: 'Guild Starfire II Bass',
    gear: ['MXR Bass Chorus Deluxe', 'Rupert Neve Designs RNDI'],
    techniques: ['Pick'],
  },
  {
    id: 'KjAEnNzFlkI',
    title: 'Lakland, slap',
    bass: 'Lakland 5501',
    gear: ['Rupert Neve Designs RNDI'],
    techniques: ['Slap'],
  },
  {
    id: 'EjYbHNKDtyg',
    title: 'Upright, pizz',
    bass: 'Knilling Bucharest 1308T',
    gear: ['Electro-Voice RE20', 'Soyuz 013 FET'],
    techniques: ['Pizzicato'],
  },
];
