<template>
  <div class="container py-5">
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
          
          <!-- Action Icons -->
          <div class="photo-actions">
            <a 
              :href="photo.src" 
              download 
              class="action-icon" 
              title="Download"
            >
              <i class="fas fa-download"></i>
            </a>
            <a 
              role="button"
              class="action-icon" 
              title="Buy Full Resolution" 
              @click.prevent="downloadPhoto(photo.src)"
            >
              <i class="fas fa-shopping-cart"></i>
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
            class="img-fluid rounded custom-modal-image"
          />
          <div>
            <!-- DOwnload and buy buttons-->
            <a 
              :href="modalPhoto.src" 
              download 
              class="btn btn-primary mt-2 me-2"
              title="Download"
            >
              <i class="fas fa-download"></i> Download
            </a>

            <a 
              role="button" 
              class="btn btn-success mt-2" 
              title="Buy Full Resolution" 
              @click.prevent="downloadPhoto(modalPhoto.src)"
            >
              <i class="fas fa-shopping-cart"></i> Buy Full Resolution
            </a>
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
    async downloadPhoto(src) {
      const imageId = src.split('/').pop();

      try {
        const response = await fetch('https://api.chrispecmusic.com/photo/buy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageId }),
        });

        const result = await response.json();

        if (result.url) {
          window.open(result.url, '_blank');
        } else {
          console.error('No URL returned from server');
        }
      } catch (error) {
        console.error('Error starting checkout:', error);
      }
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

/* Common style for action icons */
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
</style>
