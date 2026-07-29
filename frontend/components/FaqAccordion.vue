<template>
  <div class="faq-list">
    <div v-for="(faq, i) in items" :key="faq.q" class="faq-item">
      <h3 class="mb-0">
        <button
          class="faq-question"
          :aria-expanded="opened === i"
          :aria-controls="`${idPrefix}-answer-${i}`"
          :id="`${idPrefix}-question-${i}`"
          @click="toggle(i)"
        >
          <span>{{ faq.q }}</span>
          <span class="faq-indicator" aria-hidden="true">{{ opened === i ? '−' : '+' }}</span>
        </button>
      </h3>
      <div
        v-show="opened === i"
        :id="`${idPrefix}-answer-${i}`"
        role="region"
        :aria-labelledby="`${idPrefix}-question-${i}`"
        class="faq-answer"
      >
        {{ faq.a }}
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Single-open FAQ accordion.
 *
 * The markup and the toggle logic were duplicated verbatim across both booking
 * pages, so a fix to the ARIA wiring had to be made twice. Styles already lived
 * in main.css under .faq-list; only the markup was copied.
 */
defineProps({
  /** Array of { q, a }. See data/faqs.ts. */
  items: { type: Array, required: true },
  /**
   * Namespaces the generated element IDs. Two accordions on one page with the
   * same prefix would produce duplicate IDs and break the aria-controls links.
   */
  idPrefix: { type: String, default: 'faq' },
});

const opened = ref(null);

function toggle(i) {
  opened.value = opened.value === i ? null : i;
}
</script>
