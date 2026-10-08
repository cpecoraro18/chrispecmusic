<template>
  <div class="sound-gallery">
    <!-- ============ Search + filter bar ============ -->
    <div class="filter-bar">
      <label for="sound-search" class="visually-hidden">Search sounds</label>
      <input
        id="sound-search"
        v-model="search"
        type="search"
        class="form-control sound-search"
        placeholder="Search sounds"
        autocomplete="off"
      />

      <!-- One dropdown checklist per group. Bootstrap's dropdown JS (loaded in
           nuxt.config) toggles the `show` class on the button and menu, so
           neither carries a :class binding — Vue would wipe Bootstrap's class
           on the next render and snap the menu shut mid-click.
           auto-close="outside" keeps it open while ticking several boxes. -->
      <div v-for="facet in facetOptions" :key="facet.key" class="dropdown facet-dropdown">
        <button
          type="button"
          class="btn facet-toggle dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          {{ facet.label }}<span v-if="facet.pickedCount" class="facet-picked">{{ facet.pickedCount }}</span>
        </button>
        <div class="dropdown-menu facet-menu">
          <label
            v-for="option in facet.options"
            :key="option.value"
            class="facet-option"
            :class="{ 'facet-option--empty': !option.active && option.count === 0 }"
          >
            <input
              type="checkbox"
              class="form-check-input m-0"
              :checked="option.active"
              :disabled="!option.active && option.count === 0"
              @change="toggle(facet.key, option.value)"
            />
            <span class="flex-grow-1">{{ option.value }}</span>
            <span class="facet-option-count">{{ option.count }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Active picks as chips, so a filtered view arriving from a shared link
         never looks unfiltered with every dropdown closed. -->
    <ul v-if="picks.length || search.trim()" class="active-picks list-unstyled">
      <li v-for="pick in picks" :key="`${pick.key}:${pick.value}`">
        <button
          type="button"
          class="pick-chip"
          :aria-label="`Remove filter: ${pick.value}`"
          @click="toggle(pick.key, pick.value)"
        >
          {{ pick.value }}<AppIcon name="xmark" class="ms-1" />
        </button>
      </li>
      <li>
        <button type="button" class="clear-btn" @click="clearAll">Clear all</button>
      </li>
    </ul>

    <!-- ============ Player + list ============ -->
    <div v-if="focused" class="sounds-panel">
      <div ref="stage" class="stage">
        <!-- Keyed by clip so switching remounts the embed: a fresh facade when
             a filter changes the clip, straight into playback when it was
             picked from the list. -->
        <YouTubeEmbed
          :key="focused.id"
          :id="focused.id"
          :title="focused.title"
          :autoplay="playOnSwap"
          class="stage-player"
          @play="trackSoundPlay(focused)"
        />
        <!-- Just the genre and the title. The title already names the bass,
             and the tags and description that used to sit here made the
             panel read like a spec sheet. -->
        <div class="stage-info">
          <p class="stage-genres mb-1">{{ focused.genres.join(' · ') }}</p>
          <h3 class="h4 mb-0">{{ focused.title }}</h3>
        </div>
      </div>

      <div class="clip-list-wrap">
        <p class="clip-list-count mb-2" aria-live="polite">
          {{ results.length }} {{ results.length === 1 ? 'sound' : 'sounds' }}
        </p>
        <!-- Numbered like a tracklist. An <ol> so screen readers get the
             numbering too; the visible numbers are decorative. They follow the
             current results, so a filtered list still runs 01, 02, 03. -->
        <ol class="clip-list list-unstyled mb-0">
          <li v-for="(clip, position) in results" :key="clip.id">
            <button
              type="button"
              class="clip-item"
              :class="{ 'clip-item--active': clip.id === focused.id }"
              :aria-current="clip.id === focused.id ? 'true' : undefined"
              @click="pick(clip.id)"
            >
              <span class="clip-number" aria-hidden="true">{{ String(position + 1).padStart(2, '0') }}</span>
              <img
                :src="`https://i.ytimg.com/vi/${clip.id}/mqdefault.jpg`"
                alt=""
                class="clip-thumb"
                width="320"
                height="180"
                loading="lazy"
                decoding="async"
              />
              <span class="clip-item-text">
                <span class="clip-item-title">{{ clip.title }}</span>
                <span class="clip-item-meta">{{ clip.genres.join(' · ') }}</span>
              </span>
            </button>
          </li>
        </ol>
      </div>
    </div>

    <!-- A search that finds nothing is still someone telling you exactly what
         sound they need, so it ends in the contact form rather than a dead end. -->
    <div v-else class="no-results text-center">
      <h3 class="h4 mb-2">I haven't posted that one yet</h3>
      <p class="text-muted measure mx-auto mb-4">
        Tell me the sound you're after. Chances are I can get it, and I'll send you a clip.
      </p>
      <!-- The message is added on click rather than baked into the href: the
           prerender crawler follows every href, and an escaped apostrophe in
           the query (&#39;) makes it split the URL at the & and 404, which
           fails `nuxi generate`. A plain <a>, because NuxtLink would run its
           own navigation to the bare /contact before this handler. -->
      <a class="btn btn-cta" href="/contact" @click.prevent="askForSound">Ask for this sound</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { SoundFacetKey } from '~/utils/sounds';

const route = useRoute();
const router = useRouter();

const search = ref('');
const selection = reactive(emptySoundSelection());

const results = computed(() =>
  soundClips.filter((clip) => soundClipMatches(clip, selection, search.value))
);

// ---- Which clip is on the stage ------------------------------------------------

/** The clip picked from the list, or null for "the first result". */
const focusedId = ref<string | null>(null);

/**
 * Whether the stage should start playing when it changes. True only after a
 * pick from the list. A filter that swaps the clip shows a fresh thumbnail
 * instead: nobody asked for sound yet.
 */
const playOnSwap = ref(false);

const focused = computed(
  () => results.value.find((clip) => clip.id === focusedId.value) ?? results.value[0]
);

const stage = ref<HTMLElement | null>(null);

function pick(id: string) {
  if (id === focused.value?.id) return;
  focusedId.value = id;
  playOnSwap.value = true;

  // Below lg the list sits under the player, so the player can be off screen.
  const rect = stage.value?.getBoundingClientRect();
  if (rect && rect.top < 0) stage.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// When a filter knocks the playing clip out of the results, the stage falls back
// to the first result. Forget the pick so it doesn't resurface later.
watch(results, (list) => {
  if (focusedId.value && !list.some((clip) => clip.id === focusedId.value)) {
    focusedId.value = null;
    playOnSwap.value = false;
  }
});

// ---- Filters ------------------------------------------------------------------

/**
 * Every value in each group, with how many clips picking it would show given
 * everything else that is selected. The group's own picks are left out of that
 * count, because picks within a group widen the results rather than narrow
 * them. A value that would show nothing is disabled rather than hidden, so the
 * menu doesn't reflow under the cursor.
 */
const facetOptions = computed(() =>
  SOUND_FACETS.map((facet) => {
    const pool = soundClips.filter((clip) =>
      soundClipMatches(clip, selection, search.value, facet.key)
    );
    const values = [...new Set(soundClips.flatMap((clip) => facet.values(clip)))].sort();
    return {
      key: facet.key,
      label: facet.label,
      pickedCount: selection[facet.key].length,
      options: values.map((value) => ({
        value,
        active: selection[facet.key].includes(value),
        count: pool.filter((clip) => facet.values(clip).includes(value)).length,
      })),
    };
  }).filter((facet) => facet.options.length > 1)
);

/** Every active pick across the groups, for the chips. */
const picks = computed(() =>
  SOUND_FACETS.flatMap((facet) => selection[facet.key].map((value) => ({ key: facet.key, value })))
);

function toggle(key: SoundFacetKey, value: string) {
  const picked = selection[key];
  const index = picked.indexOf(value);
  if (index === -1) picked.push(value);
  else picked.splice(index, 1);

  trackEvent('sound_filter', {
    facet: key,
    value,
    selected: index === -1,
    results: results.value.length,
  });
}

function clearAll() {
  search.value = '';
  for (const facet of SOUND_FACETS) selection[facet.key] = [];
}

/** What the empty state pre-fills the contact form with. */
const requestMessage = computed(() => {
  const parts = [
    search.value.trim() && `"${search.value.trim()}"`,
    ...SOUND_FACETS.flatMap((facet) => selection[facet.key]),
  ].filter(Boolean);
  return parts.length
    ? `Hi Chris, I'm looking for a bass sound like: ${parts.join(', ')}.`
    : "Hi Chris, I'm looking for a specific bass sound: ";
});

function askForSound() {
  trackEvent('sound_request', { message: requestMessage.value });
  router.push({ path: '/contact', query: { message: requestMessage.value } });
}

// ---- URL --------------------------------------------------------------------
// Filters and the picked clip live in the query string
// (/book-session?bass=Fender%20P%20Bass&clip=abc123#sounds) so a view, or one
// exact sound, can be sent to a client as a link; the hash makes it land on the
// gallery rather than the top of the page. Read on mount, not during setup: the
// page is prerendered without a query, and reading it while hydrating would
// render different HTML from the prerendered page.

function readQuery() {
  const one = (value: unknown) => (Array.isArray(value) ? value[0] : value);
  search.value = String(one(route.query.q) ?? '');
  for (const facet of SOUND_FACETS) {
    const raw = one(route.query[facet.key]);
    selection[facet.key] = raw ? String(raw).split(',').filter(Boolean) : [];
  }
  const clip = one(route.query.clip);
  focusedId.value = clip ? String(clip) : null;
}

function writeQuery() {
  const query: Record<string, string> = {};
  if (search.value.trim()) query.q = search.value.trim();
  for (const facet of SOUND_FACETS) {
    if (selection[facet.key].length) query[facet.key] = selection[facet.key].join(',');
  }
  if (focusedId.value) query.clip = focusedId.value;
  // Not router.replace: on the same page Nuxt's scrollBehavior jumps to the
  // hash when there is one and to the top when there isn't, so every click on
  // a filter would yank the page. Nothing else reads this route's query, so
  // the router not knowing about the change costs nothing.
  const url = router.resolve({ path: route.path, query, hash: '#sounds' }).href;
  window.history.replaceState(window.history.state, '', url);
}

onMounted(() => {
  readQuery();
  watch([search, selection, focusedId], writeQuery, { deep: true });
});

// Searches are reported once typing settles, not per keystroke. Searches that
// find nothing are the most useful to see: each is a sound to go and record.
let searchTimer: ReturnType<typeof setTimeout> | undefined;
watch(search, (term) => {
  clearTimeout(searchTimer);
  if (!term.trim()) return;
  searchTimer = setTimeout(() => {
    trackEvent('sound_search', { search_term: term.trim(), results: results.value.length });
  }, 1200);
});
</script>

<style scoped>
/* ---- Filter bar ---- */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  text-align: left;
}

/* The search box and the dropdown buttons share the pill shape of the
   filters on /portfolio and elsewhere, so every filter on the site looks like
   one family. */
.sound-search {
  flex: 1 1 18rem;
  min-width: 0;
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  background-color: rgba(var(--fg-rgb), 0.08);
  border-color: rgba(var(--fg-rgb), 0.3);
  color: var(--fg);
}

.sound-search::placeholder {
  color: rgba(var(--fg-rgb), 0.55);
}

.sound-search:focus {
  background-color: rgba(var(--fg-rgb), 0.12);
  color: var(--fg);
  border-color: var(--accent);
  box-shadow: none;
}

#app .facet-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 100%;
  padding: 0.5rem 1.1rem;
  border: 1px solid rgba(var(--fg-rgb), 0.4);
  border-radius: 999px;
  color: var(--fg);
  background-color: transparent;
  font-size: 0.95rem;
  font-weight: 550;
}

#app .facet-toggle:hover,
#app .facet-toggle.show {
  background-color: rgba(var(--fg-rgb), 0.12);
  border-color: rgba(var(--fg-rgb), 0.6);
}

