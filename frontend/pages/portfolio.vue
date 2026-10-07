<template>
  <div>
    <!-- ================= INTRO ================= -->
    <section class="section-tight">
      <div class="container">
        <SectionHeader level="h1" title="Portfolio" lead="Studio work, records, and live shows." />
      </div>
    </section>

    <!-- Every section below is built the same way, so the page reads as one
         thing: a full-width band, a centred heading and one line under it, and
         the content. Only the band colour alternates. Booking is left to the
         closing CTA band rather than repeated in each section. -->

    <!-- ================= STUDIO ================= -->
    <!-- First because remote sessions are the core of the business. It is the
         searchable tone gallery and nothing else, so the whole band waits until
         data/sounds.ts has clips. Shared links to a filtered view or a single
         clip end in #sounds, which is this id. -->
    <section v-if="soundClips.length" id="sounds" class="section band band-deep">
      <div class="container">
        <SectionHeader
          title="Studio"
          lead="Short clips, one sound each. Search or filter by genre, bass, technique, or gear."
        />
        <SoundGallery />
      </div>
    </section>

    <!-- ================= RECORDS ================= -->
    <!-- Bands alternate light and dark, and the studio band only exists once
         there are clips, so these are bound to whether it rendered. The records
         always sit on Deep Daphne: as the band when this one is dark, as a
         panel inside it when it is light. -->
    <section id="records" class="section band" :class="{ 'band-deep': !hasSounds }">
      <div class="container">
        <div :class="{ 'panel surface-deep': hasSounds }">
          <SectionHeader title="Records" lead="Albums and singles I've played on. Click a cover to listen." />
          <DiscographyList />
        </div>
      </div>
    </section>

    <!-- ================= LIVE ================= -->
    <section id="live" class="section band" :class="{ 'band-charcoal': hasSounds }">
      <div class="container">
        <SectionHeader title="Live" lead="Shows around Chicago and beyond, with the bands I play in." />

        <FilterPills
          v-model="selectedGenre"
          :options="genreOptions"
          label="Filter videos by genre"
          select-id="video-genre"
          class="mb-5"
        />

        <div class="row g-4 text-start">
          <div class="col-12 col-md-6 col-xl-4" v-for="video in shownVideos" :key="video.id">
            <MediaCard :title="video.title" :badge="video.genre">
              <template #media>
                <YouTubeEmbed :id="video.id" :title="video.title" />
              </template>
              <p class="video-credits mb-0">{{ creditLine(video) }}</p>
            </MediaCard>
          </div>
        </div>

        <div v-if="hiddenCount > 0" class="band-next">
          <button type="button" class="btn btn-ghost" @click="showAllVideos = true">
            Show {{ hiddenCount }} more
          </button>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <CtaBand
      title="Want bass like this on your track?"
      lead="Send me your song and I'll record it in my studio and send back mix-ready files."
    >
      <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
      <nuxt-link class="btn btn-ghost" to="/book-live-gig">Book a Live Gig</nuxt-link>
    </CtaBand>
  </div>
</template>

<script setup>
import { videos } from '~/data/videos';
import { creditLine } from '~/data/credits';

const hasSounds = soundClips.length > 0;

const {
  selected: selectedGenre,
  options: genreOptions,
  filtered: filteredVideos,
} = useFilter(videos, 'genre');

/**
 * Two rows to start. All twenty at once ran seven rows deep and pushed the
 * booking band out of reach; someone who wants more asks for it. Picking a
 * genre narrows the list, so it shows everything in that genre.
 */
const INITIAL_VIDEOS = 6;
const showAllVideos = ref(false);

const shownVideos = computed(() =>
  showAllVideos.value || selectedGenre.value
    ? filteredVideos.value
    : filteredVideos.value.slice(0, INITIAL_VIDEOS)
);

const hiddenCount = computed(() => filteredVideos.value.length - shownVideos.value.length);

useSeo({
  title: 'Portfolio | Chris Pecoraro, Chicago Bassist',
  description: 'Hear Chris Pecoraro on upright and electric bass: records he has played on and live footage with the Sean McKee Band and others across rock, blues, jazz, and pop.',
});
</script>

<style scoped>
/* ---- Bands ---- */
.band {
  border-top: 1px solid rgba(var(--fg-rgb), 0.14);
  /* The fixed header would otherwise cover the top of a section reached by a
     link like /portfolio#sounds. */
  scroll-margin-top: 5rem;
}

/* The "Show more" button under the live videos, centred like the heading
   above them. Booking lives in the closing CTA band, not in each section. */
.band-next {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
}

/* The roles are worth stating, but not worth outranking the title of the
   video. */
.video-credits {
  font-size: 0.85rem;
  color: rgba(var(--fg-rgb), 0.65);
}
</style>
