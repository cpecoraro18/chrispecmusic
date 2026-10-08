<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="hero on-dark">
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
            <a class="text-link" href="#about">See more <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
      <a class="hero-scroll" href="#about" aria-label="Scroll to more about Chris">
        <AppIcon name="chevron-down" />
      </a>
    </section>

    <!-- ================= ABOUT ================= -->
    <section id="about" class="section band">
      <div class="container">
        <div class="row align-items-center g-5">
          <!-- The reel, beside the intro so a first-time visitor can hear me
               play without leaving the page. First in the markup, so it sits
               above the text on phones. Which video is set in data/videos.ts. -->
          <div class="col-12 col-lg-6">
            <div class="about-reel">
              <YouTubeEmbed :id="showreel.id" :title="showreel.title" />
            </div>
          </div>
          <div class="col-12 col-lg-6 text-lg-start">
            <p class="eyebrow mb-2">A bit about me</p>
            <h2 class="mb-3">Chicago bassist, upright and electric</h2>
            <p class="lead text-muted">
              I'm Chris Pecoraro, a professional electric and upright bassist based in Chicago, with 100+
              remote sessions completed for artists and producers around the world. My studio and live
              work spans {{ GENRE_LIST }}.
            </p>
            <nuxt-link class="text-link mt-3 d-inline-block" to="/about">
              More about me <span aria-hidden="true">→</span>
            </nuxt-link>
          </div>
        </div>

      </div>
    </section>

    <!-- ================= DISCOGRAPHY ================= -->
    <section class="section-tight band band-deep">
      <div class="container">
        <SectionHeader
          eyebrow="Discography"
          title="Records I've played on"
          lead="Click a cover to listen."
        />
        <discography-list></discography-list>
      </div>
    </section>

    <!-- ================= REVIEWS ================= -->
    <section class="section-tight band">
      <div class="container">
        <p class="eyebrow mb-2">Reviews</p>
        <h2 class="mb-2">What clients say</h2>
        <p class="lead text-muted measure mb-4">A selection of reviews from clients.</p>
      </div>
      <review-list></review-list>
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
import { showreel } from '~/data/videos';
import { GENRE_LIST } from '~/data/service';

useSeo({
  title: 'Chris Pecoraro | Remote Session Bass Player, Chicago',
  description: 'Chris Pecoraro is a remote session bass player based in Chicago. Upright and electric bass recorded in my studio and delivered mix-ready, with multiple takes and revisions included.',
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
/* Every section sits on the Daphne canvas. Contrast comes from the panels and
   cards inside them rather than from alternating full-width bands. */
.band {
  scroll-margin-top: 5rem; /* clears the fixed header when linked to */
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
  color: var(--fg-soft);
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
  color: rgba(var(--fg-rgb), 0.6);
  font-size: 1.1rem;
  animation: heroBob 2.6s ease-in-out infinite;
}

.hero-scroll:hover {
  color: var(--fg-strong);
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


/* ---------------- About ---------------- */
.about-reel {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
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
  color: var(--fg-soft);
}

.credit-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 0.6rem;
  height: 1px;
  background-color: rgba(var(--fg-rgb), 0.5);
}

/* ---------------- Closing ---------------- */
</style>