.facet-picked {
  display: inline-grid;
  place-items: center;
  min-width: 1.3rem;
  height: 1.3rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  font-size: 0.75rem;
  background-color: var(--fg);
  color: var(--on-fg);
}

.facet-menu {
  min-width: 15rem;
  max-height: 20rem;
  overflow-y: auto;
  padding: 0.35rem;
  background-color: var(--charcoal);
  border: 1px solid rgba(var(--fg-rgb), 0.2);
  box-shadow: var(--shadow-lg);
}

.facet-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  color: var(--fg);
  font-size: 0.92rem;
  cursor: pointer;
}

.facet-option:hover {
  background-color: rgba(var(--fg-rgb), 0.1);
}

.facet-option--empty {
  opacity: 0.4;
  cursor: default;
}

.facet-option-count {
  font-size: 0.8rem;
  color: var(--fg-soft);
}

/* On phones the search takes the full row and the three dropdowns share the
   next one, rather than wrapping raggedly. */
@media (max-width: 575.98px) {
  .sound-search {
    flex-basis: 100%;
  }

  .facet-dropdown {
    flex: 1 1 0;
  }

  #app .facet-toggle {
    width: 100%;
    justify-content: space-between;
  }
}

/* ---- Chips ---- */
.active-picks {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin: 0.85rem 0 0;
}

