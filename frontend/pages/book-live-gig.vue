<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Book a Live Bass Player</h1>
        <p class="lead measure mb-4">
          Upright and electric bass for clubs, weddings, private events, festivals, and tours, in
          Chicago or on the road. I read charts or learn by ear, and I show up prepared.
        </p>
        <a class="btn btn-cta" href="#start">Check Availability</a>
      </div>
    </section>

    <!-- ================= WHERE I PLAY ================= -->
    <section class="section-tight where-i-play band-deep">
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

    <!-- ================= PROCESS + FORM ================= -->
    <!-- After where I play and what I bring, so someone booking has seen
         enough before being asked for anything. Every Check Availability
         button jumps here. -->
    <section id="start" class="section-tight band-deep">
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
              <nuxt-link to="/portfolio#videos">watch me play</nuxt-link>.
            </p>
          </div>
          <div class="col-12 col-lg-6">
            <contact-form
              heading="Tell me about the gig"
              intro="Send the date and a few details. I'll get back to you with availability and a rate."
              message-label="About the gig"
              message-placeholder="Date, venue or city, set length, and style of music. Upright, electric, or both?"
              message-hint="Need a last-minute fill-in? Say so. I can often help."
              submit-label="Check Availability"
              reassurance="Every gig is quoted individually. No obligation, and I usually reply within a day."
            ></contact-form>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <!-- Below the form: for whoever still has a question, not in the way of
         whoever is ready. -->
    <section class="section-tight faq-section band-charcoal">
      <div class="container">
        <h2 class="mb-5">Common questions</h2>
        <FaqAccordion :items="liveFaqs" id-prefix="live-faq" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { liveFaqs, liveSteps as steps } from '~/data/faqs';
import { GENRE_LIST_SENTENCE } from '~/data/service';

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
  'Upright or electric, whichever the material calls for',
  'Charts, lead sheets, or learned by ear',
  GENRE_LIST_SENTENCE,
  'Pro basses and amps for any size room',
  'Help with setlists and arrangements, if you want it',
  'Other pro musicians, if you need a full band',
];

useSeo({
  title: 'Book a Live Bass Player in Chicago | Chris Pecoraro',
  description: 'Hire an upright and electric bass player for live shows in Chicago and beyond, including clubs, weddings, private events, festivals, and touring dates. Reads charts or plays by ear.',
});
</script>

<style scoped>
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
  color: var(--fg-soft);
}

.bring-list li::before {
  content: '\2713';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  font-weight: 700;
}

</style>
