<template>
  <span
    class="stars"
    :class="`stars--${variant}`"
    :style="{ '--fill': fillPercent }"
    :aria-label="`Rated ${rating} out of 5`"
  >
    <span class="stars-track" aria-hidden="true">★★★★★</span>
    <span class="stars-fill" aria-hidden="true">★★★★★</span>
  </span>
</template>

<script setup>
const props = defineProps({
  rating: { type: Number, required: true },
  // 'light' for dark backgrounds, 'dark' for light backgrounds — only affects
  // the colour of the unfilled track.
  variant: { type: String, default: 'dark' },
});

// Fills proportionally rather than rounding, so a 4.7 shows as 4.7 stars
// instead of being promoted to a full 5.
const fillPercent = computed(() => `${Math.max(0, Math.min(1, props.rating / 5)) * 100}%`);
</script>

<style scoped>
.stars {
  position: relative;
  display: inline-block;
  font-size: 0.9rem;
  line-height: 1;
  letter-spacing: 0.12em;
  white-space: nowrap;
}

.stars--dark .stars-track {
  color: rgba(0, 0, 0, 0.2);
}

.stars--light .stars-track {
  color: rgba(255, 255, 255, 0.25);
}

.stars-fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--fill);
  overflow: hidden;
  color: #C8951B;
}

.stars--light .stars-fill {
  color: #E8B931; /* brighter gold reads better against the dark cards */
}
</style>
