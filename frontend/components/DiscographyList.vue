<template>
  <!-- Just the grid: the page supplies the section, container, and heading. -->
  <div ref="grid" class="row g-4 justify-content-center">
    <template v-for="(album, index) in discography" :key="album.name">
      <!-- Two across on phones: at three, the covers were too small to see or
           tap. -->
      <div class="col-6 col-md-4 col-lg-2">
        <button
          type="button"
          class="album"
          :class="{ 'album--active': activeIndex === index }"
          :aria-expanded="activeIndex === index"
          aria-controls="album-detail"
          :aria-label="`${album.name} by ${album.artist}, ${album.year}`"
          @click="toggle(index)"
        >
          <img :src="album.image" alt="" class="album-image" />
        </button>
      </div>

      <!-- The detail opens under the row the cover is in, full width, so the
           credits and links have room to be read and tapped. It is placed
           after the last cover of that row, which depends on how many fit
           across at the current width. -->
      <div v-if="active && detailAfter === index" class="col-12">
        <div id="album-detail" class="album-detail" role="region" :aria-label="`${active.name} details`">
          <button type="button" class="detail-close" aria-label="Close" @click="close">
            <AppIcon name="xmark" />
          </button>

          <!-- The record slides out of the sleeve as the panel opens, with the
               album's own art as its center label. -->
          <div class="detail-art" aria-hidden="true">
            <div class="detail-vinyl">
              <img :src="active.image" alt="" class="detail-vinyl-label" />
            </div>
            <img :src="active.image" alt="" class="detail-cover" />
          </div>

          <div class="detail-info">
            <h3 class="detail-title">{{ active.name }}</h3>
            <p class="detail-meta">{{ active.artist }} · {{ active.year }}</p>

            <p class="detail-label">Credits</p>
            <ul class="detail-credits">
              <li v-for="credit in creditsFor(active)" :key="creditKey(credit)">
                {{ formatCredit(credit) }}
              </li>
            </ul>

            <div class="detail-links">
              <!-- A release that is not on a platform yet is a <span>, not a
                   dead <a href="#">: an anchor with nowhere to go is still
                   focusable and still announced as a link. -->
              <component
                :is="isPending(active, platform) ? 'span' : 'a'"
                v-for="platform in platforms"
                :key="platform.name"
                :href="isPending(active, platform) ? null : active.links[platform.name]"
                :target="isPending(active, platform) ? null : '_blank'"
                :rel="isPending(active, platform) ? null : 'noopener'"
                :aria-disabled="isPending(active, platform) ? 'true' : null"
                class="detail-link"
                :class="{ 'detail-link--pending': isPending(active, platform) }"
              >
                <img :src="platform.icon" alt="" class="detail-link-icon" />
                {{ platform.name }}
                <span v-if="isPending(active, platform)" class="detail-soon">Coming soon</span>
              </component>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { discography, platforms, PLATFORM_PENDING } from '~/data/discography';
import { creditsFor } from '~/data/credits';

/**
 * The album grid. Clicking a cover opens a panel under its row: a larger
 * cover with the record sliding out of it, the credits, and the listening
 * links.
 */
const grid = ref(null);
const activeIndex = ref(null);
/** Index of the last cover in the active cover's row; the panel goes after it. */
const detailAfter = ref(null);

const active = computed(() => (activeIndex.value === null ? null : discography[activeIndex.value]));

const isPending = (album, platform) => album.links[platform.name] === PLATFORM_PENDING;

// A scoped credit names its track, so it still makes sense read on its own.
const formatCredit = (credit) =>
  typeof credit === 'string' ? credit : `${credit.role} on “${credit.track}”`;
const creditKey = (credit) => (typeof credit === 'string' ? credit : `${credit.role}:${credit.track}`);

/** The last cover sharing a row with the given one, from where they sit. */
function rowEnd(index) {
  // Queried rather than collected with a ref in the v-for, whose order Vue
  // does not guarantee; the DOM order is the order the covers sit in.
  const els = grid.value ? [...grid.value.querySelectorAll('.album')] : [];
  const top = els[index]?.offsetTop;
  let end = index;
  while (end + 1 < els.length && els[end + 1].offsetTop === top) end++;
  return end;
}

function toggle(index) {
  if (activeIndex.value === index) {
    close();
    return;
  }
  // Measure with the panel closed, so it can't push covers onto a new row.
  activeIndex.value = null;
  detailAfter.value = null;
  nextTick(() => {
    detailAfter.value = rowEnd(index);
    activeIndex.value = index;
  });
}

