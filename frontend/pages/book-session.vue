<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="section-tight">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-12 col-lg-6 text-lg-start">
            <h1 class="mb-3">Book a Remote Bass Session</h1>
            <p class="lead measure mb-4">
              Send me your track and I'll record upright or electric bass in my studio and send back
              mix-ready files: {{ TAKES_PER_TRACK }} takes to choose from, revisions included, usually
              within {{ TURNAROUND }}.
            </p>
            <a class="btn btn-cta" href="#start">Start a Project</a>
          </div>
          <!-- The room the lead talks about, so "my studio" is something a
               producer can see. After the text in the markup, so on phones
               the pitch and the button come first. -->
          <div class="col-12 col-lg-6">
            <img
              src="/img/studio.webp"
              alt="Chris with a P bass in his recording studio, with an upright bass, monitors, and acoustic panels"
              class="studio-photo"
              width="1600"
              height="1066"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= HEAR THE TONES ================= -->
    <!-- The sound gallery's only home: this is where a producer decides, and
         the clip list scrolls inside its own box, so it doesn't push pricing
         far down. Until data/sounds.ts has clips, the audio samples stand in.
         Shared gallery links, and the link from the home page, land on this id. -->
    <section id="sounds" class="section-tight listen-section band-deep">
      <div class="container">
        <h2 class="mb-3">Hear the tones</h2>
        <template v-if="soundClips.length">
          <p class="lead text-muted measure mb-4">
            Short clips, one sound each. Search, or filter by genre, bass, or technique.
          </p>
          <SoundGallery />
        </template>
        <template v-else>
          <p class="lead text-muted measure mb-4">
            Real takes from my studio on four basses, DI and amp. Toggle the drums to hear how
            each part sits in a mix.
          </p>
          <bass-audio-samples></bass-audio-samples>
        </template>
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
    <section class="section-tight band-charcoal">
      <div class="container">
        <h2 class="mb-3">Pricing</h2>
        <p class="lead measure mb-5">
          One per-song rate covers recording, engineering, and {{ REVISION_ROUNDS }} rounds of
          revisions, with no studio, gear, or engineer fees on top. The more songs, the lower the
          rate.
        </p>

        <div class="row g-4 justify-content-center">
          <div class="col-12 col-md-4" v-for="tier in PRICING" :key="tier.tracks">
            <div class="price-card h-100" :class="{ 'price-card--featured': tier.featured }">
              <span v-if="tier.featured" class="price-flag">Best value</span>
              <h3 class="h4 mb-1">{{ tier.tracks }}</h3>
              <p class="price-amount mb-3">
                <span class="price-number">${{ tier.price }}</span>
                <span class="price-unit">per song</span>
              </p>
              <ul class="price-points">
                <li>{{ takesSentence }} takes included</li>
                <li>{{ revisionsSentence }} rounds of revisions</li>
                <li>Mix-ready files</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- The specifics a producer asks before booking, answered next to the
             prices rather than left to the FAQ or an email. -->
        <div class="deliverables">
          <dl class="deliverables-list">
            <div v-for="item in deliverables" :key="item.term">
              <dt>{{ item.term }}</dt>
              <dd>{{ item.detail }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- ================= REVIEWS ================= -->
    <section class="section-tight reviews-section band-deep">
      <div class="container">
        <h2 class="mb-2">What clients say</h2>
        <p class="lead text-muted measure mb-4">
          A few words from past clients.
        </p>
      </div>
      <review-list></review-list>
    </section>

    <!-- ================= PROCESS + FORM ================= -->
    <!-- After the playing, the prices, and the reviews, so a producer has
         heard and seen enough before being asked for anything. Every Start a
         Project button jumps here. -->
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
              intro="A few details are enough. I'll reply with a plan and a quote."
              message-label="About your project"
              message-placeholder="How many songs, what style, upright or electric, and your deadline. A link to a rough mix helps."
              message-hint="Not sure yet? A rough idea is fine. We'll work out the rest together."
              submit-label="Send Project Details"
              reassurance="No obligation. You don't pay until you're happy with the takes."
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
        <FaqAccordion :items="sessionFaqs" id-prefix="session-faq" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { PRICING, STARTING_PRICE, TAKES_PER_TRACK, TURNAROUND, REVISION_ROUNDS, MAX_SAMPLE_RATE } from '~/data/service';
import { sessionFaqs, sessionSteps as steps } from '~/data/faqs';

// The service constants are lowercase for use mid-sentence; these open one.
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const takesSentence = capitalize(TAKES_PER_TRACK);
const revisionsSentence = capitalize(REVISION_ROUNDS);

const deliverables = [
  { term: 'Files', detail: `WAV at your session's sample rate, up to ${MAX_SAMPLE_RATE}` },
  { term: 'Tracks', detail: 'DI and amp or mic on separate tracks, to blend as you like' },
  { term: 'Revisions', detail: `${revisionsSentence} rounds per song included; extra rounds quoted up front` },
  { term: 'Parts', detail: 'Written from scratch, or played from your chart' },
  { term: 'Rush', detail: 'Available for an extra fee' },
];

const included = [
  {
    icon: 'music',
    title: 'Experience',
    copy: '100+ remote sessions for songwriters, producers, and bands worldwide.',
  },
  {
    icon: 'sliders',
    title: 'Mix-ready files',
    copy: 'Recorded and edited in my studio, ready to drop into your session.',
  },
  {
    icon: 'rotate',
    title: 'Revisions included',
    copy: `${revisionsSentence} rounds of changes to the part, tone, or feel, at no extra cost.`,
  },
  {
    icon: 'lock',
    title: 'You own the tracks',
    copy: 'Once paid for, the recordings are yours. No further licensing.',
  },
];

useSeo({
  title: 'Book a Remote Bass Session | Chris Pecoraro',
  description: `Hire a remote session bass player. Upright and electric bass recorded in my Chicago studio and delivered mix-ready, with multiple takes and revisions included. From $${STARTING_PRICE} per song.`,
});
</script>

<style scoped>
/* ---------------- Hero ---------------- */
/* Framed like the reel on the home page. */
.studio-photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

/* ---------------- Pricing ---------------- */
.price-card {
  position: relative;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background-color: rgba(var(--fg-rgb), 0.06);
  border: 1px solid rgba(var(--fg-rgb), 0.16);
}

.price-card--featured {
  background-color: rgba(var(--fg-rgb), 0.11);
  border-color: rgba(var(--fg-rgb), 0.34);
  box-shadow: var(--shadow-lg);
}

.price-flag {
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--fg);
  color: var(--on-fg);
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
  color: var(--fg-soft);
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
  color: var(--fg-soft);
}

.price-points li::before {
  content: '\2713';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  font-weight: 700;
}

/* ---------------- The details ---------------- */
/* A two-column spec list under the price cards: term on the left, answer on
   the right, a hairline between rows. Stacks on phones. */
.deliverables {
  max-width: 46rem;
  margin: 2.75rem auto 0;
  text-align: left;
}

.deliverables-list {
  margin: 0;
}

.deliverables-list > div {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1rem;
  padding: 0.7rem 0;
  border-top: 1px solid rgba(var(--fg-rgb), 0.14);
}

.deliverables-list dt {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  padding-top: 0.15rem;
}

.deliverables-list dd {
  margin: 0;
  color: var(--fg-soft);
}

@media (max-width: 575.98px) {
  .deliverables-list > div {
    grid-template-columns: 1fr;
    gap: 0.15rem;
  }
}
</style>
