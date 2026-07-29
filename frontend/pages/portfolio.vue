<template>
  <div>
    <section class="section-tight pb-0">
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

        <div class="genre-filter mb-5" role="group" aria-label="Filter videos by genre">
          <button
            class="btn filter-pill"
            :class="selectedGenre === 'all' ? 'filter-pill--active' : ''"
            :aria-pressed="selectedGenre === 'all'"
            @click="filterByGenre('all')"
          >
            All <span class="filter-count">{{ videos.length }}</span>
          </button>
          <button
            v-for="genre in genres"
            :key="genre"
            class="btn filter-pill"
            :class="selectedGenre === genre ? 'filter-pill--active' : ''"
            :aria-pressed="selectedGenre === genre"
            @click="filterByGenre(genre)"
          >
            {{ genre }} <span class="filter-count">{{ countByGenre[genre] }}</span>
          </button>
        </div>

        <div class="row g-4">
          <div class="col-12 col-md-6 col-xl-4" v-for="video in filteredVideos" :key="video.id">
            <div class="video-card h-100">
              <you-tube-embed :id="video.id" :title="video.title" />
              <div class="video-meta">
                <h3 class="h4 mb-2">{{ video.title }}</h3>
                <span class="genre-badge">{{ video.genre }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="cta-band">
      <div class="container">
        <h2 class="mb-3">Want bass like this on your track?</h2>
        <p class="lead measure mb-4">
          Send me your song and I'll record it in my studio and send back mix-ready files.
        </p>
        <div class="cta-actions">
          <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
          <nuxt-link class="btn btn-ghost" to="/book-live-gig">Book a Live Gig</nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const selectedGenre = ref('all');

// Stored as bare YouTube IDs rather than embed URLs: YouTubeEmbed builds both
// the thumbnail and the player URL from the ID, and the ?si= share tokens the
// URLs used to carry were pasted-in tracking parameters that served no purpose
// here.
const videos = ref([
  // --- Pop ---
  { title: "Alright Maybes - Come and Get Your Love", id: "-1akA4BaSkc", genre: "Pop" },
  { title: "Alright Maybes - Red Wine Supernova Cover", id: "A5KX41GrZsc", genre: "Pop" },
  { title: "Alright Maybes - Ain't It Fun Cover", id: "UevnkOhMo2o", genre: "Pop" },

  // --- Rock ---
  { title: "Alright Maybes - Misery Business Cover", id: "NJOk4imcY50", genre: "Rock" },
  { title: "Alright Maybes - Paradise City Cover", id: "I_nMxVfUFpM", genre: "Rock" },
  { title: "Sean's Guitar Lounge Ft. Sophie Hafer - Got to Get Better in a Little While Cover", id: "OFJ75eQKOlc", genre: "Rock" },
  { title: "Sean McKee Band - Got to Get Better in a Little While Cover", id: "53Vx75OUEQw", genre: "Rock" },
  { title: "Sean McKee Band - Ain't Talkin' About Love", id: "h2jR9AGe0yI", genre: "Rock" },
  { title: "Sean McKee Band - Live at Madcats - Fragile", id: "5e3GEKrsUnc", genre: "Rock" },
  { title: "Sean McKee Band - Poison Ivy", id: "_sUEwDyL70w", genre: "Rock" },
  { title: "Sean McKee Band - Color Outside the Lines", id: "xjNzCIJnm7I", genre: "Rock" },
  { title: "Sean McKee Band - Monster - Live at Madcats", id: "u-lH9EmIN_o", genre: "Rock" },

  // --- Blues ---
  { title: "Sean's Guitar Lounge Ft. Brandon Simmons - Sweet Little Angel Cover", id: "4dWC3QAfFyY", genre: "Blues" },
  { title: "Sean's Guitar Lounge - Suburban Glory Cover", id: "8d3lh_wB8Zk", genre: "Blues" },
  { title: "Sean's Guitar Lounge - I Wouldn't Treat a Dog Cover", id: "8VqFfWw5Roo", genre: "Blues" },

  // --- Jazz ---
  { title: "University of Minnesota Jazz Ensemble I - 2019 Spring Concert", id: "VwqKnToOPik", genre: "Jazz" },
  { title: "2018 University of Minnesota Jazz Festival - Jazz Ensemble 1", id: "pZdC1mELkto", genre: "Jazz" },
  { title: "University of Minnesota Jazz Festival 2018 - 12:20 Jazz Combo", id: "AQ_slt8-i5o", genre: "Jazz" }
]);

const genres = computed(() => [...new Set(videos.value.map(v => v.genre))].sort());

const countByGenre = computed(() =>
  videos.value.reduce((counts, video) => {
    counts[video.genre] = (counts[video.genre] || 0) + 1;
    return counts;
  }, {})
);

const filteredVideos = computed(() => {
  if (selectedGenre.value === 'all') return videos.value;
  return videos.value.filter(video => video.genre === selectedGenre.value);
});

function filterByGenre(genre) {
  selectedGenre.value = genre;
}

useSeo({
  title: 'Portfolio | Chris Pecoraro, Chicago Bassist',
  description: 'Records Chris Pecoraro has played bass on, plus live footage with the Sean McKee Band and others across rock, blues, jazz, and pop.',
});
</script>

<style scoped>

.video-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
}

/* The 16:9 frame now lives in YouTubeEmbed, which owns both the facade and the
   player it swaps in. */
.video-meta {
  padding: 1rem 1.1rem 1.2rem;
  text-align: left;
}

.genre-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  border: 1px solid rgba(var(--text-color-rgb), 0.24);
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
}



</style>
