<template>
  <section class="cta-band">
    <div class="container">
      <h2 class="mb-3">{{ title }}</h2>
      <p v-if="lead" class="lead measure mb-4">{{ lead }}</p>
      <div class="cta-actions">
        <slot />
      </div>
      <p v-if="showEmail" class="mt-4 mb-0">
        <a :href="`mailto:${CONTACT_EMAIL}`" class="cta-email">{{ CONTACT_EMAIL }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { CONTACT_EMAIL } from '~/data/service';

/**
 * The closing call-to-action that ends most pages. Buttons go in the slot so
 * each page can choose its own primary action.
 *
 * The .cta-band and .cta-actions styles already lived in main.css; this is the
 * markup around them, which was written out on six pages — three of which had
 * their own near-identical copy of the .cta-actions flex rules in a scoped
 * block as well.
 */
defineProps({
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  /** Offers the mailto fallback under the buttons. */
  showEmail: { type: Boolean, default: false },
});
</script>
