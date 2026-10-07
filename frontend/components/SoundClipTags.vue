<template>
  <!-- The bass leads because it decides the sound more than anything after it
       in the chain; it is the one tag a client scans for first. -->
  <ul class="clip-tags list-unstyled mb-0" aria-label="Gear and technique">
    <li class="clip-tag clip-tag--bass">{{ clip.bass }}</li>
    <li v-for="item in clip.gear" :key="item" class="clip-tag">{{ item }}</li>
    <li v-for="item in clip.techniques" :key="item" class="clip-tag clip-tag--technique">{{ item }}</li>
  </ul>
</template>

<script setup lang="ts">
import type { SoundClip } from '~/data/sounds';

/** The bass, gear, and technique tags under the gallery's player. Styled for its dark panel. */
defineProps<{ clip: SoundClip }>();
</script>

<style scoped>
.clip-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.clip-tag {
  font-size: 0.78rem;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-sm);
  background-color: rgba(var(--fg-rgb), 0.1);
  color: var(--fg-soft);
}

.clip-tag--bass {
  background-color: var(--fg);
  color: var(--on-fg);
  font-weight: 600;
}

.clip-tag--technique {
  background-color: transparent;
  border: 1px dashed rgba(var(--fg-rgb), 0.35);
}
</style>
