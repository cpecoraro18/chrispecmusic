<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Photos</h1>
        <p class="lead measure mb-5">
          Shots from shows and sessions. Click any photo to view it larger.
        </p>

        <div class="row g-4">
          <div
            v-for="(photo, index) in photos"
            :key="index"
            class="col-6 col-md-4 col-lg-3"
          >
            <div class="photo-card">
              <button class="photo-trigger" @click="openModal(photo)">
                <img
                  :src="photo.src"
                  :alt="photo.name"
                  class="photo-image"
                  loading="lazy"
                  decoding="async"
                />
                <span class="visually-hidden">View larger</span>
              </button>
              <div class="photo-actions">
                <a :href="photo.src" download class="action-icon" :title="`Download ${photo.name}`">
                  <i class="fas fa-download" aria-hidden="true"></i>
                  <span class="visually-hidden">Download {{ photo.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loadingPhotos" class="text-center py-5">
          <i class="fa fa-spinner fa-spin fa-2x" aria-hidden="true"></i>
          <span class="visually-hidden">Loading photos</span>
        </div>

        <div v-if="token" class="text-center mt-5">
          <button class="btn btn-ghost" @click.prevent="fetchPhotos">Load More Photos</button>
        </div>

        <p class="photo-credit mt-5 mb-0">
          Photos by AJ Thiede and many others — thank you for your work.
        </p>
      </div>
    </section>

    <!-- Lightbox -->
    <div
      v-if="modalPhoto"
      class="photo-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="modalPhoto.name"
      @click.self="closeModal"
    >
      <button class="modal-close" @click="closeModal" aria-label="Close">
        <i class="fas fa-xmark" aria-hidden="true"></i>
      </button>
      <div class="modal-inner">
        <img :src="modalPhoto.src" :alt="modalPhoto.name" class="modal-image" />
        <a :href="modalPhoto.src" download class="btn btn-cta mt-3">
          <i class="fas fa-download me-2" aria-hidden="true"></i>Download
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeo({
  title: 'Photos | Chris Pecoraro, Chicago Bassist',
  description: 'Photo gallery of Chris Pecoraro performing on upright and electric bass at shows and studio sessions.',
});

const photos = ref([]);
const modalPhoto = ref(null);
const token = ref(null);
const loadingPhotos = ref(false);

const fetchPhotos = async () => {
  loadingPhotos.value = true;
  try {
    const url = new URL('https://api.chrispecmusic.com/photos');
    if (token.value) {
      url.searchParams.append('token', token.value);
    }
    const response = await fetch(url);
    const data = await response.json();
    if (data.images) {
      photos.value = [
        ...photos.value,
        ...data.images.map((image) => ({
          name: image.split('/').pop(),
          src: image,
        })),
      ];
    }
    // No token in the response means there are no further pages.
    token.value = data.token ?? null;
  } catch (error) {
    console.error('Error fetching photos:', error);
  } finally {
    loadingPhotos.value = false;
  }
};

const openModal = (photo) => {
  modalPhoto.value = photo;
};

const closeModal = () => {
  modalPhoto.value = null;
};

// The lightbox was previously dismissable only by clicking it; Escape is what
// people reach for first.
const onKeydown = (event) => {
  if (event.key === 'Escape') closeModal();
};

onMounted(() => {
  fetchPhotos();
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.photo-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.photo-trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.photo-image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-card:hover .photo-image {
  transform: scale(1.04);
}

.photo-actions {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.photo-card:hover .photo-actions,
.photo-card:focus-within .photo-actions {
  opacity: 1;
}

.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--white);
  font-size: 1rem;
  text-decoration: none;
}

.action-icon:hover {
  background-color: rgba(0, 0, 0, 0.85);
  color: var(--white);
}

.photo-credit {
  font-size: 0.85rem;
  color: var(--text-muted-on-dark);
}

/* ---------------- Lightbox ---------------- */
.photo-modal {
  position: fixed;
  inset: 0;
  z-index: 1080;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.85);
}

.modal-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
}

.modal-image {
  max-width: min(92vw, 70rem);
  max-height: 78vh;
  object-fit: contain;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.14);
  color: var(--white);
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.18s ease;
}

.modal-close:hover {
  background-color: rgba(255, 255, 255, 0.28);
}
</style>
