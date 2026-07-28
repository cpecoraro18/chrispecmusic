<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="hero">
      <div class="hero-scrim"></div>
      <div class="container hero-inner">
        <div class="hero-text">
          <p class="eyebrow mb-2">Chris Pecoraro · Chicago</p>
          <h1 class="hero-title">Remote Session Bass Player</h1>
          <p class="lead hero-sub">
            Upright and electric bass for your record, recorded in my studio and delivered
            mix-ready. Send me your song — {{ TAKES_PER_TRACK }} takes to choose from, revisions
            included, typically back within {{ TURNAROUND }}.
          </p>
          <div class="hero-actions">
            <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
            <a class="btn btn-ghost" href="#samples">Hear the Bass</a>
          </div>
          <p class="hero-note mb-0">
            100+ remote sessions delivered for songwriters, producers, and bands worldwide.
          </p>
        </div>
      </div>
      <a class="hero-scroll" href="#samples" aria-label="Scroll to bass samples">
        <i class="fas fa-chevron-down" aria-hidden="true"></i>
      </a>
    </section>

    <!-- ================= TRUST BAR ================= -->
    <section class="trust-bar">
      <div class="container">
        <ul class="trust-list">
          <li v-for="stat in trustStats" :key="stat.label">
            <span class="trust-value">{{ stat.value }}</span>
            <span class="trust-label">{{ stat.label }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ================= HEAR THE BASS ================= -->
    <section id="samples" class="section-tight bg-light text-dark">
      <div class="container">
        <h2 class="text-dark mb-3">Hear what you'd be getting</h2>
        <p class="lead text-dark measure mb-4">
          Real takes from my studio across five basses and both DI and amp tones. Toggle drums on
          or off to hear how the part sits in a mix.
        </p>
        <bass-audio-samples></bass-audio-samples>
        <div class="mt-4">
          <nuxt-link class="btn btn-cta" to="/book-session">Get Bass on Your Track</nuxt-link>
        </div>
      </div>
    </section>

    <!-- ================= SERVICES ================= -->
    <section class="section">
      <div class="container">
        <h2 class="mb-3">Two ways to work together</h2>
        <p class="lead text-muted measure mb-5">
          Whether you need bass on a record or on a stage, you get the same thing: someone who
          shows up prepared and plays what the song needs.
        </p>

        <div class="row g-4 justify-content-center">
          <div class="col-12 col-lg-6">
            <article class="service-card service-card--primary h-100">
              <span class="service-flag">Most requested</span>
              <i class="fas fa-headphones service-icon" aria-hidden="true"></i>
              <h3 class="mb-2">Remote Recording Sessions</h3>
              <p class="service-copy">
                Send a rough mix and any notes on feel or tone. You get back mix-ready stems that
                drop straight into your session — no extra editing or engineering needed.
              </p>
              <ul class="service-points">
                <li>{{ TAKES_PER_TRACK }} different takes to choose from</li>
                <li>Upright, fretted, fretless, and slap tones</li>
                <li>Revisions included until it fits</li>
                <li>You own the recordings outright</li>
              </ul>
              <nuxt-link class="btn btn-cta w-100" to="/book-session">
                Book a Recording Session
              </nuxt-link>
            </article>
          </div>

          <div class="col-12 col-lg-6">
            <article class="service-card h-100">
              <i class="fas fa-guitar service-icon" aria-hidden="true"></i>
              <h3 class="mb-2">Live Performance</h3>
              <p class="service-copy">
                Upright and electric bass for clubs, weddings, corporate events, festivals, and
                touring dates — locally in Chicago or on the road.
              </p>
              <ul class="service-points">
                <li>Reads charts or learns by ear</li>
                <li>Jazz, blues, rock, pop, soul, and folk</li>
                <li>Pro backline for any size room</li>
                <li>Can help assemble a full band</li>
              </ul>
              <nuxt-link class="btn btn-ghost w-100" to="/book-live-gig">
                Book a Live Gig
              </nuxt-link>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= HOW IT WORKS ================= -->
    <section class="section-tight how-it-works">
      <div class="container">
        <p class="eyebrow mb-2">Simple process</p>
        <h2 class="mb-5">From your demo to a finished bass track</h2>
        <div class="row g-4">
          <div class="col-12 col-md-4" v-for="(step, i) in steps" :key="step.title">
            <div class="step">
              <span class="step-number">{{ i + 1 }}</span>
              <h3 class="h4 mb-2">{{ step.title }}</h3>
              <p class="text-muted mb-0">{{ step.copy }}</p>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <nuxt-link class="btn btn-ghost" to="/book-session">
            See pricing and full details
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- ================= PROOF: PULL QUOTES ================= -->
    <section class="section-tight quotes-section">
      <div class="container">
        <p class="eyebrow mb-2">In their words</p>
        <h2 class="mb-5">Producers keep coming back</h2>
        <div class="row g-4">
          <div class="col-12 col-md-4" v-for="review in featuredReviews" :key="review.name">
            <figure class="quote-card h-100 mb-0">
              <star-rating :rating="review.rating" variant="light" class="quote-stars" />
              <blockquote class="quote-text">{{ review.review }}</blockquote>
              <figcaption class="quote-author">
                {{ review.name }} <span class="quote-country">· {{ review.country }}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <div class="bg-light pb-5">
      <div class="text-center pt-5">
        <h2 class="text-dark mb-2">What clients say</h2>
        <p class="lead text-dark measure mb-3">
          A selection of reviews from clients.
        </p>
      </div>
      <review-list></review-list>
    </div>

    <!-- ================= DISCOGRAPHY ================= -->
    <discography-list></discography-list>

    <!-- ================= ABOUT ================= -->
    <section class="section">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-12 col-lg-5">
            <img
              src="/img/BuddyGuys.jpg"
              alt="Chris Pecoraro playing upright bass with the Sean McKee Band at Buddy Guy's Legends in Chicago"
              class="img-fluid rounded shadow about-photo"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="col-12 col-lg-7 text-lg-start">
            <p class="eyebrow mb-2">Who you're hiring</p>
            <h2 class="mb-3">Chicago bassist, upright and electric</h2>
            <p class="lead text-muted">
              I play with rock and jazz bands, orchestras, musicals, and vocal ensembles, and I
              record remotely for artists around the world. I'm always glad to hear about a new
              project, in the studio or on stage.
            </p>
            <nuxt-link class="btn btn-ghost mt-3" to="/about">More about me</nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= EVENTS ================= -->
    <section class="section-tight">
      <div class="container">
        <events-list :limit="5"></events-list>
      </div>
    </section>

    <!-- ================= FINAL CTA ================= -->
    <section class="final-cta">
      <div class="container">
        <h2 class="mb-3">Let's put bass on your track</h2>
        <p class="lead measure mb-4">
          Tell me about your project and I'll come back with a plan and a quote. No obligation,
          and you don't pay until you're happy with the takes.
        </p>
        <div class="hero-actions justify-content-center">
          <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
          <nuxt-link class="btn btn-ghost" to="/contact">Ask a Question</nuxt-link>
        </div>
        <p class="mt-4 mb-0">
          <i class="fa fa-envelope me-2" aria-hidden="true"></i>
          <a href="mailto:contact@chrispecmusic.com" class="fw-bold">contact@chrispecmusic.com</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { featuredReviews } from '~/data/reviews';

// Service promises surfaced in several places on this page. Kept as constants so
// they can be changed in one spot rather than hunted down across the copy.
const TURNAROUND = '2–3 days';
const TAKES_PER_TRACK = '2–3';

// Deliberately not derived from the reviews array — see the note in
// data/reviews.js. "15+" is a floor claim (those countries are evidenced by
// reviews on file), not an average or a total.
const trustStats = [
  { value: '100+', label: 'Remote sessions delivered' },
  { value: '15+', label: 'Countries worked with' },
  { value: TURNAROUND, label: 'Typical turnaround' },
];

const steps = [
  {
    title: 'Send your track',
    copy: 'A rough mix or demo, plus any references or notes on the feel you want. Not sure what you want? That is normal — I will suggest options.',
  },
  {
    title: 'I record your bass',
    copy: `I cut ${TAKES_PER_TRACK} takes with different approaches so you can pick the one that serves the song, then request tweaks until it fits.`,
  },
  {
    title: 'You get mix-ready stems',
    copy: 'Final files land in your inbox ready to drop into your session. You pay once you are happy, and the recordings are yours to use however you like.',
  },
];

useHead({
  title: 'Chris Pecoraro | Remote Bass Recording & Chicago Session Bassist',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Hire a professional upright and electric bassist. Mix-ready remote bass tracks recorded in my Chicago studio, with multiple takes and revisions included. 100+ remote sessions for artists worldwide.',
    },
  ],
  link: [
    // The hero image is the LCP element; preloading it shaves a round trip.
    { rel: 'preload', as: 'image', href: '/img/ChrisPecMusic.jpg', fetchpriority: 'high' },
  ],
});
</script>

