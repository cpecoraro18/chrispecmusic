<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Gear</h1>
        <p class="lead measure mb-5">
          The basses, amps, pedals, and microphones I use on sessions and live dates.
        </p>

        <!-- Filter: pills on desktop, a select on small screens -->
        <div class="d-none d-lg-block mb-5">
          <div class="filter-row" role="group" aria-label="Filter gear by type">
            <button
              v-for="type in gearTypes"
              :key="type.value"
              class="btn filter-pill"
              :class="selectedType === type.value ? 'filter-pill--active' : ''"
              :aria-pressed="selectedType === type.value"
              @click="selectedType = type.value"
            >
              {{ type.label }} <span class="filter-count">{{ countFor(type.value) }}</span>
            </button>
          </div>
        </div>

        <div class="d-lg-none mb-4 mx-auto gear-select-wrap">
          <label for="gear-type" class="form-label visually-hidden">Filter gear by type</label>
          <select id="gear-type" v-model="selectedType" class="form-select">
            <option v-for="type in gearTypes" :key="type.value" :value="type.value">
              {{ type.label }} ({{ countFor(type.value) }})
            </option>
          </select>
        </div>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div v-for="item in filteredGearItems" :key="item.name" class="col">
            <div class="gear-card h-100">
              <img
                :src="item.image"
                :alt="item.name"
                class="gear-image"
                loading="lazy"
                decoding="async"
              />
              <div class="gear-body">
                <h2 class="h4 mb-2">{{ item.name }}</h2>
                <span class="gear-badge mb-3">{{ item.type }}</span>
                <p class="gear-desc mb-0">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 class="mb-3">Want these tones on your track?</h2>
        <p class="lead measure mb-4">
          This is the gear I record with. Send me your song and I'll put it to work.
        </p>
        <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script setup>
const selectedType = ref('');

