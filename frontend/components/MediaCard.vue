<template>
  <article class="media-card h-100" :class="`media-card--${variant}`">
    <div class="media-card-media">
      <slot name="media" />
    </div>
    <div class="media-card-body">
      <component :is="titleLevel" class="h4 mb-2">{{ title }}</component>
      <span v-if="badge" class="media-card-badge mb-3">{{ badge }}</span>
      <p v-if="copy" class="media-card-copy mb-0">{{ copy }}</p>
      <slot />
    </div>
  </article>
</template>

<script setup>
/**
 * Card with media on top and a title, optional badge, and body beneath.
 *
 * /gear and /portfolio each had their own card with the same structure and
 * different colours; a blog index would have been a third. The media itself is
 * a slot so the card does not need to know whether it is holding an <img>, a
 * video embed, or anything else.
 */
defineProps({
  title: { type: String, required: true },
  /** Small pill above the copy, e.g. a gear type or a video genre. */
  badge: { type: String, default: '' },
  copy: { type: String, default: '' },
  /** 'light' is the pale panel used on /gear; 'dark' is the translucent one. */
  variant: { type: String, default: 'dark' },
  /** Heading level, so cards nested under an h2 can use h3. */
  titleLevel: { type: String, default: 'h3' },
});
</script>

<style scoped>
.media-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.media-card--dark {
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
}

.media-card--light {
  border-radius: var(--radius-lg);
  background-color: var(--bg-light-blue);
  color: var(--text-color-dark);
  box-shadow: var(--shadow-sm);
}

.media-card-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 1rem 1.1rem 1.2rem;
  flex-grow: 1;
}

.media-card--light .media-card-body {
  padding: 1.25rem;
}

.media-card-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  border: 1px solid rgba(var(--text-color-rgb), 0.24);
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
}

/* On the pale card the blue-on-white badge fails contrast, so it takes the
   darker ink and border the surrounding text uses. */
.media-card--light .media-card-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  color: var(--blue-deep);
  border-color: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.6rem;
}

.media-card--light .media-card-copy {
  color: var(--text-color-dark);
  flex-grow: 1;
}
</style>