<style scoped>
/* ---------------- Hero ---------------- */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh; /* avoids the mobile browser-chrome jump; vh is the fallback */
  display: flex;
  align-items: center;
  background-image: url('/img/ChrisPecMusic.jpg');
  background-position: center 20%;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

/* Separate scrim element so the gradient can be tuned per breakpoint without
   restating the background image. Darker on the left keeps the headline
   readable while leaving the photo visible on the right. */
.hero-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      100deg,
      rgba(12, 18, 23, 0.94) 0%,
      rgba(12, 18, 23, 0.78) 38%,
      rgba(12, 18, 23, 0.25) 68%,
      rgba(12, 18, 23, 0.05) 100%
    ),
    linear-gradient(to bottom, rgba(12, 18, 23, 0.55) 0%, rgba(12, 18, 23, 0) 30%);
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.hero-text {
  max-width: 40rem;
  text-align: left;
  padding-block: 6rem 4rem;
}

.hero-title {
  margin-bottom: 1.25rem;
  text-wrap: balance;
}

.hero-sub {
  color: var(--text-muted-on-dark);
  max-width: 34rem;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-bottom: 1.75rem;
}

.hero-note {
  font-size: 0.95rem;
  color: var(--text-muted-on-dark);
}

.hero-note .fa-star {
  color: #E8B931;
  margin-right: 0.35rem;
}

