<template>
  <div class="container-fluid py-3 review-container">
    <div id="reviewCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="10000">
      <div class="carousel-inner px-5">
        <div
          class="carousel-item"
          :class="{ active: index === 0 }"
          v-for="(chunk, index) in chunkedReviews"
          :key="index"
        >
          <div class="row">
            <div class="col-md-4" v-for="(review, i) in chunk" :key="review.name + i">
              <figure class="text-center p-3 review-item h-100 mb-0">
                <star-rating :rating="review.rating" variant="light" class="mb-2" />
                <blockquote class="mb-2 review-text">"{{ review.review }}"</blockquote>
                <figcaption class="fst-italic review-author">
                  <a :href="FIVERR_PROFILE" target="_blank" rel="noopener">{{ review.name }}</a>
                  <span class="review-country">· {{ review.country }}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reviews, FIVERR_PROFILE } from '~/data/reviews';

// Mix long, medium, and short reviews within each slide so no slide is a wall
// of text or a row of two-word blurbs.
const chunkedReviews = computed(() => {
  const chunkSize = 3;
  const sorted = [...reviews].sort((a, b) => b.review.length - a.review.length);

  const third = Math.ceil(sorted.length / 3);
  const long = sorted.slice(0, third);
  const medium = sorted.slice(third, 2 * third);
  const short = sorted.slice(2 * third);

  const interleaved = [];
  for (let i = 0; i < third; i++) {
    if (medium[i]) interleaved.push(medium[i]);
    if (long[i]) interleaved.push(long[i]);
    if (short[i]) interleaved.push(short[i]);
  }

  const chunks = [];
  for (let i = 0; i < interleaved.length; i += chunkSize) {
    chunks.push(interleaved.slice(i, i + chunkSize));
  }
  return chunks;
});
</script>

<style scoped>
.review-container {
  min-height: 15em; /* 200px / 16 */
}

/* Translucent surface matching the cards elsewhere on the site, rather than a
   light grey tile on a light band. */
.review-item {
  background-color: rgba(var(--text-color-rgb), 0.07);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
  border-radius: var(--radius-md);
  padding: 1.25em;
  margin: 0.3125em;
}

.review-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color);
}

.review-author {
  font-size: 0.875rem;
  color: var(--text-muted-on-dark);
}

.review-author a {
  color: inherit;
}

.review-author a:hover {
  text-decoration: underline;
  color: var(--white);
}

.review-country {
  opacity: 0.75;
}

.carousel-control-prev,
.carousel-control-next {
  width: 3em; /* fixed touch target so it stays usable on mobile, not a % of viewport */
  opacity: 1;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 2.25em;
  height: 2.25em;
  padding: 0.5em;
  border-radius: 50%;
  background-color: rgba(var(--text-color-rgb), 0.14);
  background-origin: content-box;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.carousel-control-prev:hover .carousel-control-prev-icon,
.carousel-control-prev:focus .carousel-control-prev-icon,
.carousel-control-next:hover .carousel-control-next-icon,
.carousel-control-next:focus .carousel-control-next-icon {
  background-color: rgba(var(--text-color-rgb), 0.3);
  transform: scale(1.08);
}

@media only screen and (max-width: 575px) {
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 1.9em;
    height: 1.9em;
  }
}

.carousel-item {
  color: var(--text-color);
}

@media only screen and (max-width: 991px) {
  .review-container {
    min-height: 40em;
  }
}
</style>
