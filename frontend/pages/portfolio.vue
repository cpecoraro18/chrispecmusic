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
            class="btn genre-btn"
            :class="selectedGenre === 'all' ? 'genre-btn--active' : ''"
            :aria-pressed="selectedGenre === 'all'"
            @click="filterByGenre('all')"
          >
            All <span class="genre-count">{{ videos.length }}</span>
          </button>
          <button
            v-for="genre in genres"
            :key="genre"
            class="btn genre-btn"
            :class="selectedGenre === genre ? 'genre-btn--active' : ''"
            :aria-pressed="selectedGenre === genre"
            @click="filterByGenre(genre)"
          >
            {{ genre }} <span class="genre-count">{{ countByGenre[genre] }}</span>
          </button>
        </div>

        <div class="row g-4">
          <div class="col-12 col-md-6 col-xl-4" v-for="video in filteredVideos" :key="video.url">
            <div class="video-card h-100">
              <div class="video-frame">
                <iframe
                  :src="video.url"
                  :title="video.title"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
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
    <section class="final-cta">
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

const videos = ref([
  // --- Pop ---
  { title: "Alright Maybes - Come and Get Your Love", url: "https://www.youtube.com/embed/-1akA4BaSkc?si=KDkcxETpf_iaQ6Z6", genre: "Pop" },
  { title: "Alright Maybes - Red Wine Supernova Cover", url: "https://www.youtube.com/embed/A5KX41GrZsc?si=34Pa7rQ-0XTte_wt", genre: "Pop" },
  { title: "Alright Maybes - Ain't It Fun Cover", url: "https://www.youtube.com/embed/UevnkOhMo2o?si=ipygWPGdKI0rqH9O", genre: "Pop" },

  // --- Rock ---
  { title: "Alright Maybes - Misery Business Cover", url: "https://www.youtube.com/embed/NJOk4imcY50?si=1z7Ehn35ZN_nzRfi", genre: "Rock" },
  { title: "Alright Maybes - Paradise City Cover", url: "https://www.youtube.com/embed/I_nMxVfUFpM?si=5wQghRdnomj9_l6u", genre: "Rock" },
  { title: "Sean's Guitar Lounge Ft. Sophie Hafer - Got to Get Better in a Little While Cover", url: "https://www.youtube.com/embed/OFJ75eQKOlc?si=qs_fROpyNnZkR5uX", genre: "Rock" },
  { title: "Sean McKee Band - Got to Get Better in a Little While Cover", url: "https://www.youtube.com/embed/53Vx75OUEQw?si=gM0xiImyhF59Mqzs", genre: "Rock" },
  { title: "Sean McKee Band - Ain't Talkin' About Love", url: "https://www.youtube.com/embed/h2jR9AGe0yI?si=MGbckEkR2MWq140-", genre: "Rock" },
  { title: "Sean McKee Band - Live at Madcats - Fragile", url: "https://www.youtube.com/embed/5e3GEKrsUnc?si=HkDcvv5sKU_bWoJO", genre: "Rock" },
  { title: "Sean McKee Band - Poison Ivy", url: "https://www.youtube.com/embed/_sUEwDyL70w?si=fOH6MAVO0AZMRWkf", genre: "Rock" },
  { title: "Sean McKee Band - Color Outside the Lines", url: "https://www.youtube.com/embed/xjNzCIJnm7I?si=rVDUIRxabTValGlt", genre: "Rock" },
  { title: "Sean McKee Band - Monster - Live at Madcats", url: "https://www.youtube.com/embed/u-lH9EmIN_o?si=B9FS9ooxKwxLu2Gl", genre: "Rock" },
  { title: "Joey Acopiado - I Might Let You Down", url: "https://www.youtube.com/embed/zyLH9_pgqCA?si=77InEn_rPejE-81X", genre: "Rock" },

  // --- Blues ---
  { title: "Sean's Guitar Lounge Ft. Brandon Simmons - Sweet Little Angel Cover", url: "https://www.youtube.com/embed/4dWC3QAfFyY?si=Gb6jWZif7R_f89nz", genre: "Blues" },
  { title: "Sean's Guitar Lounge - Suburban Glory Cover", url: "https://www.youtube.com/embed/8d3lh_wB8Zk?si=V-A1PNsEe9q9Xo7-", genre: "Blues" },
  { title: "Sean's Guitar Lounge - I Wouldn't Treat a Dog Cover", url: "https://www.youtube.com/embed/8VqFfWw5Roo?si=Ycx4d_XqY_p2PzHi", genre: "Blues" },

  // --- Jazz ---
  { title: "University of Minnesota Jazz Ensemble I - 2019 Spring Concert", url: "https://www.youtube.com/embed/VwqKnToOPik?si=cKkhHEbjdgcKHF4B", genre: "Jazz" },
  { title: "2018 University of Minnesota Jazz Festival - Jazz Ensemble 1", url: "https://www.youtube.com/embed/pZdC1mELkto?si=lwapEuwtZ2o0NtNd", genre: "Jazz" },
  { title: "University of Minnesota Jazz Festival 2018 - 12:20 Jazz Combo", url: "https://www.youtube.com/embed/AQ_slt8-i5o?si=3X9Yahu7iaj_h9Sx", genre: "Jazz" }
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

useHead({
  title: 'Portfolio | Chris Pecoraro, Chicago Bassist',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Records Chris Pecoraro has played bass on, plus live footage with the Sean McKee Band and others across rock, blues, jazz, and pop.',
    },
  ],
});
</script>

<style scoped>
.genre-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.genre-btn {
  border: 1px solid rgba(var(--text-color-rgb), 0.4);
  color: var(--text-color);
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  font-size: 0.95rem;
  font-weight: 550;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.genre-btn:hover {
  background-color: rgba(var(--text-color-rgb), 0.12);
  color: var(--text-color);
}

.genre-btn--active,
.genre-btn--active:hover {
  background-color: var(--text-color);
  border-color: var(--text-color);
  color: var(--blue-deep);
}

.genre-count {
  opacity: 0.6;
  font-size: 0.85em;
  margin-left: 0.15rem;
}

.genre-btn--active .genre-count {
  opacity: 0.55;
}

.video-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
}

/* aspect-ratio keeps the embed correctly proportioned at every width; the old
   fixed 30vh height stretched the video on short or wide viewports. */
.video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--bg-black);
}

.video-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

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

.final-cta {
  background-color: var(--blue-deep);
  padding-block: var(--section-y);
  border-top: 1px solid rgba(var(--text-color-rgb), 0.12);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  justify-content: center;
}

@media (max-width: 575px) {
  .cta-actions .btn {
    flex: 1 1 100%;
  }
}
</style>
