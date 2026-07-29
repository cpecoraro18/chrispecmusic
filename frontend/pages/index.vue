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
            Professional Electric and Upright Bassist
          </p>
          <div class="hero-actions">
            <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
            <a class="text-link" href="#listen">See more <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
      <a class="hero-scroll" href="#listen" aria-label="Scroll to bass samples">
        <i class="fas fa-chevron-down" aria-hidden="true"></i>
      </a>
    </section>

    <!-- ================= LISTEN ================= -->
    <section id="listen" class="section listen-section">
      <div class="container">
        <p class="eyebrow mb-2">Listen</p>
        <h2 class="mb-3">Bass samples</h2>
        <p class="lead text-muted measure mb-5">
          These are takes from my studio on upright and electric, with both DI and amp tones.
          Toggle the drums on or off to hear how a part sits in a mix.
        </p>
        <bass-audio-samples></bass-audio-samples>
      </div>
    </section>

    <!-- ================= STUDIO & STAGE ================= -->
    <section class="section">
      <div class="container">
        <p class="eyebrow mb-2">What I offer</p>
        <h2 class="mb-5">Two ways to work together</h2>

        <div class="row g-5">
          <div class="col-12 col-lg-6">
            <article class="offer">
              <h3 class="mb-3">Recording sessions</h3>
              <p class="offer-copy">
                Send a rough mix and any notes on feel or tone. I record it here and send back
                stems that drop straight into your session, with nothing left to edit or engineer.
              </p>
              <p class="offer-detail">
                You get {{ TAKES_PER_TRACK }} takes to choose from on upright, fretted, fretless, or
                slap, revisions are included, and the recordings are yours once the project is paid for.
              </p>
              <nuxt-link class="text-link" to="/book-session">
                How it works <span aria-hidden="true">→</span>
              </nuxt-link>
            </article>
          </div>

          <div class="col-12 col-lg-6">
            <article class="offer">
              <h3 class="mb-3">Live performance</h3>
              <p class="offer-copy">
                Upright and electric bass for clubs, weddings, private events, festivals, and
                touring dates, in Chicago or on the road.
              </p>
              <p class="offer-detail">
                I read charts or learn by ear, play across jazz, blues, rock, pop, soul, and folk,
                and can coordinate other musicians if you need a full band.
              </p>
              <nuxt-link class="text-link" to="/book-live-gig">
                Check availability <span aria-hidden="true">→</span>
              </nuxt-link>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PROCESS ================= -->
    <section class="section-tight process-section">
      <div class="container">
        <p class="eyebrow mb-2">The process</p>
        <h2 class="mb-5">How a session works</h2>
        <div class="row g-5">
          <div class="col-12 col-md-4" v-for="(step, i) in steps" :key="step.title">
            <div class="step">
              <span class="step-number" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="h4 mb-2">{{ step.title }}</h3>
              <p class="text-muted mb-0">{{ step.copy }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= QUOTES ================= -->
    <section class="section">
      <div class="container">
        <p class="eyebrow mb-2">Reviews</p>
        <h2 class="mb-5">What clients say</h2>
        <div class="row g-5">
          <div class="col-12 col-md-4" v-for="review in featuredReviews" :key="review.name">
            <figure class="quote mb-0">
              <blockquote class="quote-text">{{ review.review }}</blockquote>
              <figcaption class="quote-author">
                {{ review.name }} <span class="quote-country">· {{ review.country }}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="section-tight reviews-section">
      <div class="container">
        <h2 class="mb-2">More reviews</h2>
        <p class="lead text-muted measure mb-4">A selection of reviews from clients.</p>
      </div>
      <review-list></review-list>
    </section>

    <!-- ================= DISCOGRAPHY ================= -->
    <discography-list></discography-list>

    <!-- ================= ABOUT ================= -->
    <section class="section">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-12 col-lg-5">
            <img
              src="/img/BuddyGuys.webp"
              alt="Chris Pecoraro playing upright bass with the Sean McKee Band at Buddy Guy's Legends in Chicago"
              class="img-fluid rounded shadow about-photo"
              width="1133"
              height="581"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="col-12 col-lg-7 text-lg-start">
            <p class="eyebrow mb-2">A bit about me</p>
            <h2 class="mb-3">Chicago bassist, upright and electric</h2>
            <p class="lead text-muted">
              I play with rock and jazz bands, orchestras, musicals, and vocal ensembles, and I
              record remotely for artists around the world. I'm always glad to hear about a new
              project, in the studio or on stage.
            </p>
            <ul class="credit-list">
              <li>Member of the Sean McKee Band, winners of the 2024 Chicago Blues Challenge</li>
              <li>Shared stages with Buddy Guy, Doc Severinsen, and members of Prince's band</li>
              <li>Played Buddy Guy's Legends, the Grand Ole Opry, Lincoln Hall, and Rum Boogie Café</li>
            </ul>
            <nuxt-link class="text-link mt-3 d-inline-block" to="/about">
              More about me <span aria-hidden="true">→</span>
            </nuxt-link>
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

    <!-- ================= CLOSING ================= -->
    <CtaBand
      title="Got a project in mind?"
      lead="Send it over and I'll come back with a plan and a quote."
      show-email
    >
      <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
    </CtaBand>
  </div>
</template>

<script setup>
import { featuredReviews } from '~/data/reviews';
import { TAKES_PER_TRACK, TURNAROUND } from '~/data/service';

const steps = [
  {
    title: 'Send your track',
    copy: 'Send a rough mix or demo, along with any references or notes on the feel you want. If you are not sure, that is completely fine, and I can suggest what works best.',
  },
  {
    title: 'I record your bass',
    copy: `I cut ${TAKES_PER_TRACK} takes with different approaches so you can pick the one that serves the song, then request tweaks until it fits.`,
  },
  {
    title: 'You get mix-ready stems',
    copy: `Final files land in your inbox, usually within ${TURNAROUND}. You pay once you are happy, and the recordings are yours to use however you like.`,
  },
];

useSeo({
  title: 'Chris Pecoraro | Remote Session Bass Player, Chicago',
  description: 'Remote session bass player based in Chicago. Upright and electric bass recorded in my studio and delivered mix-ready, with multiple takes and revisions included.',
});

usePersonStructuredData();

useHead({
  link: [
    // The hero image is the LCP element; preloading it shaves a round trip.
    { rel: 'preload', as: 'image', href: '/img/ChrisPecMusic.webp', fetchpriority: 'high' },
  ],
});
</script>

<style scoped>
.listen-section,
.reviews-section {
  background-color: var(--blue-deep);
}

/* ---------------- Hero ---------------- */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh; /* avoids the mobile browser-chrome jump; vh is the fallback */
  display: flex;
  align-items: center;
  background-image: url('/img/ChrisPecMusic.webp');
  background-position: center 20%;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Separate scrim element so the gradient can be tuned per breakpoint without
   restating the background image. Darker on the left keeps the headline
   readable while leaving the photo visible on the right. */
.hero-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      100deg,
      rgba(12, 18, 23, 0.92) 0%,
      rgba(12, 18, 23, 0.72) 38%,
      rgba(12, 18, 23, 0.2) 68%,
      rgba(12, 18, 23, 0.02) 100%
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
  margin-bottom: 1.5rem;
  text-wrap: balance;
}

