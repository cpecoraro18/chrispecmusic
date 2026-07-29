<template>
  <div class="yt-embed">
    <!-- Once activated the real player replaces the facade and autoplays, so
         the click that revealed it also starts it — one click, not two. -->
    <iframe
      v-if="activated"
      :src="playerSrc"
      :title="title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>

    <button v-else type="button" class="yt-facade" @click="activate">
      <img
        :src="thumbnail"
        alt=""
        class="yt-thumb"
        width="480"
        height="360"
        loading="lazy"
        decoding="async"
      />
      <span class="yt-play" aria-hidden="true">
        <svg viewBox="0 0 68 48" focusable="false">
          <path
            class="yt-play-bg"
            d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2 0 34 0 34 0S12.8 0 7.5 1.7a8.5 8.5 0 0 0-6 6A89 89 0 0 0 0 24a89 89 0 0 0 1.5 16.3 8.5 8.5 0 0 0 6 6C12.8 48 34 48 34 48s21.2 0 26.5-1.7a8.5 8.5 0 0 0 6-6A89 89 0 0 0 68 24a89 89 0 0 0-1.5-16.3z"
          />
          <path d="M45 24 27 14v20z" fill="#fff" />
        </svg>
      </span>
      <span class="visually-hidden">Play video: {{ title }}</span>
    </button>
  </div>
</template>

<script setup>
/**
 * A YouTube embed that does not load YouTube until asked.
 *
 * A bare <iframe> pulls roughly a megabyte of player JavaScript and sets
 * cookies the moment the page loads, and /portfolio renders nineteen of them.
 * Rendering a thumbnail plus a play button instead costs one ~15KB image, and
 * only the video someone actually clicks pays the full price.
 *
 * The player uses youtube-nocookie.com, which defers YouTube's tracking
 * cookies until playback rather than setting them on embed.
 */
const props = defineProps({
  /** The YouTube video ID, e.g. 'dQw4w9WgXcQ' — not a full URL. */
  id: { type: String, required: true },
  /** Used as the iframe title and the button's accessible name. */
  title: { type: String, required: true },
});

const activated = ref(false);

// hqdefault is the only still that is guaranteed to exist for every video.
// maxresdefault 404s on older or lower-resolution uploads, which would leave a
// broken image in the grid. It is 4:3 with letterboxing, which the cover fit
// below crops back to the 16:9 frame.
const thumbnail = computed(() => `https://i.ytimg.com/vi/${props.id}/hqdefault.jpg`);

const playerSrc = computed(
  () => `https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1`
);

function activate() {
  activated.value = true;
}
</script>

<style scoped>
.yt-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--bg-black);
}

.yt-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.yt-facade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.yt-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.yt-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4.25rem;
  transition: transform 0.2s ease;
}

.yt-play svg {
  width: 100%;
  height: auto;
  display: block;
}

/* YouTube red only on hover — at rest it sits back so the still image reads as
   the content rather than the button. */
.yt-play-bg {
  fill: rgba(20, 20, 20, 0.78);
  transition: fill 0.2s ease;
}

.yt-facade:hover .yt-play,
.yt-facade:focus-visible .yt-play {
  transform: translate(-50%, -50%) scale(1.08);
}

.yt-facade:hover .yt-play-bg,
.yt-facade:focus-visible .yt-play-bg {
  fill: #f00;
}
</style>