.pick-chip {
  display: inline-flex;
  align-items: center;
  border: 0;
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  font-size: 0.85rem;
  font-weight: 550;
  background-color: var(--fg);
  color: var(--on-fg);
}

.pick-chip:hover {
  background-color: var(--white);
}

.clear-btn {
  border: 0;
  background: none;
  padding: 0.2rem 0.4rem;
  font-size: 0.85rem;
  color: var(--accent);
  text-decoration: underline;
}

/* ---- Scrollbars ---- */
/* The clip list and the filter menus scroll inside a dark panel, where the
   browser's default grey scrollbar was the one thing that didn't belong.
   Thin and rounded in the panel's own ink instead: scrollbar-* for Firefox,
   the ::-webkit-scrollbar rules for Chrome, Edge, and Safari. */
.clip-list,
.facet-menu {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--fg-rgb), 0.3) transparent;
}

.clip-list::-webkit-scrollbar,
.facet-menu::-webkit-scrollbar {
  width: 8px;
}

.clip-list::-webkit-scrollbar-track,
.facet-menu::-webkit-scrollbar-track {
  background: transparent;
}

.clip-list::-webkit-scrollbar-thumb,
.facet-menu::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 999px;
  background-color: rgba(var(--fg-rgb), 0.3);
  background-clip: padding-box;
}

