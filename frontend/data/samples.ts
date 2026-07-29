/**
 * Bass audio samples, shown on the homepage and /book-session.
 *
 * Each sample exists in two mixes so a prospect can hear the part alone and
 * then hear it sit in a track. The files are grouped per sample rather than
 * stored as two flat lists so a future format change — an `mp3` alongside the
 * `wav`, say — is a field on this object rather than a new parallel array.
 */
export interface AudioSample {
  /** Stable key, also used as the DOM key for the toggle state. */
  id: string;
  title: string;
  /** Paths under public/. */
  withDrums: string;
  withoutDrums: string;
}

export const samples: AudioSample[] = [
  {
    id: 'pbass-di',
    title: 'Fender Precision Bass DI Tone',
    withDrums: '/audio/pbass-di-drums.wav',
    withoutDrums: '/audio/pbass-di.wav',
  },
  {
    id: 'pbass-b15',
    title: 'Fender Precision Bass Vintage Amp Tone',
    withDrums: '/audio/pbass-b15-drums.wav',
    withoutDrums: '/audio/pbass-b15.wav',
  },
  {
    id: 'jbass-svt',
    title: 'Fender Jazz Bass Amp Tone',
    withDrums: '/audio/jbass-svt-drums.wav',
    withoutDrums: '/audio/jbass-svt.wav',
  },
  {
    id: 'lakland-di',
    title: 'Lakland DI Tone',
    withDrums: '/audio/lakland-di-drums.wav',
    withoutDrums: '/audio/lakland-di.wav',
  },
  {
    id: 'lakland-slap',
    title: 'Lakland Slap Tone',
    withDrums: '/audio/lakland-slap-drums.wav',
    withoutDrums: '/audio/lakland-slap.wav',
  },
  {
    id: 'upright',
    title: 'Upright Bass',
    withDrums: '/audio/upright-drums.wav',
    withoutDrums: '/audio/upright.wav',
  },
];
