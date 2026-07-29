<template>
  <div :class="alignClass">
    <p v-if="eyebrow" class="eyebrow mb-2">{{ eyebrow }}</p>
    <component :is="level" :class="headingClass">{{ title }}</component>
    <p v-if="lead" class="lead text-muted measure" :class="leadClass">{{ lead }}</p>
    <slot />
  </div>
</template>

<script setup>
/**
 * Eyebrow + heading + lead paragraph, the opening of nearly every section on
 * the site. Written out by hand around fifteen times, with the spacing classes
 * slightly different each time.
 */
const props = defineProps({
  title: { type: String, required: true },
  /** Small letterspaced label above the heading. */
  eyebrow: { type: String, default: '' },
  /** Intro paragraph below the heading. */
  lead: { type: String, default: '' },
  /** Heading level. Pages should use h1 once; sections use h2. */
  level: { type: String, default: 'h2' },
  align: { type: String, default: 'center' },
});

const alignClass = computed(() => (props.align === 'start' ? 'text-lg-start' : ''));

// Tighter gap under the heading when a lead follows it, wider when the heading
// is the last thing before the content.
const headingClass = computed(() => (props.lead ? 'mb-3' : 'mb-5'));
const leadClass = computed(() => (props.align === 'start' ? 'ms-lg-0 mb-5' : 'mb-5'));
</script>
