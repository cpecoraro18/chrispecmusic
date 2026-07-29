<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Book a Remote Bass Session</h1>
        <p class="lead measure mb-4">
          Send me your track and I'll record upright or electric bass in my studio, then send back
          mix-ready files. {{ TAKES_PER_TRACK }} takes to choose from, revisions included,
          typically back within {{ TURNAROUND }}.
        </p>
        <a class="btn btn-cta" href="#start">Start a Project</a>
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
          </div>
          <div class="col-12 col-lg-6">
            <contact-form
              heading="Tell me about your project"
              intro="A few details are enough to get started, and I'll reply with a plan and a quote."
              message-label="About your project"
              message-placeholder="How many tracks, what style, upright or electric, and when you need it by. A link to a rough mix is welcome."
              message-hint="Not sure yet? A rough description is completely fine, and we can work the details out together."
              submit-label="Send Project Details"
              reassurance="No obligation, and you don't pay until you're happy with the takes."
            ></contact-form>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SAMPLES ================= -->
    <section class="section-tight listen-section">
      <div class="container">
        <h2 class="mb-3">Hear the tones</h2>
        <p class="lead text-muted measure mb-4">
          Real takes from my studio across five basses, with both DI and amp tones. Toggle drums
          on or off to hear how the part sits in a mix.
        </p>
        <bass-audio-samples></bass-audio-samples>
      </div>
    </section>

    <!-- ================= WHAT YOU GET ================= -->
    <section class="section-tight what-you-get">
      <div class="container">
        <h2 class="mb-5">What you get</h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div class="col" v-for="item in included" :key="item.title">
            <IconFeature :icon="item.icon" :title="item.title" :copy="item.copy" />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PRICING ================= -->
    <section class="section-tight">
      <div class="container">
        <h2 class="mb-3">Pricing</h2>
        <p class="lead measure mb-5">
          One rate covers recording, engineering, and revisions. There's no studio time, gear
          rental, or engineer fee on top. Per-track pricing drops as the project gets bigger.
        </p>

        <div class="row g-4 justify-content-center">
          <div class="col-12 col-md-4" v-for="tier in PRICING" :key="tier.tracks">
            <div class="price-card h-100" :class="{ 'price-card--featured': tier.featured }">
              <span v-if="tier.featured" class="price-flag">Best value</span>
              <h3 class="h4 mb-1">{{ tier.tracks }}</h3>
              <p class="price-amount mb-3">
                <span class="price-number">${{ tier.price }}</span>
                <span class="price-unit">per track</span>
              </p>
              <ul class="price-points">
                <li>{{ TAKES_PER_TRACK }} takes included</li>
                <li>Revisions included</li>
                <li>Mix-ready files</li>
              </ul>
            </div>
          </div>
        </div>

        <p class="pricing-note measure mt-4 mb-4">
          You don't pay until you've heard the takes and you're happy with them.
        </p>
        <a class="btn btn-cta" href="#start">Start a Project</a>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="section-tight faq-section">
      <div class="container">
        <h2 class="mb-5">Common questions</h2>
        <FaqAccordion :items="sessionFaqs" id-prefix="session-faq" />
      </div>
    </section>

    <!-- ================= REVIEWS ================= -->
    <section class="section-tight reviews-section">
      <div class="container">
        <h2 class="mb-2">What clients say</h2>
        <p class="lead text-muted measure mb-4">
          A selection of reviews from clients.
        </p>
      </div>
      <review-list></review-list>
    </section>

    <!-- ================= FINAL CTA ================= -->
    <CtaBand
      title="Ready when you are"
      lead="Send over what you have and I'll come back with a plan and a quote. No obligation."
      show-email
    >
      <a class="btn btn-cta" href="#start">Start a Project</a>
    </CtaBand>
  </div>
</template>

<script setup>
import { PRICING, TAKES_PER_TRACK, TURNAROUND } from '~/data/service';
import { sessionFaqs, sessionSteps as steps } from '~/data/faqs';

const included = [
  {
    icon: 'music',
    title: 'Experience',
    copy: '100+ remote sessions for songwriters, producers, and bands worldwide.',
  },
  {
    icon: 'sliders',
    title: 'Mix-ready files',
    copy: 'Recorded and edited in my studio, so the stems drop straight into your session.',
  },
  {
    icon: 'rotate',
    title: 'Revisions included',
    copy: 'Changes to the part, tone, or feel are part of the price, not an extra.',
  },
  {
    icon: 'lock',
    title: 'You own the tracks',
    copy: 'Once the project is paid for, the recordings are yours with no further licensing.',
  },
];

useSeo({
  title: 'Book a Remote Bass Session | Chris Pecoraro',
  description: 'Hire a remote session bass player. Upright and electric bass recorded in my Chicago studio and delivered mix-ready, with multiple takes and revisions included. From $80 per track.',
});
</script>

<style scoped>
.listen-section,
.reviews-section {
  background-color: var(--blue-deep);
}


/* ---------------- What you get ---------------- */
.what-you-get {
  background-color: var(--blue-deep);
}



/* ---------------- Pricing ---------------- */
.price-card {
  position: relative;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.16);
}

.price-card--featured {
  background-color: rgba(var(--text-color-rgb), 0.11);
  border-color: rgba(var(--text-color-rgb), 0.34);
  box-shadow: var(--shadow-lg);
}

.price-flag {
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--text-color);
  color: var(--blue-deep);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  white-space: nowrap;
}

.price-amount {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.price-number {
  font-size: clamp(2rem, 1.6rem + 1.4vw, 2.6rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
}

.price-unit {
  font-size: 0.85rem;
  color: var(--text-muted-on-dark);
}

.price-points {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.price-points li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-muted-on-dark);
}

.price-points li::before {
  content: '\2713';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--blue);
  font-weight: 700;
}

.pricing-note {
  color: var(--text-muted-on-dark);
}

/* ---------------- FAQ ---------------- */
.faq-section {
  background-color: var(--blue-deep);
}


/* ---------------- Final CTA ---------------- */
</style>
