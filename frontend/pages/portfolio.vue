<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Portfolio</h1>
        <p class="lead measure mb-0">
          Records I've played on and live footage from shows around Chicago and beyond.
        </p>
      </div>
    </section>

    <discography-list></discography-list>

    <!-- ================= VIDEOS ================= -->
    <section class="section-tight">
      <div class="container">
        <h2 class="mb-4">Live footage</h2>

        <FilterPills
          v-model="selectedGenre"
          :options="genreOptions"
          label="Filter videos by genre"
          select-id="video-genre"
          class="mb-5"
        />

        <div class="row g-4">
          <div class="col-12 col-md-6 col-xl-4" v-for="video in filteredVideos" :key="video.id">
            <MediaCard :title="video.title" :badge="video.genre">
              <template #media>
                <YouTubeEmbed :id="video.id" :title="video.title" />
              </template>
            </MediaCard>
          </div>
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

const {
  selected: selectedGenre,
  options: genreOptions,
  filtered: filteredVideos,
} = useFilter(videos, 'genre');

useSeo({
  title: 'Portfolio | Chris Pecoraro, Chicago Bassist',
  description: 'Records Chris Pecoraro has played bass on, plus live footage with the Sean McKee Band and others across rock, blues, jazz, and pop.',
});
</script>

<style scoped>
/* Card and badge styling now lives in MediaCard; the 16:9 frame lives in
   YouTubeEmbed. This page needs no styles of its own. */
</style>
