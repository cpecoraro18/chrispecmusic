<template>
  <div>
    <div class="container">
      <div class="my-5">
        <h1 class="text-center">Portfolio</h1>
        <p class="text-center">Checkout some of my work below.</p>
      </div>
    </div>

    <div class="mb-3">
      <discography-list></discography-list>
    </div>

    <div class="container-fluid">
      <h3 class="mx-auto fw-bold h2 my-5">Videos</h3>
      <!-- Filter -->
      <div class="text-center mb-4">
        <button
          class="btn btn-outline-light mx-2 mb-2"
          :class="{ 'btn-light text-dark': selectedGenre === 'all' }"
          @click="filterByGenre('all')"
        >
          All
        </button>
        <button
          v-for="genre in genres"
          :key="genre"
          class="btn btn-outline-light mx-2 mb-2"
          :class="{ 'btn-light text-dark': selectedGenre === genre }"
          @click="filterByGenre(genre)"
        >
          {{ genre }}
        </button>
      </div>

      <!-- Video Grid -->
      <div class="row">
        <div class="col-md-3 mb-4" v-for="video in filteredVideos" :key="video.url">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" :src="video.url" allowfullscreen></iframe>
          </div>
          <div class="mt-2">
            <h6 class="fw-bold">{{ video.title }}</h6>
            <span class="badge bg-secondary">{{ video.genre }}</span>
            <p v-if="video.description" class="small text-muted mt-1">{{ video.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
  title: 'Portfolio - Chris Pecoraro',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Watch videos of Chris Pecoraro performing with the Sean McKee Band and more.'
    }
  ]
});

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
  { title: "Sean McKee Band - Ain't talkin about love", url: "https://www.youtube.com/embed/h2jR9AGe0yI?si=MGbckEkR2MWq140-", genre: "Rock" },
  { title: "Sean McKee Band - Live at Madcats - Fragile", url: "https://www.youtube.com/embed/5e3GEKrsUnc?si=HkDcvv5sKU_bWoJO", genre: "Rock" },
  { title: "Sean McKee Band - Poison Ivy", url: "https://www.youtube.com/embed/_sUEwDyL70w?si=fOH6MAVO0AZMRWkf", genre: "Rock" },
  { title: "Sean McKee Band - Color Outside the Lines", url: "https://www.youtube.com/embed/xjNzCIJnm7I?si=rVDUIRxabTValGlt", genre: "Rock" },
  { title: "Sean McKee Band - Monster - Live at Madcats", url: "https://www.youtube.com/embed/u-lH9EmIN_o?si=B9FS9ooxKwxLu2Gl", genre: "Rock" },

  // --- Blues ---
  { title: "Sean's Guitar Lounge Ft Brandon Simmons - Sweet Little Angel Cover", url: "https://www.youtube.com/embed/4dWC3QAfFyY?si=Gb6jWZif7R_f89nz", genre: "Blues" },
  { title: "Sean's Guitar Lounge - Suburban Glory Cover", url: "https://www.youtube.com/embed/8d3lh_wB8Zk?si=V-A1PNsEe9q9Xo7-", genre: "Blues" },

  // --- Jazz ---
  { title: "University of Minnesota Jazz Ensemble I 2019 Spring Concert", url: "https://www.youtube.com/embed/VwqKnToOPik?si=cKkhHEbjdgcKHF4B", genre: "Jazz" },
  { title: "2018 University of Minnesota Jazz Festival - Jazz Ensemble 1", url: "https://www.youtube.com/embed/pZdC1mELkto?si=lwapEuwtZ2o0NtNd", genre: "Jazz" },
  { title: "University of Minnesota Jazz Festival 2018 - 12:20 Jazz Combo", url: "https://www.youtube.com/embed/AQ_slt8-i5o?si=3X9Yahu7iaj_h9Sx", genre: "Jazz" }
]);

const genres = computed(() => {
  return [...new Set(videos.value.map(v => v.genre))].sort();
});

const filteredVideos = computed(() => {
  if (selectedGenre.value === 'all') return videos.value;
  return videos.value.filter(video => video.genre === selectedGenre.value);
});

function filterByGenre(genre) {
  selectedGenre.value = genre;
}
</script>

<style scoped>
.embed-responsive-item {
  height: 30vh;
  width: 100%;
}
</style>
