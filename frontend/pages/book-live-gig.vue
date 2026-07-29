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
            <div class="venue-item rule-top h-100">
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
              width="2058"
              height="1170"
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
    <section class="cta-band">
      <div class="container">
        <h2 class="mb-3">Got a date in mind?</h2>
        <p class="lead measure mb-4">
          Send it over and I'll let you know if I'm free and what it would cost.
        </p>
        <a class="btn btn-cta" href="#start">Check Availability</a>
        <p class="mt-4 mb-0">
          <a href="mailto:contact@chrispecmusic.com" class="cta-email">contact@chrispecmusic.com</a>
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
    copy: 'Send whatever you have: setlist, charts, lead sheets, or recordings. We can add rehearsals if the material calls for it.',
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
  'Charts, lead sheets, or learned by ear, whichever you have',
  'Jazz, blues, rock, pop, soul, funk, and folk',
  'Pro-level basses and amps suitable for any size room',
  'Help with setlists and arrangements if you want it',
  'Other pro musicians I can coordinate if you need a full band',
];

const faqs = [
  {
    q: 'What styles do you play live?',
    a: 'Jazz, rock, pop, soul, funk, folk, blues, and more. I adapt quickly to different genres and band settings.'
  },
  {
    q: 'Do you travel for gigs?',
    a: 'Yes! I’m available for out-of-town shows, tours, and festivals.'
  },
  {
    q: 'Can you fill in last minute?',
    a: 'Often, yes. Contact me ASAP for availability.'
  },
  {
    q: 'Can you read charts or play by ear?',
    a: 'Yes, I’m comfortable with both. Send charts, lead sheets, or recordings, whatever you have.'
  },
  {
    q: 'Can you provide a full band?',
    a: 'I can recommend and coordinate with other pro musicians if you need a full group.'
  },
  {
    q: 'What gear do you bring?',
    a: 'I bring pro-level basses and amps suitable for any venue. Let me know if you have specific backline needs.'
  },
  {
    q: 'How do rehearsals work?',
    a: 'We’ll schedule rehearsals as needed, either in person or virtually. I’ll come prepared so we use time efficiently.'
  },
  {
    q: 'How is payment handled?',
    a: 'Payment is due after the gig, via cash, check, or secure online payment.'
  },
  {
    q: 'Do you play upright and electric bass?',
    a: 'Yes, I play both upright and electric bass. Let me know your preference for your event.'
  },
  {
    q: 'Can you help with song selection or arrangements?',
    a: 'Absolutely! I’m happy to help with setlist planning, arrangements, and musical direction if needed.'
  },
  {
    q: 'Do you play private/corporate events?',
    a: 'Yes, I regularly play weddings, private parties, and corporate events.'
  },
  {
    q: 'How far in advance should I book?',
    a: 'The sooner the better, but I can sometimes accommodate last-minute requests.'
  }
];

const openedFaq = ref(null);
function toggleFaq(i) {
  openedFaq.value = openedFaq.value === i ? null : i;
}

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


.venue-item .venue-icon {
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


/* ---------------- Final CTA ---------------- */
</style>
