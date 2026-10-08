<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <SectionHeader
          level="h1"
          title="Gear"
          lead="The basses, amps, pedals, and microphones I use on sessions and live dates."
        />

        <!-- Jumps to each section, in place of filter buttons: with the gear
             grouped on the page, there is nothing left to filter. -->
        <nav class="gear-jump" aria-label="Gear sections">
          <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">
            {{ section.label }}<span class="gear-jump-count">{{ section.items.length }}</span>
          </a>
        </nav>
      </div>
    </section>

    <!-- The basses lead, shown large: they are what a client is choosing
         between. Everything after is grouped by kind in compact cards. -->
    <section
      v-for="(section, index) in sections"
      :id="section.id"
      :key="section.id"
      class="section-tight gear-section"
      :class="{ 'band-deep': index % 2 === 0 }"
    >
      <div class="container">
        <h2 class="gear-section-title">{{ section.label }}</h2>

        <div v-if="section.feature" class="row g-4">
          <div v-for="item in section.items" :key="item.name" class="col-12 col-md-6">
            <article class="bass-card on-light">
              <img :src="item.image" :alt="item.name" class="bass-image" loading="lazy" decoding="async" />
              <div class="bass-body">
                <h3 class="bass-name">{{ item.name }}</h3>
                <p class="bass-copy">{{ item.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <div v-else class="row g-3">
          <div v-for="item in section.items" :key="item.name" class="col-12 col-md-6">
            <article class="gear-item on-light">
              <img :src="item.image" :alt="item.name" class="gear-item-image" loading="lazy" decoding="async" />
              <div>
                <!-- The kind, only where a section mixes kinds. -->
                <p v-if="section.types.length > 1" class="gear-item-kind">{{ item.type }}</p>
                <h3 class="gear-item-name">{{ item.name }}</h3>
                <p class="gear-item-copy">{{ item.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      title="Want these tones on your track?"
      lead="This is the gear I record with. Send me your song and I'll put it to work."
    >
      <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
    </CtaBand>
  </div>
</template>

<script setup>
import { gear } from '~/data/gear';

/**
 * The page's sections, in order, and which gear types land in each. A type
 * not listed here doesn't appear on the page, so a new one needs adding.
 */
const GEAR_SECTIONS = [
  { id: 'basses', label: 'Basses', types: ['Bass'], feature: true },
  { id: 'amps', label: 'Amps & cabinets', types: ['Amp', 'Cabinet'] },
  { id: 'dis', label: 'DIs', types: ['DI'] },
  { id: 'pedals', label: 'Pedals', types: ['Pedal'] },
  { id: 'mics', label: 'Microphones', types: ['Microphone'] },
  { id: 'board', label: 'Board & power', types: ['Pedalboard', 'Power Supply'] },
];

const sections = GEAR_SECTIONS.map((section) => ({
  ...section,
  items: gear.filter((item) => section.types.includes(item.type)),
})).filter((section) => section.items.length);

useSeo({
  title: 'Gear | Chris Pecoraro, Chicago Bassist',
  description: 'The basses, amps, cabinets, DIs, pedals, and microphones Chris Pecoraro uses for remote recording sessions and live performances.',
});
</script>

<style scoped>
/* ---- Jump row ---- */
.gear-jump {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 0.4rem;
}

.gear-jump a {
  padding: 0.2rem 1rem;
  color: var(--fg);
  font-weight: 600;
  text-decoration: none;
}

.gear-jump a + a {
  border-left: 1px solid rgba(var(--fg-rgb), 0.25);
}

.gear-jump a:hover,
.gear-jump a:focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.3em;
}

.gear-jump-count {
  margin-left: 0.35rem;
  font-weight: 500;
  opacity: 0.55;
}

/* ---- Sections ---- */
.gear-section {
  text-align: left;
  scroll-margin-top: 5rem; /* clears the fixed header when jumped to */
}

.gear-section-title {
  margin-bottom: 1.75rem;
}

/* The product photos carry this grey in their own backgrounds, so the image
   boxes match it to hide the letterboxing around contain-fit images. */
.bass-image,
.gear-item-image {
  object-fit: contain;
  background-color: var(--secondary);
}

/* ---- Basses: large ---- */
.bass-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background-color: var(--card);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.bass-image {
  width: 100%;
  height: clamp(12rem, 22vw, 16rem);
}

.bass-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem 1.6rem 1.6rem;
}

#app .bass-name {
  margin-bottom: 0.6rem;
  font-size: clamp(1.35rem, 1.1rem + 0.8vw, 1.7rem);
}

.bass-copy {
  flex: 1;
  margin-bottom: 0;
  color: var(--text-color-dark);
}

/* ---- Everything else: compact ---- */
.gear-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
  overflow: hidden;
  padding-right: 1.1rem;
  border-radius: var(--radius-md);
  background-color: var(--card);
}

.gear-item-image {
  flex: 0 0 auto;
  width: 7.5rem;
  height: 6.5rem;
}

.gear-item-kind {
  margin: 0 0 0.15rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

#app .gear-item-name {
  margin: 0 0 0.2rem;
  font-size: 1.05rem;
  font-weight: 600;
}

.gear-item-copy {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-color-dark);
}

@media (max-width: 575.98px) {
  .gear-item-image {
    width: 6rem;
    height: 5.5rem;
  }
}
</style>
