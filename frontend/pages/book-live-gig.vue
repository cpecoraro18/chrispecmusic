<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Book a Live Bass Player</h1>
        <p class="lead measure mb-4">
          Upright and electric bass for clubs, weddings, private events, festivals, and touring
          dates — in Chicago or on the road. I read charts, learn by ear, and turn up prepared.
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
              intro="Send the date and a few details and I'll come back on availability and a rate."
              message-label="About the gig"
              message-placeholder="Date, venue or city, set length, and the kind of music. Let me know if you need upright, electric, or both."
              message-hint="Filling in for someone last minute? Say so — I can often help."
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
            <div class="venue-card h-100">
              <i :class="venue.icon" class="venue-icon" aria-hidden="true"></i>
              <h3 class="h4 mb-2">{{ venue.title }}</h3>
              <p class="mb-0 text-muted">{{ venue.copy }}</p>
            </div>
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
              src="/img/SeanMcKeeBand.jpg"
              alt="Chris Pecoraro performing live on bass with the Sean McKee Band"
              class="img-fluid rounded shadow w-100"
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

    <!-- ================= FINAL CTA ================= -->
    <section class="final-cta">
      <div class="container">
        <h2 class="mb-3">Got a date in mind?</h2>
        <p class="lead measure mb-4">
          Send it over and I'll let you know if I'm free and what it would cost.
        </p>
        <a class="btn btn-cta" href="#start">Check Availability</a>
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

const steps = [
  {
    title: 'Send the details',
    copy: 'Date, location, set length, and the kind of music. Let me know whether you want upright, electric, or both.',
  },
  {
    title: 'I confirm and quote',
    copy: "I'll check the date and come back with availability and a rate for the booking.",
  },
  {
    title: 'Share the material',
    copy: 'Setlist, charts, lead sheets, or recordings — whatever you have. We can add rehearsals if the material calls for it.',
  },
  {
    title: 'I show up ready',
    copy: 'Parts learned, gear loaded, and on time.',
  },
];

const venues = [
  {
    icon: 'fas fa-martini-glass',
    title: 'Clubs & venues',
    copy: 'Bars, music clubs, and listening rooms across Chicago and the Midwest.',
  },
  {
    icon: 'fas fa-champagne-glasses',
    title: 'Weddings & private events',
    copy: 'Ceremonies, receptions, parties, and corporate events.',
  },
  {
    icon: 'fas fa-users',
    title: 'Festivals & touring',
    copy: 'Regional festivals, touring acts, and multi-date runs.',
  },
];

const brings = [
  'Upright and electric bass, whichever the material calls for',
  'Charts, lead sheets, or learned by ear — both are fine',
  'Jazz, blues, rock, pop, soul, funk, and folk',
  'Pro-level basses and amps suitable for any size room',
  'Help with setlists and arrangements if you want it',
  'Other pro musicians I can coordinate if you need a full band',
];

const faqs = [
  {
    q: 'Do you travel for gigs?',
    a: "Yes — I'm available for out-of-town shows, festivals, and touring dates.",
  },
  {
    q: 'Can you fill in last minute?',
    a: 'Often, yes. Get in touch as early as you can and I\'ll let you know.',
  },
  {
    q: 'Can you read charts or play by ear?',
    a: 'Both. Send charts, lead sheets, or recordings — whatever you have.',
  },
  {
    q: 'Do you play upright and electric?',
    a: 'Yes. Let me know which the material calls for, or I can bring both.',
  },
  {
    q: 'Can you provide a full band?',
    a: 'I can recommend and coordinate other pro musicians if you need a full group.',
  },
  {
    q: 'What gear do you bring?',
    a: 'Pro-level basses and amps suitable for the room. Let me know if you have specific backline needs or restrictions.',
  },
  {
    q: 'How do rehearsals work?',
    a: "We'll schedule them as the material needs, in person or remotely. I come prepared so the time gets used well.",
  },
  {
    q: 'Can you help with setlists or arrangements?',
    a: "Yes — I'm happy to help with song selection, arrangements, and musical direction.",
  },
  {
    q: 'How far in advance should I book?',
    a: 'Earlier is better, especially for weekends, but last-minute requests are worth asking about.',
  },
  {
    q: 'How does payment work?',
    a: 'Every booking is quoted individually. Payment is due after the gig by cash, check, or secure online payment.',
  },
];

const openedFaq = ref(null);
function toggleFaq(i) {
  openedFaq.value = openedFaq.value === i ? null : i;
}

useHead({
  title: 'Book a Live Bass Player in Chicago | Chris Pecoraro',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Hire an upright and electric bass player for live shows in Chicago and beyond — clubs, weddings, private events, festivals, and touring dates. Reads charts or plays by ear.',
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

/* ---------------- Where I play ---------------- */
.where-i-play {
  background-color: var(--blue-deep);
}

.venue-card {
  text-align: left;
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
}

.venue-icon {
  font-size: 1.35rem;
  color: var(--blue);
  margin-bottom: 0.9rem;
  display: block;
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
