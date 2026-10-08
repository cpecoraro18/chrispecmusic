<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Photos</h1>
        <p class="lead measure mb-5">
          Shots from shows and sessions. Click any photo to view it larger.
        </p>

        <!-- A mosaic rather than a uniform grid: each tile takes the shape of
             its photo, and every twelfth is a large feature. Dense packing
             lets later tiles fill the gaps the larger ones leave. -->
        <div class="photo-wall">
          <div
            v-for="(photo, index) in photos"
            :key="photo.name"
            :class="['photo-tile', 'photo-tile--' + tileShape(photo, index)]"
          >
            <div class="photo-card">
              <button class="photo-trigger" @click="openModal(photo)">
                <!-- Same file the lightbox uses, so opening a photo is a cache
                     hit rather than a second download. loading="lazy" keeps the
                     grid from fetching all 24 up front. -->
                <img
                  :src="photo.web"
                  :alt="photo.name"
                  class="photo-image"
                  loading="lazy"
                  decoding="async"
                  @load="onPhotoLoad($event, photo)"
                />
                <span class="visually-hidden">View larger</span>
              </button>
              <div class="photo-actions">
                <!-- Links straight at the S3 original. No `download`
                     attribute: it is ignored cross-origin, so the save is
                     forced by the Content-Disposition set at upload time. -->
                <a
                  :href="photo.full"
                  class="action-icon"
                  :title="`Download ${photo.name} at full resolution`"
                >
                  <AppIcon name="download" />
                  <span class="visually-hidden">Download {{ photo.name }} at full resolution</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loadingPhotos" class="text-center py-5">
          <AppIcon name="spinner" spin :scale="2" />
          <span class="visually-hidden">Loading photos</span>
        </div>

        <!-- The failure used to be console-only, so a visitor got a blank page
             with no explanation and nothing to click. -->
        <div v-else-if="loadError" class="text-center py-5" role="alert">
          <p class="text-muted mb-3">
            {{ photos.length ? "The next batch of photos couldn't be loaded." : "The photos couldn't be loaded just now." }}
          </p>
          <button class="btn btn-ghost" @click="fetchPhotos">Try again</button>
        </div>

        <div v-else-if="token" class="text-center mt-5">
          <button class="btn btn-ghost" @click.prevent="fetchPhotos">Load More Photos</button>
        </div>

        <p class="photo-credit mt-5 mb-0">
          Photos by AJ Thiede and many others. Thank you for your work.
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
        <AppIcon name="xmark" />
      </button>
      <div class="modal-inner">
        <img :src="modalPhoto.web" :alt="modalPhoto.name" class="modal-image" />
        <a :href="modalPhoto.full" class="btn btn-cta mt-3">
          <AppIcon name="download" class="me-2" />Download full resolution
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
const loadError = ref(false);

const api = useApi();

// The API returns names and URLs only, so a tile learns its photo's
// orientation when the image loads. Until then it is laid out as a portrait,
// the most common shape; lazy loading means most of that reflow happens below
// the fold, before anyone scrolls to it.
const orientations = ref({});

const onPhotoLoad = (event, photo) => {
  const { naturalWidth: w, naturalHeight: h } = event.target;
  if (!w || !h) return;
  const ratio = w / h;
  orientations.value[photo.name] = ratio > 1.8 ? 'wide' : ratio > 1.1 ? 'landscape' : 'portrait';
};

const tileShape = (photo, index) =>
  index % 12 === 0 ? 'feature' : orientations.value[photo.name] ?? 'portrait';

const fetchPhotos = async () => {
  loadingPhotos.value = true;
  loadError.value = false;
  try {
    const data = await api.get('/photos', { token: token.value });
    // The Lambda returns {name, web, full} per photo.
    if (data.photos) {
      photos.value = [...photos.value, ...data.photos];
    }
    // No token in the response means there are no further pages.
    token.value = data.token ?? null;
  } catch (error) {
    console.error('Error fetching photos:', error);
    loadError.value = true;
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
/* ---------------- Mosaic ---------------- */
/* Six columns, four on tablets, two on phones. Row height follows the column
   width (via container units), so a portrait tile keeps roughly a photo's
   proportions at every screen size instead of turning into a sliver. */
.photo-wall {
  --cols: 6;
  --gap: 12px;
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  grid-auto-rows: calc((100cqw - (var(--cols) - 1) * var(--gap)) / var(--cols) * 0.45);
  grid-auto-flow: dense;
  gap: var(--gap);
}

@media (max-width: 991.98px) {
  .photo-wall {
    --cols: 4;
  }
}

@media (max-width: 575.98px) {
  .photo-wall {
    --cols: 2;
    --gap: 10px;
  }
}

.photo-tile--portrait { grid-row: span 3; }
.photo-tile--landscape { grid-column: span 2; grid-row: span 3; }
.photo-tile--wide { grid-column: span 2; grid-row: span 2; }
.photo-tile--feature { grid-column: span 2; grid-row: span 4; }

.photo-card {
  position: relative;
  height: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--charcoal);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
}

.photo-card:hover,
.photo-card:focus-within {
  transform: translateY(-4px) rotate(-0.6deg);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.45);
  z-index: 1;
}

.photo-trigger {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.photo-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.photo-card:hover .photo-image {
  transform: scale(1.06);
}

@media (prefers-reduced-motion: reduce) {
  .photo-card,
  .photo-image {
    transition: none;
  }

  .photo-card:hover,
  .photo-card:focus-within,
  .photo-card:hover .photo-image {
    transform: none;
  }
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
  color: var(--fg-soft);
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
