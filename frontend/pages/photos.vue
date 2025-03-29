<template>
  <div class="container py-5">
    <h1 class="text-center display-4 fw-bold mb-4">Gig Photos</h1>
    <p class="text-center mb-5">
      Download your gig photos for free! Want an EPK? 
      <a href="/epk" class="text-primary text-decoration-underline">Click here</a>.
    </p>

    <div class="row g-4">
      <div 
        v-for="(photo, index) in photos" 
        :key="index" 
        class="col-6 col-md-4 col-lg-3"
      >
        <div class="card shadow-sm">
          <img 
            :src="photo.src" 
            :alt="photo.name" 
            class="card-img-top rounded" 
            @click="openModal(photo)" 
            style="cursor: pointer;"
          />
          <div class="card-body text-center bg-light">
            <a 
              :href="photo.src" 
              download 
              class="btn btn-primary btn-sm"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="modalPhoto" 
      class="modal fade show d-block" 
      tabindex="-1" 
      style="background-color: rgba(0, 0, 0, 0.75);" 
      @click="modalPhoto = null"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-transparent border-0">
          <img 
            :src="modalPhoto.src" 
            :alt="modalPhoto.name" 
            class="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photos: [
        { name: "Gig 1", src: "/img/BuddyGuys.jpg" },
        { name: "Gig 2", src: "/images/gig2.jpg" },
        { name: "Gig 3", src: "/images/gig3.jpg" },
      ],
      modalPhoto: null,
    };
  },
  methods: {
    openModal(photo) {
      this.modalPhoto = photo;
    },
  },
};
</script>

<style>
/* No custom styles needed as Bootstrap handles the styling */
</style>