.hero-sub {
  color: var(--text-muted-on-dark);
  max-width: 32rem;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
}

.hero-scroll {
  position: absolute;
  left: 50%;
  bottom: 1.75rem;
  transform: translateX(-50%);
  z-index: 1;
  color: rgba(var(--text-color-rgb), 0.6);
  font-size: 1.1rem;
  animation: heroBob 2.6s ease-in-out infinite;
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
      rgba(12, 18, 23, 0.7) 0%,
      rgba(12, 18, 23, 0.58) 45%,
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
}


/* ---------------- Offers ---------------- */
/* Hairline rule rather than a bordered card: the boxed treatment read like a
   pricing table, which is not the impression a musician's site wants to give. */
.offer {
  text-align: left;
  border-top: 1px solid rgba(var(--text-color-rgb), 0.28);
  padding-top: 2rem;
}

.offer-copy {
  color: var(--text-muted-on-dark);
  margin-bottom: 1.25rem;
}

.offer-detail {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(var(--text-color-rgb), 0.62);
  margin-bottom: 1.75rem;
}

/* ---------------- Process ---------------- */
.process-section {
  background-color: var(--blue-deep);
}

.step {
  text-align: left;
}

.step-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.03em;
  color: rgba(var(--text-color-rgb), 0.3);
  margin-bottom: 1rem;
}

/* ---------------- Quotes ---------------- */
.quote {
  text-align: left;
  border-top: 1px solid rgba(var(--text-color-rgb), 0.28);
  padding-top: 2rem;
}

.quote-text {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.quote-text::before {
  content: '\201C';
}

.quote-text::after {
  content: '\201D';
}

.quote-author {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(var(--text-color-rgb), 0.62);
}

.quote-country {
  font-weight: 400;
}

/* ---------------- About ---------------- */
.about-photo {
  width: 100%;
  object-fit: cover;
}

.credit-list {
  list-style: none;
  padding: 0;
  margin: 1.75rem 0 0;
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
  height: 1px;
  background-color: rgba(var(--text-color-rgb), 0.5);
}

/* ---------------- Closing ---------------- */
</style>
