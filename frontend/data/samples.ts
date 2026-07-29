/**
 * Bass audio samples, shown on the homepage and /book-session.
 *
 * Each sample exists in two mixes so a prospect can hear the part alone and
 * then hear it sit in a track. The files are grouped per sample rather than
 * stored as two flat lists so a format change is a field on this object rather
 * than a new parallel array — which is exactly what happened: playback is now
 * MP3, and the WAV it was cut from is a separate download.
 *
 * The two formats serve different people. A prospect clicking through tones
 * wants the page to respond; an engineer deciding whether to hire wants the
 * uncompressed take to open in a DAW. Playback is 192 kbps MP3 (~600 KB);
 * the masters stay on S3 so 35 MB of WAV is not committed to a repo that
 * GitHub Pages serves in full on every deploy.
 */

/**
 * Base URL for the uncompressed masters — the same bucket getWebsitePhotos
 * reads, under an `audio-wav/` prefix. Uploaded with
 * `Content-Disposition: attachment`, which is what makes the browser save the
 * file rather than stream it; the `download` attribute on the link is ignored
 * because this is cross-origin.
 */
const AUDIO_MASTERS = 'https://chrispecphotos.s3.amazonaws.com/audio-wav';

export interface AudioSample {
  /** Stable key, also used as the DOM key for the toggle state. */
  id: string;
  title: string;
  /** Paths under public/ — MP3, what the <audio> element plays. */
  withDrums: string;
  withoutDrums: string;
  /** Absolute S3 URLs — the uncompressed masters, offered as a download. */
  withDrumsWav: string;
  withoutDrumsWav: string;
}

export const samples: AudioSample[] = [
  {
    id: 'pbass-di',
    title: 'Fender Precision Bass DI Tone',
    withDrums: '/audio/pbass-di-drums.mp3',
    withoutDrums: '/audio/pbass-di.mp3',
    withDrumsWav: `${AUDIO_MASTERS}/pbass-di-drums.wav`,
    withoutDrumsWav: `${AUDIO_MASTERS}/pbass-di.wav`,
  },
  {
    id: 'pbass-b15',
    title: 'Fender Precision Bass Vintage Amp Tone',
    withDrums: '/audio/pbass-b15-drums.mp3',
    withoutDrums: '/audio/pbass-b15.mp3',
    withDrumsWav: `${AUDIO_MASTERS}/pbass-b15-drums.wav`,
    withoutDrumsWav: `${AUDIO_MASTERS}/pbass-b15.wav`,
  },
  {
    id: 'jbass-svt',
    title: 'Fender Jazz Bass Amp Tone',
    withDrums: '/audio/jbass-svt-drums.mp3',
    withoutDrums: '/audio/jbass-svt.mp3',
    withDrumsWav: `${AUDIO_MASTERS}/jbass-svt-drums.wav`,
    withoutDrumsWav: `${AUDIO_MASTERS}/jbass-svt.wav`,
  },
  {
    id: 'lakland-di',
    title: 'Lakland DI Tone',
    withDrums: '/audio/lakland-di-drums.mp3',
    withoutDrums: '/audio/lakland-di.mp3',
    withDrumsWav: `${AUDIO_MASTERS}/lakland-di-drums.wav`,
    withoutDrumsWav: `${AUDIO_MASTERS}/lakland-di.wav`,
  },
  {
    id: 'lakland-slap',
    title: 'Lakland Slap Tone',
    withDrums: '/audio/lakland-slap-drums.mp3',
    withoutDrums: '/audio/lakland-slap.mp3',
    withDrumsWav: `${AUDIO_MASTERS}/lakland-slap-drums.wav`,
    withoutDrumsWav: `${AUDIO_MASTERS}/lakland-slap.wav`,
  },
  {
    id: 'upright',
    title: 'Upright Bass',
    withDrums: '/audio/upright-drums.mp3',
    withoutDrums: '/audio/upright.mp3',
    withDrumsWav: `${AUDIO_MASTERS}/upright-drums.wav`,
    withoutDrumsWav: `${AUDIO_MASTERS}/upright.wav`,
  },
];