.hero-scroll {
  position: absolute;
  left: 50%;
  bottom: 1.75rem;
  transform: translateX(-50%);
  z-index: 1;
  color: var(--text-muted-on-dark);
  font-size: 1.25rem;
  animation: heroBob 2.4s ease-in-out infinite;
}

.hero-scroll:hover {
  color: var(--white);
}

@keyframes heroBob {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 7px); }
}

@media only screen and (max-width: 991px) {
  .hero {
    background-position: 62% center;
  }
  .hero-scrim {
    background: linear-gradient(
      to bottom,
      rgba(12, 18, 23, 0.72) 0%,
      rgba(12, 18, 23, 0.6) 45%,
      rgba(12, 18, 23, 0.92) 100%
    );
  }
  .hero-text {
    max-width: none;
    text-align: center;
    padding-block: 7rem 5rem;
  }
  .hero-sub {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-actions .btn {
    flex: 1 1 15rem;
  }
}

/* ---------------- Trust bar ---------------- */
.trust-bar {
  background-color: var(--blue-deep);
  border-block: 1px solid rgba(var(--text-color-rgb), 0.12);
  padding-block: 1.75rem;
}

.trust-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.trust-list li {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.trust-value {
  font-size: clamp(1.4rem, 1.1rem + 1.1vw, 2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.trust-label {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--text-muted-on-dark);
}

@media only screen and (max-width: 575px) {
  .trust-list {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }
}

/* ---------------- Eyebrow on light sections ---------------- */
.eyebrow-dark {
  color: rgba(0, 0, 0, 0.55);
}

/* ---------------- Services ---------------- */
.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 2.25rem;
  border-radius: var(--radius-lg);
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--text-color-rgb), 0.3);
  background-color: rgba(var(--text-color-rgb), 0.09);
}

.service-card--primary {
  background-color: rgba(var(--text-color-rgb), 0.11);
  border-color: rgba(var(--text-color-rgb), 0.32);
  box-shadow: var(--shadow-lg);
}

.service-flag {
  position: absolute;
  top: -0.75rem;
  left: 2.25rem;
  background-color: var(--text-color);
  color: var(--blue-deep);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
}

.service-icon {
  font-size: 1.6rem;
  color: var(--blue);
  margin-bottom: 1rem;
}

.service-copy {
  color: var(--text-muted-on-dark);
  margin-bottom: 1.25rem;
}

.service-points {
  list-style: none;
  padding: 0;
  margin: 0 0 1.75rem;
  flex-grow: 1;
}

.service-points li {
  position: relative;
  padding-left: 1.6rem;
  margin-bottom: 0.6rem;
  color: var(--text-muted-on-dark);
}

/* Drawn with a plain unicode check rather than a Font Awesome glyph: the FA kit
   can render in SVG mode, in which case the icon webfont is never loaded and a
   ::before glyph would silently fall back to tofu. */
.service-points li::before {
  content: '\2713';
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--blue);
}

/* ---------------- How it works ---------------- */
.how-it-works {
  background-color: var(--blue-deep);
}

.step {
  text-align: left;
  padding: 1.5rem 0 0;
  border-top: 2px solid rgba(var(--text-color-rgb), 0.22);
  height: 100%;
}

.step-number {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--blue);
  margin-bottom: 0.6rem;
}

/* ---------------- Pull quotes ---------------- */
.quote-card {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background-color: rgba(var(--text-color-rgb), 0.07);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
}

/* Sizing/colour live in StarRating itself; this only handles placement, to
   avoid two same-specificity scoped rules fighting over the component root. */
.quote-stars {
  display: block;
  margin-bottom: 0.9rem;
}

.quote-text {
  font-size: 1.02rem;
  line-height: 1.65;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.quote-text::before {
  content: '\201C';
}

.quote-text::after {
  content: '\201D';
}

.quote-author {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-muted-on-dark);
}

.quote-country {
  font-weight: 400;
  opacity: 0.8;
}

/* ---------------- About ---------------- */
.about-photo {
  width: 100%;
  object-fit: cover;
}

.credit-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  text-align: left; /* #app centers text globally; the dash markers need left */
}

.credit-list li {
  position: relative;
  padding-left: 1.6rem;
  margin-bottom: 0.7rem;
  color: var(--text-muted-on-dark);
}

.credit-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 0.6rem;
  height: 2px;
  background-color: var(--blue);
}

/* ---------------- Final CTA ---------------- */
.final-cta {
  background-color: var(--blue-deep);
  padding-block: var(--section-y);
  border-top: 1px solid rgba(var(--text-color-rgb), 0.12);
}

.final-cta .hero-actions {
  margin-bottom: 0;
}
</style>