function close() {
  activeIndex.value = null;
  detailAfter.value = null;
}

function onDocumentClick(e) {
  if (!e.target.closest('.album, .album-detail')) close();
}

function onKeydown(e) {
  if (e.key === 'Escape') close();
}

// Rows reflow on resize, so the panel's place can change; reopening it at the
// same cover recomputes the row.
function onResize() {
  if (activeIndex.value === null) return;
  const index = activeIndex.value;
  detailAfter.value = null;
  activeIndex.value = null;
  nextTick(() => {
    detailAfter.value = rowEnd(index);
    activeIndex.value = index;
  });
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('resize', onResize);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onKeydown);
  window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
/* ---- Covers ---- */
.album {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

/* Each cover fills its column rather than sitting at a fixed size in it. */
.album-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  transition: transform 0.25s ease, box-shadow 0.25s ease, outline-color 0.25s ease;
  outline: 2px solid transparent;
  outline-offset: 3px;
}

.album:hover .album-image,
.album:focus-visible .album-image {
  transform: translateY(-4px);
  box-shadow: 0 0.625em 1.875em rgba(0, 0, 0, 0.5);
}

/* The open album keeps a light ring, so it is clear which cover the panel
   below belongs to. */
.album--active .album-image {
  transform: translateY(-4px);
  outline-color: var(--accent);
}

/* ---- Detail panel ---- */
.album-detail {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: var(--radius-lg);
  background-color: rgba(var(--fg-rgb), 0.07);
  border: 1px solid rgba(var(--fg-rgb), 0.14);
  text-align: left;
  animation: detail-in 0.3s ease;
}

@keyframes detail-in {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: none; }
}

.detail-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  border-radius: 50%;
  background-color: rgba(var(--fg-rgb), 0.1);
  color: var(--fg);
}

.detail-close:hover {
  background-color: rgba(var(--fg-rgb), 0.2);
}

/* ---- Cover and record ---- */
/* Wide enough for the cover plus the part of the record that clears it. */
.detail-art {
  --cover: clamp(10rem, 20vw, 15rem);
  position: relative;
  width: calc(var(--cover) * 1.5);
  height: var(--cover);
}

.detail-cover {
  position: relative;
  z-index: 2;
  width: var(--cover);
  height: var(--cover);
  object-fit: cover;
  border-radius: var(--radius-sm);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
}

.detail-vinyl {
  position: absolute;
  z-index: 1;
  top: 3%;
  left: 3%;
  width: calc(var(--cover) * 0.94);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background:
    linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.1) 50%, transparent 65%),
    repeating-radial-gradient(circle, #151515 0 2px, #1d1d1d 2px 4px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.5);
  animation: vinyl-out 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both;
}

@keyframes vinyl-out {
  from { transform: translateX(0) rotate(0deg); }
  to { transform: translateX(50%) rotate(140deg); }
}

.detail-vinyl-label {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 34%;
  height: 34%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #0d0d0d;
}

/* ---- Text ---- */
.detail-title {
  margin: 0 2.5rem 0.25rem 0; /* clear of the close button */
}

.detail-meta {
  margin-bottom: 1.25rem;
  color: var(--fg-soft);
  font-size: 1.05rem;
}

.detail-label {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-soft);
}

.detail-credits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
}

.detail-credits li {
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background-color: rgba(var(--fg-rgb), 0.12);
  font-weight: 600;
}

/* ---- Listening links ---- */
.detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.detail-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.15rem;
  border-radius: 999px;
  background-color: var(--white);
  color: var(--charcoal);
  font-weight: 650;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.detail-link:hover,
.detail-link:focus-visible {
  color: var(--charcoal);
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
}

.detail-link-icon {
  width: 1.3rem;
  height: 1.3rem;
  object-fit: contain;
}

.detail-link--pending {
  opacity: 0.5;
  cursor: not-allowed;
}

.detail-link--pending:hover {
  transform: none;
  box-shadow: none;
}

.detail-soon {
  font-size: 0.8rem;
  font-weight: 500;
}

/* ---- Phones ---- */
@media (max-width: 767.98px) {
  .album-detail {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .detail-art {
    --cover: 9.5rem;
  }

  .detail-info {
    width: 100%;
  }

  .detail-links {
    flex-direction: column;
  }

  .detail-link {
    justify-content: center;
  }
}
</style>
