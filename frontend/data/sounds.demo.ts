/**
 * Made-up clips so the sound gallery can be tried out before any real ones
 * exist. Only `npm run dev` ever uses these (see utils/sounds.ts); production
 * builds drop them entirely.
 *
 * The IDs are borrowed from the live footage in data/videos.ts so the players
 * load something. The titles and tags are invented and do not describe those
 * videos. Never copy an entry from here into data/sounds.ts.
 */
import type { SoundClip } from './sounds';

export const demoSounds: SoundClip[] = [
  {
    id: 'VwqKnToOPik',
    title: 'Walking upright, medium swing',
    blurb: 'AT4041 on the bridge blended with the pickup.',
    genres: ['Jazz'],
    bass: 'Knilling Bucharest 1308T',
    gear: ['Audio-Technica AT4041', 'Radial Tonebone'],
    techniques: ['Walking', 'Fingerstyle'],
  },
  {
    id: 'pZdC1mELkto',
    title: 'Bowed upright pad',
    blurb: 'Long arco notes under a ballad.',
    genres: ['Jazz', 'Cinematic'],
    bass: 'Knilling Bucharest 1308T',
    gear: ['Soyuz 013 FET'],
    techniques: ['Arco'],
  },
  {
    id: '53Vx75OUEQw',
    title: 'Driven P bass rock part',
    blurb: 'SVT-style grit from the Super Vintage, played with a pick.',
    genres: ['Rock'],
    bass: 'Fender P Bass',
    gear: ['Origin Effects BassRig Super Vintage', 'MXR Bass Compressor'],
    techniques: ['Pick'],
  },
  {
    id: '4dWC3QAfFyY',
    title: 'Slow blues shuffle',
    blurb: 'Round, woolly B-15 tone, thumb on the strings.',
    genres: ['Blues'],
    bass: 'Fender P Bass',
    gear: ['Origin Effects BassRig Fifteen'],
    techniques: ['Fingerstyle', 'Palm muted'],
  },
  {
    id: '-1akA4BaSkc',
    title: 'Slap pop groove',
    blurb: 'Bright 5-string with a touch of compression.',
    genres: ['Pop', 'Funk'],
    bass: 'Lakland 5501',
    gear: ['Cali76 Bass Compressor', 'Rupert Neve Designs RNDI'],
    techniques: ['Slap'],
  },
  {
    id: 'A5KX41GrZsc',
    title: 'Synth-style octave bass',
    blurb: 'POG sub-octave and a filter sweep.',
    genres: ['Pop', 'Funk'],
    bass: 'Lakland 5501',
    gear: ['Electro-Harmonix Pico POG', 'Aguilar Twin Filter'],
    techniques: ['Fingerstyle'],
  },
  {
    id: 'NJOk4imcY50',
    title: 'Fuzz bass chorus',
    blurb: 'MBD distortion blended under the clean signal.',
    genres: ['Rock', 'Punk'],
    bass: 'Fender Jazz Bass',
    gear: ['Damnation Audio MBD'],
    techniques: ['Pick'],
  },
  {
    id: 'OFJ75eQKOlc',
    title: 'Clean J bass, soul ballad',
    blurb: 'Bridge pickup soloed, chorus on the high end only.',
    genres: ['Soul', 'R&B'],
    bass: 'Fender Jazz Bass',
    gear: ['MXR Bass Chorus Deluxe', 'Rupert Neve Designs RNDI'],
    techniques: ['Fingerstyle'],
  },
];