.clip-list::-webkit-scrollbar-thumb:hover,
.facet-menu::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--fg-rgb), 0.5);
}

/* ---- Player + list ---- */
.sounds-panel {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  /* The same translucent card as the performance videos on /portfolio, so the site
     has one surface style. A plain 6% tint vanished into the page, so this
     one is a touch stronger, with a firmer border and a shadow to lift it. */
  background-color: rgba(var(--fg-rgb), 0.08);
  border: 1px solid rgba(var(--fg-rgb), 0.18);
  color: var(--fg);
  box-shadow: var(--shadow-lg);
  text-align: left;
}

@media (min-width: 992px) {
  .sounds-panel {
    flex-direction: row;
    align-items: flex-start;
    padding: 1.25rem;
  }

  .stage {
    flex: 1 1 auto;
    min-width: 0;
  }

  .clip-list-wrap {
    flex: 0 0 20rem;
  }

  /* Roughly the height of the stage, so the list scrolls beside it rather
     than stretching the panel past the player. */
  .clip-list {
    max-height: 30rem;
    overflow-y: auto;
    padding-right: 0.25rem;
  }
}

/* Same reasoning on phones: a long list under the player shouldn't push the
   CTA below it out of reach. */
@media (max-width: 991.98px) {
  .clip-list {
    max-height: 24rem;
    overflow-y: auto;
  }
}

.stage {
  scroll-margin-top: 6rem; /* clears the fixed header when scrolled to */
}

.stage-player {
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.stage-info {
  padding: 1rem 0.25rem 0.25rem;
}

.stage-genres {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.clip-list-count {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-soft);
}

.clip-list li + li {
  margin-top: 0.35rem;
}

.clip-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.4rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background-color: rgba(var(--fg-rgb), 0.06);
  color: var(--fg);
  text-align: left;
  transition: background-color 0.15s ease;
}

.clip-number {
  flex-shrink: 0;
  width: 1.4rem;
  text-align: right;
  font-size: 0.8rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  opacity: 0.55;
}

.clip-item:hover {
  background-color: rgba(var(--fg-rgb), 0.13);
}

.clip-item--active,
.clip-item--active:hover {
  background-color: var(--fg);
  color: var(--on-fg);
}

.clip-thumb {
  flex-shrink: 0;
  width: 5.5rem;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 0.25rem;
  background-color: var(--bg-black);
}

.clip-item-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.clip-item-title {
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.3;
}

.clip-item-meta {
  font-size: 0.8rem;
  opacity: 0.7;
}

.no-results {
  margin-top: 1.5rem;
  padding: 3rem 1rem;
  border: 1px dashed rgba(var(--fg-rgb), 0.3);
  border-radius: var(--radius-md);
}
</style>