const gearItems = ref([
  { name: 'Lakland 5501', type: 'Bass', image: '/img/gear/Lakland5501.png', description: 'Upgraded with Bartolini pickups and a Lakland LH3 preamp. A bright, punchy 5-string that plays smooth and fits any mix.' },
  { name: 'Fender P Bass', type: 'Bass', image: '/img/gear/Fender-P-Bass.png', description: 'Classic Precision Bass tone with the reliability to match.' },
  { name: 'Fender Jazz Bass', type: 'Bass', image: '/img/gear/Fender-J-Bass.png', description: 'My first bass — used for everything from jazz gigs to rock covers.' },
  { name: 'Knilling Bucharest 1308T', type: 'Bass', image: '/img/gear/Knilling-Upright.png', description: 'Go-to upright for jazz sessions and acoustic sets.' },
  { name: 'Markbass Little Mark 3', type: 'Amp', image: '/img/gear/Markbass-Little-Mark-3.png', description: 'Lightweight, powerful head with a clean, punchy sound.' },
  { name: 'Phil Jones Double 4', type: 'Amp', image: '/img/gear/Phil-Jones-Double-Four.png', description: 'Small practice amp with a clear, surprisingly big sound.' },
  { name: 'Markbass 4x10', type: 'Cabinet', image: '/img/gear/Markbass-4x10.png', description: 'Big, punchy lows and clean mids for live shows.' },
  { name: 'Markbass New York 121', type: 'Cabinet', image: '/img/gear/Markbass-NewYork-121.png', description: 'Compact cab that still brings warmth and punch. I own two for flexible live setups.' },
  { name: 'Radial Tonebone', type: 'Pedal', image: '/img/gear/Radial-Bassbone-V2.png', description: 'DI and preamp for fast switching between upright and electric bass.' },
  { name: 'Origin Effects BassRig Super Vintage', type: 'Pedal', image: '/img/gear/Origin-Effects-BassRig-Super-Vintage.png', description: 'SVT-style tones with tube-like feel and grit.' },
  { name: 'JHS Colour Box', type: 'Pedal', image: '/img/gear/JHS-ColorBox.webp', description: 'Flexible preamp that goes from clean to driven tones easily.' },
  { name: 'Cali76 Bass Compressor', type: 'Pedal', image: '/img/gear/Cali76-Bass-Compressor.png', description: 'Smooth, studio-style compression with a touch of vintage vibe.' },
  { name: 'MXR Bass Compressor', type: 'Pedal', image: '/img/gear/MXR-Bass-Compressor.png', description: 'Clean, transparent compression that keeps your attack intact.' },
  { name: 'HX Stomp', type: 'Pedal', image: '/img/gear/HX-Stomp.png', description: 'Compact multi-effects processor with extensive routing options.' },
  { name: 'MXR Octave Deluxe', type: 'Pedal', image: '/img/gear/MXR-Bass-Octave-Delux.png', description: 'Fat sub-octave sounds that thicken your tone.' },
  { name: 'Electro-Harmonix Pico POG', type: 'Pedal', image: '/img/gear/PicoPog.png', description: 'Polyphonic octave pedal — great for solos and layering.' },
  { name: 'Aguilar Twin Filter', type: 'Pedal', image: '/img/gear/Aguilar-Filter-Twin.png', description: 'Dual filter pedal for funky sweeps and vintage textures.' },
  { name: 'Damnation Audio MBD', type: 'Pedal', image: '/img/gear/MBD.png', description: 'Bass distortion with depth, plus a blend knob to keep the low end intact.' },
  { name: 'Korg Pitchblack Advanced', type: 'Pedal', image: '/img/gear/Kork-Pitchblack-Advanced.png', description: 'Reliable tuner with true bypass and clear visibility.' },
  { name: 'Pedaltrain Metro 20', type: 'Pedalboard', image: '/img/gear/Pedaltrain-Metro-20.png', description: 'Compact pedalboard that keeps the essentials tight and tidy.' },
  { name: 'Cioks DC7', type: 'Power Supply', image: '/img/gear/Cioks-DC7.png', description: 'Quiet, low-profile power supply that handles a full board with ease.' },
  { name: 'Shure SM57', type: 'Microphone', image: '/img/gear/Shure-SM57.png', description: 'Classic dynamic mic — works anywhere, sounds great.' },
  { name: 'Electro-Voice RE20', type: 'Microphone', image: '/img/gear/EV-RE20.png', description: 'Versatile dynamic mic, well suited to bass amps and vocals.' },
  { name: 'Audio-Technica AT2038', type: 'Microphone', image: '/img/gear/Audio-Technica-AT2038.png', description: 'Solid condenser mic for upright bass, vocals, and more.' },
  { name: 'Soyuz 013 FET', type: 'Microphone', image: '/img/gear/Soyuz-013-FET.png', description: 'High-quality FET microphone with a warm, vintage sound.' },
  { name: 'Audio-Technica AT4041', type: 'Microphone', image: '/img/gear/Audio-Technica-AT4041.png', description: 'Small-diaphragm condenser with a bright, detailed sound. Great on upright bass.' },
]);

// Derived from the gear list so the desktop pills and the mobile select can
// never disagree, and a new gear type shows up in both automatically.
const gearTypes = computed(() => [
  { value: '', label: 'All' },
  ...[...new Set(gearItems.value.map((item) => item.type))]
    .sort()
    .map((type) => ({ value: type, label: type })),
]);

function countFor(type) {
  return type ? gearItems.value.filter((item) => item.type === type).length : gearItems.value.length;
}

const filteredGearItems = computed(() =>
  selectedType.value
    ? gearItems.value.filter((item) => item.type === selectedType.value)
    : gearItems.value
);

useSeo({
  title: 'Gear | Chris Pecoraro, Chicago Bassist',
  description: 'The basses, amps, cabinets, pedals, and microphones Chris Pecoraro uses for remote recording sessions and live performances.',
});
</script>

<style scoped>

.gear-select-wrap {
  max-width: 20rem;
}

.gear-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--bg-light-blue);
  color: var(--text-color-dark);
  box-shadow: var(--shadow-sm);
}

.gear-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: var(--secondary); /* blends the letterboxing around contain-fit images */
}

.gear-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 1.25rem;
  flex-grow: 1;
}

.gear-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--blue-deep);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
}

.gear-desc {
  color: var(--text-color-dark);
  flex-grow: 1;
}

</style>
