<template>
  <div class="min-vh-100">
    <div class="container py-5">
      <h2 class="mb-4">Photo Gallery</h2>

      <div class="row g-4">
        <div 
          v-for="(photo, index) in photos" 
          :key="index" 
          class="col-6 col-md-4 col-lg-3"
        >
          <div class="card shadow-sm position-relative group">
            <img 
              :src="photo.src" 
              :alt="photo.name" 
              class="card-img-top rounded"
              @click="openModal(photo)" 
              style="cursor: pointer;"
            />
            <!-- Download Icon -->
            <div class="photo-actions">
              <a 
                :href="photo.src" 
                download 
                class="action-icon" 
                title="Download"
              >
                <i class="fas fa-download"></i>
              </a>
            </div>
          </div>
        </div>
        <div v-if="loadingPhotos" class="text-center py-4">
          <i class="fa fa-spinner fa-spin fa-2x"></i>
        </div>
        <div v-if="token" class="col-12 text-center mt-4">
          <button 
            class="btn btn-outline-light" 
            @click.prevent="fetchPhotos"
          >
            Load More Photos
          </button>
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
              class="img-fluid rounded custom-modal-image"
              loading="lazy"
            />
            <div>
              <a 
                :href="modalPhoto.src" 
                download 
                class="btn btn-outline-light mt-2"
                title="Download"
              >
                <i class="fas fa-download"></i> Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      photos: [],
      modalPhoto: null,
      token: null,
      loadingPhotos: false,
    };
  },
  mounted() {
    this.fetchPhotos();
  },
  methods: {
    async fetchPhotos() {
      this.loadingPhotos = true;
      try {
       const url = new URL('https://api.chrispecmusic.com/photos');
        if (this.token) {
          url.searchParams.append('token', this.token);
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.images) {
          this.photos = [
            ...this.photos,
            ...data.images.map((image) => ({
              name: image.split('/').pop(),
              src: image,
            })),
          ];
        }
        if (data.token) {
          this.token = data.token;
        } else {
          this.token = null; // No more photos to load
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        this.loadingPhotos = false;
      }
    },
    openModal(photo) {
      this.modalPhoto = photo;
    }
  }
};
</script>

<style>
/* Position the download icon on top of the image */
.download-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.card:hover .download-icon {
  opacity: 1;
}

.card {
  position: relative;
}

.card-img-top {
  position: relative;
}

.photo-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.action-icon {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.75rem;
  text-decoration: none;
}

.card:hover .photo-actions {
  opacity: 1;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}
</style>