/**
 * Made-up clips so the sound gallery can be tried out before any real ones
 * exist. Only `npm run dev` ever uses these (see utils/sounds.ts); production
 * builds drop them entirely.
 *
 * The IDs are borrowed from the performance videos in data/videos.ts so the players
 * load something. The titles and tags are invented and do not describe those
 * videos. Never copy an entry from here into data/sounds.ts.
 */
import type { SoundClip } from './sounds';

export const demoSounds: SoundClip[] = [
  {
    id: 'VwqKnToOPik',
    title: 'Upright, walking',
    genres: ['Jazz'],
    bass: 'Knilling Bucharest 1308T',
    gear: ['Audio-Technica AT4041', 'Radial Tonebone'],
    techniques: ['Walking', 'Fingerstyle'],
  },
  {
    id: 'pZdC1mELkto',
    title: 'Upright, bowed',
    genres: ['Jazz', 'Cinematic'],
    bass: 'Knilling Bucharest 1308T',
    gear: ['Soyuz 013 FET'],
    techniques: ['Arco'],
  },
  {
    id: '53Vx75OUEQw',
    title: 'P Bass, driven',
    genres: ['Rock'],
    bass: 'Fender P Bass',
    gear: ['Origin Effects BassRig Super Vintage', 'MXR Bass Compressor'],
    techniques: ['Pick'],
  },
  {
    id: '4dWC3QAfFyY',
    title: 'P Bass, blues shuffle',
    genres: ['Blues'],
    bass: 'Fender P Bass',
    gear: ['Origin Effects BassRig Fifteen'],
    techniques: ['Fingerstyle', 'Palm muted'],
  },
  {
    id: '-1akA4BaSkc',
    title: 'Lakland 5-string, slap',
    genres: ['Pop', 'Funk'],
    bass: 'Lakland 5501',
    gear: ['Cali76 Bass Compressor', 'Rupert Neve Designs RNDI'],
    techniques: ['Slap'],
  },
  {
    id: 'A5KX41GrZsc',
    title: 'Lakland 5-string, octave',
    genres: ['Pop', 'Funk'],
    bass: 'Lakland 5501',
    gear: ['Electro-Harmonix Pico POG', 'Aguilar Twin Filter'],
    techniques: ['Fingerstyle'],
  },
  {
    id: 'NJOk4imcY50',
    title: 'Jazz Bass, fuzz',
    genres: ['Rock', 'Punk'],
    bass: 'Fender Jazz Bass',
    gear: ['Damnation Audio MBD'],
    techniques: ['Pick'],
  },
  {
    id: 'OFJ75eQKOlc',
    title: 'Jazz Bass, clean',
    genres: ['Soul', 'R&B'],
    bass: 'Fender Jazz Bass',
    gear: ['MXR Bass Chorus Deluxe', 'Rupert Neve Designs RNDI'],
    techniques: ['Fingerstyle'],
  },
];
