<template>
  <div class="container py-5">
    <div class="row g-4">
      <div 
        v-for="(photo, index) in photos" 
        :key="index" 
        class="col-6 col-md-4 col-lg-3"
      >
        <div class="card shadow-sm position-relative">
          <img 
            :src="photo.src" 
            :alt="photo.name" 
            class="card-img-top rounded"
            @click="openModal(photo)" 
            style="cursor: pointer;"
          />
          <!-- Download Icon -->
          <a 
            :href="photo.src" 
            download 
            class="download-icon"
            title="Download"
          >
            <i class="fas fa-download"></i>
          </a>
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
      photos: [],  // Start with an empty array for photos
      modalPhoto: null,
    };
  },
  mounted() {
    // Fetch photos when the component is mounted
    this.fetchPhotos();
  },
  methods: {
    async fetchPhotos() {
      try {
        // Make an API call to your photos endpoint
        const response = await fetch('https://api.chrispecmusic.com/photos');
        const data = await response.json();
        
        // Populate the photos array with the response data
        if (data.images) {
          this.photos = data.images.map((image) => ({
            name: image.split('/').pop(),  // Extract file name from URL
            src: image,
          }));
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    },
    openModal(photo) {
      this.modalPhoto = photo;
    },
  },
};
</script>

<style>
/* Position the download icon on top of the image */
.download-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.7); /* Semi-transparent white */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;  /* Make sure it's above the image */
}

/* Show the download icon on hover */
.card:hover .download-icon {
  opacity: 1;  /* Make the icon visible when the card is hovered */
}

.card {
  position: relative;  /* Ensure that the card is positioned for the icon */
}

.card-img-top {
  position: relative;  /* Ensure the image can hold the absolute icon */
}
</style>
