<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Book a Live Bass Player</h1>
        <p class="lead measure mb-4">
          Upright and electric bass for clubs, weddings, private events, festivals, and touring
          dates, in Chicago or on the road. I'm happy to read charts or learn the material by ear, and I'll arrive prepared.
        </p>
        <a class="btn btn-cta" href="#start">Check Availability</a>
      </div>
    </section>

    <!-- ================= PROCESS + FORM ================= -->
    <section id="start" class="section-tight">
      <div class="container">
        <div class="row g-5 align-items-start">
          <div class="col-12 col-lg-6">
            <h2 class="mb-4 text-lg-start">How it works</h2>
            <ol class="process-list">
              <li v-for="step in steps" :key="step.title">
                <h3 class="h4 mb-1">{{ step.title }}</h3>
                <p class="mb-0 text-muted">{{ step.copy }}</p>
              </li>
            </ol>
            <p class="mt-4 mb-0 text-muted text-lg-start">
              You can also
              <nuxt-link to="/events">see where I'm playing next</nuxt-link> or
              <nuxt-link to="/portfolio">watch live footage</nuxt-link>.
            </p>
          </div>
          <div class="col-12 col-lg-6">
            <contact-form
              heading="Tell me about the gig"
              intro="Send over the date and a few details, and I'll come back to you on availability and a rate."
              message-label="About the gig"
              message-placeholder="Date, venue or city, set length, and the kind of music. Let me know if you need upright, electric, or both."
              message-hint="Filling in for someone last minute? Just say so, I can often help."
              submit-label="Check Availability"
              reassurance="Every booking is quoted individually. No obligation."
            ></contact-form>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= WHERE I PLAY ================= -->
    <section class="section-tight where-i-play">
      <div class="container">
        <h2 class="mb-5">Where I play</h2>
        <div class="row g-4 justify-content-center">
          <div class="col-12 col-md-4" v-for="venue in venues" :key="venue.title">
            <IconFeature :icon="venue.icon" :title="venue.title" :copy="venue.copy" />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= WHAT I BRING ================= -->
    <section class="section-tight">
      <div class="container">
        <div class="row g-5 align-items-center">
          <div class="col-12 col-lg-6">
            <img
              src="/img/SeanMcKeeBand.webp"
              alt="Chris Pecoraro performing live on bass with the Sean McKee Band"
              class="img-fluid rounded shadow w-100"
              width="1600"
              height="910"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="col-12 col-lg-6 text-lg-start">
            <h2 class="mb-3">What I bring</h2>
            <ul class="bring-list">
              <li v-for="item in brings" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="section-tight faq-section">
      <div class="container">
        <h2 class="mb-5">Common questions</h2>
        <FaqAccordion :items="liveFaqs" id-prefix="live-faq" />
      </div>
    </section>

    <!-- ================= FINAL CTA ================= -->
    <CtaBand
      title="Got a date in mind?"
      lead="Send it over and I'll let you know if I'm free and what it would cost."
      show-email
    >
      <a class="btn btn-cta" href="#start">Check Availability</a>
    </CtaBand>
  </div>
</template>

<script setup>
import { liveFaqs, liveSteps as steps } from '~/data/faqs';

const venues = [
  {
    icon: 'martini-glass',
    title: 'Clubs & venues',
    copy: 'Bars, music clubs, and listening rooms across Chicago and the Midwest.',
  },
  {
    icon: 'champagne-glasses',
    title: 'Weddings & private events',
    copy: 'Ceremonies, receptions, parties, and corporate events.',
  },
  {
    icon: 'users',
    title: 'Festivals & touring',
    copy: 'Regional festivals, touring acts, and multi-date runs.',
  },
];

const brings = [
  'Upright and electric bass, whichever the material calls for',
  'Charts, lead sheets, or learned by ear, whichever you have',
  'Jazz, blues, rock, pop, soul, funk, and folk',
  'Pro-level basses and amps suitable for any size room',
  'Help with setlists and arrangements if you want it',
  'Other pro musicians I can coordinate if you need a full band',
];

useSeo({
  title: 'Book a Live Bass Player in Chicago | Chris Pecoraro',
  description: 'Hire an upright and electric bass player for live shows in Chicago and beyond, including clubs, weddings, private events, festivals, and touring dates. Reads charts or plays by ear.',
});
</script>

<style scoped>

/* ---------------- Where I play ---------------- */
.where-i-play {
  background-color: var(--blue-deep);
}



/* ---------------- What I bring ---------------- */
.bring-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.bring-list li {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.75rem;
  color: var(--text-muted-on-dark);
}

.bring-list li::before {
  content: '\2713';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--blue);
  font-weight: 700;
}

/* ---------------- FAQ ---------------- */
.faq-section {
  background-color: var(--blue-deep);
}


/* ---------------- Final CTA ---------------- */
</style>
