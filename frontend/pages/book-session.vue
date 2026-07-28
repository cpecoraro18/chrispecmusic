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
              intro="A few details are enough to get started — I'll reply with a plan and a quote."
              message-label="About your project"
              message-placeholder="How many tracks, what style, upright or electric, and when you need it by. A link to a rough mix is welcome."
              message-hint="Not sure yet? A rough description is fine — we can work the details out together."
              submit-label="Send Project Details"
              reassurance="No obligation, and you don't pay until you're happy with the takes."
            ></contact-form>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SAMPLES ================= -->
    <section class="section-tight bg-light text-dark">
      <div class="container">
        <h2 class="text-dark mb-3">Hear the tones</h2>
        <p class="lead text-dark measure mb-4">
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
            <div class="included-card h-100">
              <i :class="item.icon" class="included-icon" aria-hidden="true"></i>
              <h3 class="h4 mb-2">{{ item.title }}</h3>
              <p class="mb-0 text-muted">{{ item.copy }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PRICING ================= -->
    <section class="section-tight">
      <div class="container">
        <h2 class="mb-3">Pricing</h2>
        <p class="lead measure mb-5">
          One rate covers recording, engineering, and revisions — there's no studio time, gear
          rental, or engineer fee on top. Per-track pricing drops as the project gets bigger.
        </p>

        <div class="row g-4 justify-content-center">
          <div class="col-12 col-md-4" v-for="tier in pricing" :key="tier.tracks">
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
        <div class="faq-list">
          <div v-for="(faq, i) in faqs" :key="i" class="faq-item">
            <h3 class="mb-0">
              <button
                class="faq-question"
                :aria-expanded="openedFaq === i"
                :aria-controls="`faq-answer-${i}`"
                :id="`faq-question-${i}`"
                @click="toggleFaq(i)"
              >
                <span>{{ faq.q }}</span>
                <span class="faq-indicator" aria-hidden="true">{{ openedFaq === i ? '−' : '+' }}</span>
              </button>
            </h3>
            <div
              v-show="openedFaq === i"
              :id="`faq-answer-${i}`"
              role="region"
              :aria-labelledby="`faq-question-${i}`"
              class="faq-answer"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= REVIEWS ================= -->
    <div class="bg-light pb-5">
      <div class="text-center pt-5">
        <h2 class="text-dark mb-2">What clients say</h2>
        <p class="lead text-dark measure mb-0">
          A selection of reviews from clients.
        </p>
      </div>
      <review-list></review-list>
    </div>

    <!-- ================= FINAL CTA ================= -->
    <section class="final-cta">
      <div class="container">
        <h2 class="mb-3">Ready when you are</h2>
        <p class="lead measure mb-4">
          Send over what you have and I'll come back with a plan and a quote. No obligation.
        </p>
        <a class="btn btn-cta" href="#start">Start a Project</a>
        <p class="mt-4 mb-0">
          <i class="fa fa-envelope me-2" aria-hidden="true"></i>
          <a href="mailto:contact@chrispecmusic.com" class="fw-bold">contact@chrispecmusic.com</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Kept in sync with the same constants on the homepage.
const TURNAROUND = '2–3 days';
const TAKES_PER_TRACK = '2–3';

const steps = [
  {
    title: 'Send your track',
    copy: 'A rough mix or demo, plus the tempo and any notes on style, tone, or feel. References or a rough guide bass line help, but are not required.',
  },
  {
    title: 'We agree on the details',
    copy: "I'll come back with a plan and a quote. If you're not sure what you want the bass to do, I'll suggest a few directions.",
  },
  {
    title: 'I record your bass',
    copy: `I cut ${TAKES_PER_TRACK} takes with different approaches so you have options, recorded and edited in my studio.`,
  },
  {
    title: 'You request changes',
    copy: 'Revisions are included. I adjust the part, tone, or feel until it fits the song.',
  },
  {
    title: 'You get the files',
    copy: 'Mix-ready stems land in your inbox with a payment link. Once the project is paid, the recordings are yours to use however you like.',
  },
];

const included = [
  {
    icon: 'fas fa-music',
    title: 'Experience',
    copy: '100+ remote sessions for songwriters, producers, and bands worldwide.',
  },
  {
    icon: 'fas fa-sliders',
    title: 'Mix-ready files',
    copy: 'Recorded and edited in my studio, so the stems drop straight into your session.',
  },
  {
    icon: 'fas fa-rotate',
    title: 'Revisions included',
    copy: 'Changes to the part, tone, or feel are part of the price, not an extra.',
  },
  {
    icon: 'fas fa-lock',
    title: 'You own the tracks',
    copy: 'Once the project is paid for, the recordings are yours with no further licensing.',
  },
];

const pricing = [
  { tracks: '1 track', price: 100, featured: false },
  { tracks: '3–4 tracks', price: 90, featured: false },
  { tracks: '5+ tracks', price: 80, featured: true },
];

const faqs = [
  {
    q: 'Who is this for?',
    a: 'Songwriters, producers, bands, and artists who want professional bass on a record without booking studio time.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A rough mix or demo of your track (WAV, MP3, or similar), the tempo if you know it, and any notes on style, tone, or feel.',
  },
  {
    q: "What if I don't know what bass line I want?",
    a: "That's normal — a lot of projects start with only a rough idea. I'll write parts that support the song and give you options to choose from.",
  },
  {
    q: "What if the first take isn't right?",
    a: "Revisions are included. I'll adjust the part, tone, or feel until it fits your track.",
  },
  {
    q: 'What styles do you play?',
    a: 'Jazz, soul, folk, rock, pop, blues, and singer-songwriter projects, on both upright and electric bass.',
  },
  {
    q: 'Can you do a full EP or album?',
    a: 'Yes. I regularly work on EPs and albums, and can keep tone and feel consistent across every track.',
  },
  {
    q: 'Do I own the bass recordings?',
    a: 'Yes. Once the project is complete and paid for, you own the recorded bass parts and can use them however you like.',
  },
  {
    q: 'Can we talk before starting?',
    a: 'Of course. We can schedule a call to go through your project, goals, and any questions before recording begins.',
  },
  {
    q: 'How does payment work?',
    a: "I'll quote based on the size and requirements of your project. Once you approve, you'll get a payment link and can pay securely online. Payment is only requested after you're happy with the final recordings.",
  },
];

const openedFaq = ref(null);
function toggleFaq(i) {
  openedFaq.value = openedFaq.value === i ? null : i;
}

useHead({
  title: 'Book a Remote Bass Session | Chris Pecoraro',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Hire a remote session bass player. Upright and electric bass recorded in my Chicago studio and delivered mix-ready, with multiple takes and revisions included. From $80 per track.',
    },
  ],
});
</script>

