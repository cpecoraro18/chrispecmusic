<template>
  <div>
    <!-- ================= INTRO ================= -->
    <section class="section-tight">
      <div class="container">
        <SectionHeader level="h1" title="Portfolio" lead="Records I've played on, plus videos with the bands and projects I play with." />
      </div>
    </section>

    <!-- Every section below is built the same way, so the page reads as one
         thing: a full-width band, a centred heading and one line under it, and
         the content. Only the band colour alternates. Booking is left to the
         closing CTA band rather than repeated in each section. -->

    <!-- Finished work only. The sound gallery is a tool for finding a tone, so
         it lives on the home page, under the reel. -->

    <!-- ================= DISCOGRAPHY ================= -->
    <section id="discography" class="section band band-deep">
      <div class="container">
        <SectionHeader title="Discography" lead="Albums and singles I've played on." />
        <DiscographyList />
      </div>
    </section>

    <!-- ================= VIDEOS ================= -->
    <section id="videos" class="section band">
      <div class="container">
        <SectionHeader title="Videos" lead="Performances with the bands and projects I play with." />

        <FilterPills
          v-model="selectedGenre"
          :options="genreOptions"
          label="Filter videos by genre"
          select-id="video-genre"
          class="mb-5"
        />

        <div class="row g-4 text-start">
          <div class="col-12 col-md-6 col-xl-4" v-for="video in shownVideos" :key="video.id">
            <!-- Band above the song, like a show listing, rather than the
                 whole "Band - Song" string as one title. -->
            <MediaCard :eyebrow="splitTitle(video.title).band" :title="splitTitle(video.title).song" :badge="video.genre">
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

/**
 * Video titles are written "Band - Song". Splits at the first " - " so a song
 * title with its own dash ("Live at Madcats - Fragile") stays whole; a title
 * without one is all song.
 */
function splitTitle(title) {
  const i = title.indexOf(' - ');
  return i === -1 ? { band: '', song: title } : { band: title.slice(0, i), song: title.slice(i + 3) };
}
const showAllVideos = ref(false);

const shownVideos = computed(() =>
  showAllVideos.value || selectedGenre.value
    ? filteredVideos.value
    : filteredVideos.value.slice(0, INITIAL_VIDEOS)
);

const hiddenCount = computed(() => filteredVideos.value.length - shownVideos.value.length);

useSeo({
  title: 'Portfolio | Chris Pecoraro, Chicago Bassist',
  description: 'Hear Chris Pecoraro on upright and electric bass: records he has played on and performance videos with the Sean McKee Band and others across rock, blues, jazz, and pop.',
});
</script>

<style scoped>
/* ---- Bands ---- */
.band {
  border-top: 1px solid rgba(var(--fg-rgb), 0.14);
  /* The fixed header would otherwise cover the top of a section reached by a
     link like /portfolio#videos. */
  scroll-margin-top: 5rem;
}

/* The "Show more" button under the videos, centred like the heading
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
