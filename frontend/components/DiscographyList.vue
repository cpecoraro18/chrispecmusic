<template>
    <div class="container-fluid py-5">
        <div class="row">
            <h3 class="mx-auto fw-bold h2 mb-5">Discography</h3>
        </div>
        <div class="row">
            <div class="col-6 col-xl-3 col-sm-4" v-for="(album, index) in discography" :key="album.name">
                <div class="album" @click="toggleAlbumMenu(index)" :class="{ 'menu-active': activeAlbumIndex === index }">
                    <div class="album-container">
                        <img :src="album.image" :alt="album.name" class="img-fluid album-image mb-3">
                        <div class="album-info d-none" :title="album.name + ' - ' + album.artist + ' (' + album.year + ')'">
                            <h5 class="album-name">{{ album.name }}</h5>
                            <p class=" mb-0">{{ album.artist }}</p>
                            <p class="small">{{ album.year }}</p>
                        </div>
                        
                        <!-- Platform Selection Popup -->
                        <div v-if="activeAlbumIndex === index" class="platform-popup" @click.stop>
                            <div class="platform-options">
                                <!-- A release that is not on a platform yet is a
                                     <span>, not a dead <a href="#">: an anchor
                                     with nowhere to go is still focusable and
                                     still announced as a link. -->
                                <component
                                    :is="isPending(album, platform) ? 'span' : 'a'"
                                    v-for="platform in platforms"
                                    :key="platform.name"
                                    :href="isPending(album, platform) ? null : album.links[platform.name]"
                                    :target="isPending(album, platform) ? null : '_blank'"
                                    :rel="isPending(album, platform) ? null : 'noopener'"
                                    :aria-disabled="isPending(album, platform) ? 'true' : null"
                                    class="platform-option"
                                    :class="{ disabled: isPending(album, platform) }"
                                >
                                    <img :src="platform.icon" :alt="platform.name" class="platform-option-icon">
                                    <span>{{ platform.name }}</span>
                                    <span v-if="isPending(album, platform)" class="coming-soon">Coming Soon</span>
                                </component>
                            </div>
                            <!-- The tiles are bare cover art, so the credits
                                 ride in the popup: it is the only part of the
                                 grid with room for words, and it is already
                                 what someone opens when they want to know more
                                 about a record. -->
                            <p class="popup-credits">{{ creditLine(album) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { discography, platforms, PLATFORM_PENDING } from '~/data/discography';
import { creditLine } from '~/data/credits';

/**
 * The album grid. Clicking a cover opens a small menu of streaming links.
 *
 * Converted from the Options API — it was the last component still using it —
 * and the ninety lines of album data it carried now live in data/discography.ts
 * so a future /discography page can render the same records without importing
 * this component.
 */
const activeAlbumIndex = ref(null);

const isPending = (album, platform) => album.links[platform.name] === PLATFORM_PENDING;

function toggleAlbumMenu(index) {
  activeAlbumIndex.value = activeAlbumIndex.value === index ? null : index;
}

function closeAlbumMenu() {
  activeAlbumIndex.value = null;
}

function onDocumentClick(e) {
  if (!e.target.closest('.album')) closeAlbumMenu();
}

onMounted(() => document.addEventListener('click', onDocumentClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick));
</script>

<style scoped>
.container-fluid {
    background-color: var(--bg-dark);
}

.album {
  transition: box-shadow .3s;
  border-radius: 0.3125em; /* 5px / 16 */
  cursor: pointer;
  position: relative;
}

.album-container {
  position: relative;
}

.album.menu-active .album-image {
  transform: scale(1.05);
  box-shadow: 0 0.625em 1.875em rgba(0, 0, 0, 0.7);
}

.album-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.album-image:hover, .album:hover .album-image {
    box-shadow: 0 0.625em 1.875em rgba(0, 0, 0, 0.5); /* 10px / 16 and 30px / 16 */
    transform: scale(1.05);
}

.album-image {
  width: 12.75em; /* 300px / 16 */
  height: 12.75em; /* 300px / 16 */
  object-fit: cover;
  transition: transform .3s, box-shadow .3s;
}

@media only screen and (max-width: 1400px) {
    .album-image {
        width: 16em;
        height: 16em;
    }
}

@media only screen and (max-width: 991px) {
    .album-image {
        width: 12em;
        height: 12em;
    }
}

.platform-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(20, 20, 20, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-dark);
    border-radius: 0.75rem;
    padding: 0;
    z-index: 1000;
    min-width: 250px;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    animation: popupFadeIn 0.2s ease-out;
}

@keyframes popupFadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.platform-options {
    padding: 0.5rem;
}

.platform-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: var(--white);
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    margin-bottom: 0.25rem;
    position: relative;
}

.platform-option:hover:not(.disabled) {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
}

.platform-option.disabled {
    color: var(--secondary);
    cursor: not-allowed;
    opacity: 0.6;
}

.platform-option-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
}

/* Sentence case rather than the uppercase this kind of label usually takes: a
   track-scoped credit carries a song title, and a title set in caps stops
   looking like a title. */
.popup-credits {
    margin: 0;
    padding: 0.65rem 1rem 0.75rem;
    border-top: 1px solid var(--border-dark);
    font-size: 0.8rem;
    color: var(--grey);
}

.coming-soon {
    margin-left: auto;
    font-size: 0.75rem;
    color: var(--grey);
    font-style: italic;
}

/* The popup is centered on its album tile, but the tiles are only ~163px wide
   at col-6 (and ~210px at col-sm-4), so a 250px popup centered on a
   right-hand tile hangs off the right edge of the screen and the page
   sidescrolls for as long as it is open. Below 768px, center it in the
   viewport instead of on the tile, which cannot overflow at any width. */
@media only screen and (max-width: 767.98px) {
    .platform-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        min-width: 0;
        width: max-content;
        max-width: min(20rem, calc(100vw - 2.5rem));
    }
}

@media only screen and (max-width: 576px) {
    
    
    .platform-option {
        padding: 0.6rem 0.8rem;
    }
    
    .platform-option-icon {
        width: 18px;
        height: 18px;
    }
}
</style>