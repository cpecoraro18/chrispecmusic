<template>
  <div class="container">
    <!-- A plain grid rather than a carousel: with six reviews, a carousel hid
         half of them on a second slide most visitors never reach. -->
    <div class="row g-3 text-start">
      <div
        v-for="(review, index) in reviews"
        :key="review.name + index"
        class="col-12 col-md-6 col-lg-4"
        :class="{ 'review-extra': index >= MOBILE_COUNT }"
      >
        <figure class="review-item on-light h-100 mb-0">
          <div>
            <!-- Decorative: the blockquote already says this is a quote, so the
                 straight quote marks around the text went once this arrived. -->
            <span class="review-mark" aria-hidden="true">&ldquo;</span>
            <blockquote class="mb-3 review-text">{{ review.review }}</blockquote>
          </div>
          <figcaption class="review-author">
            <a :href="FIVERR_PROFILE" target="_blank" rel="noopener">{{ review.name }}</a>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reviews, FIVERR_PROFILE } from '~/data/reviews';

/**
 * Phones show only the first few: six stacked quotes is a long scroll. There
 * is no "show all" button, because one makes the list read as exhaustive
 * rather than a selection. Larger screens show every review.
 */
const MOBILE_COUNT = 3;
</script>

<style scoped>
/* Pale card with dark ink, the same light surface as the cards on /gear, so
   the quotes stand out from the dark bands around them. */
.review-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--card);
  color: var(--text-color-dark);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 1.5em 1.25em;
}

.review-mark {
  display: block;
  height: 1.6rem;
  margin-bottom: 0.5rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 4rem;
  line-height: 1;
  color: var(--daphne-deep);
  opacity: 0.35;
}

.review-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color-dark);
}

.review-author {
  font-size: 0.875rem;
  color: var(--accent);
}

.review-author a {
  color: inherit;
  font-weight: 600;
}

.review-author a:hover {
  text-decoration: underline;
  color: var(--accent);
}

@media (max-width: 767.98px) {
  .review-extra {
    display: none;
  }
}
</style>