<style scoped>
/* ---------------- Process ---------------- */
.process-list {
  list-style: none;
  counter-reset: step;
  padding: 0;
  margin: 0;
  text-align: left;
}

.process-list li {
  counter-increment: step;
  position: relative;
  padding-left: 3.25rem;
  padding-bottom: 1.75rem;
}

.process-list li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(var(--text-color-rgb), 0.12);
  border: 1px solid rgba(var(--text-color-rgb), 0.28);
  font-weight: 700;
  font-size: 0.95rem;
}

/* Connecting line between the step markers. */
.process-list li::after {
  content: '';
  position: absolute;
  left: 1.125rem;
  top: 2.5rem;
  bottom: 0.35rem;
  width: 1px;
  background-color: rgba(var(--text-color-rgb), 0.2);
}

.process-list li:last-child {
  padding-bottom: 0;
}

.process-list li:last-child::after {
  display: none;
}

/* ---------------- What you get ---------------- */
.what-you-get {
  background-color: var(--blue-deep);
}

.included-card {
  text-align: left;
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
}

.included-icon {
  font-size: 1.35rem;
  color: var(--blue);
  margin-bottom: 0.9rem;
  display: block;
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

.faq-list {
  max-width: 46rem;
  margin: 0 auto;
  text-align: left;
}

.faq-item {
  border-bottom: 1px solid rgba(var(--text-color-rgb), 0.18);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 0;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.05rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease;
}

.faq-question:hover {
  color: var(--blue);
}

.faq-indicator {
  flex-shrink: 0;
  font-size: 1.4rem;
  line-height: 1;
  color: var(--blue);
}

.faq-answer {
  padding: 0 0 1.25rem;
  color: var(--text-muted-on-dark);
  line-height: 1.65;
}

/* ---------------- Final CTA ---------------- */
.final-cta {
  background-color: var(--blue-deep);
  padding-block: var(--section-y);
  border-top: 1px solid rgba(var(--text-color-rgb), 0.12);
}
</style>
