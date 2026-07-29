<template>
  <div class="icon-feature rule-top h-100">
    <AppIcon :name="icon" class="icon-feature-icon" />
    <h3 class="h4 mb-2">{{ title }}</h3>
    <p class="mb-0 text-muted">{{ copy }}</p>
  </div>
</template>

<script setup>
/**
 * Icon, heading, short paragraph. Sat above a hairline rule.
 *
 * /book-session called this .included-item and /book-live-gig called it
 * .venue-item; the two rule sets were character-for-character identical apart
 * from the class name.
 */
defineProps({
  /** An icon name from data/icons.generated.ts, e.g. 'music'. */
  icon: { type: String, required: true },
  title: { type: String, required: true },
  copy: { type: String, required: true },
});
</script>

<style scoped>
.icon-feature-icon {
  font-size: 1.35rem;
  color: var(--blue);
  margin-bottom: 0.9rem;
  display: block;
}
</style>
