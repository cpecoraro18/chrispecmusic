/**
 * Which clips the sound gallery shows, and the search and filter logic behind
 * it. Kept out of SoundGallery.vue so the pages can tell whether there is
 * anything to show before rendering the section around it.
 */
import { sounds, type SoundClip } from '~/data/sounds';
import { demoSounds } from '~/data/sounds.demo';

/**
 * True while there are no real clips and this is `npm run dev`. `import.meta.dev`
 * is replaced with `false` in production builds, so the demo list is dropped
 * from the bundle rather than merely hidden.
 */
export const usingDemoSounds = import.meta.dev && sounds.length === 0;

/** What the gallery shows. Empty in production until real clips exist. */
export const soundClips: SoundClip[] = usingDemoSounds ? demoSounds : sounds;

export type SoundFacetKey = 'genre' | 'bass' | 'technique';

export interface SoundFacet {
  /** Also the URL query key, e.g. /?bass=Fender%20P%20Bass#sounds. */
  key: SoundFacetKey;
  label: string;
  values: (clip: SoundClip) => readonly string[];
}

/**
 * In the order the filter dropdowns appear. Gear has no dropdown: it was the
 * longest list and the least scannable, and the search still finds it.
 */
export const SOUND_FACETS: SoundFacet[] = [
  { key: 'genre', label: 'Genre', values: (clip) => clip.genres },
  { key: 'bass', label: 'Bass', values: (clip) => [clip.bass] },
  { key: 'technique', label: 'Technique', values: (clip) => clip.techniques ?? [] },
];

/** The values picked in each group. An empty group means no filter. */
export type SoundSelection = Record<SoundFacetKey, string[]>;

export function emptySoundSelection(): SoundSelection {
  return { genre: [], bass: [], technique: [] };
}

function searchText(clip: SoundClip): string {
  return [
    clip.title,
    clip.bass,
    ...clip.genres,
    ...(clip.techniques ?? []),
    ...(clip.gear ?? []),
  ]
    .join(' ')
    .toLowerCase();
}

/**
 * Whether a clip passes the search and every filter group.
 *
 * Picks within a group are OR'd and groups are AND'd: "Jazz or Blues, on the
 * upright". Every word of the search has to appear somewhere in the clip, so
 * "p bass fifteen" finds the P bass through the BassRig Fifteen.
 *
 * @param skip  Leave one group out. Used to count what each option in that
 *              group would give, given everything else that is selected.
 */
export function soundClipMatches(
  clip: SoundClip,
  selection: SoundSelection,
  search: string,
  skip?: SoundFacetKey
): boolean {
  for (const facet of SOUND_FACETS) {
    if (facet.key === skip) continue;
    const picked = selection[facet.key];
    if (picked.length && !facet.values(clip).some((value) => picked.includes(value))) {
      return false;
    }
  }

  const words = search.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = searchText(clip);
  return words.every((word) => text.includes(word));
}

/**
 * Which sound people actually press play on is the most direct signal of what
 * clients come here for — more so than which filters they click.
 */
export function trackSoundPlay(clip: SoundClip): void {
  trackEvent('sound_play', {
    video_id: clip.id,
    video_title: clip.title,
    bass: clip.bass,
  });
}
