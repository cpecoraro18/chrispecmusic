<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <SectionHeader
          level="h1"
          title="Gear"
          lead="The basses, amps, pedals, and microphones I use on sessions and live dates."
        />

        <FilterPills
          v-model="selectedType"
          :options="typeOptions"
          label="Filter gear by type"
          select-id="gear-type"
          class="mb-5"
        />

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div v-for="item in filteredGear" :key="item.name" class="col">
            <MediaCard
              variant="light"
              title-level="h2"
              :title="item.name"
              :badge="item.type"
              :copy="item.description"
            >
              <template #media>
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="gear-image"
                  loading="lazy"
                  decoding="async"
                />
              </template>
            </MediaCard>
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

const {
  selected: selectedType,
  options: typeOptions,
  filtered: filteredGear,
} = useFilter(gear, 'type');

useSeo({
  title: 'Gear | Chris Pecoraro, Chicago Bassist',
  description: 'The basses, amps, cabinets, pedals, and microphones Chris Pecoraro uses for remote recording sessions and live performances.',
});
</script>

<style scoped>
.gear-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: var(--secondary); /* blends the letterboxing around contain-fit images */
}
</style>
