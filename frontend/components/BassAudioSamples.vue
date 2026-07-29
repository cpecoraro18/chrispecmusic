<template>
  <div class="samples-panel mt-5 p-3 p-md-4 rounded">
    <h2 class="mb-3 text-center samples-heading">Bass Audio Samples</h2>
    <div class="d-flex flex-column flex-md-row gap-3">
      <!-- Focused Sample -->
      <div class="flex-grow-1">
        <div class="card sample-card border-0 h-100">
          <div class="card-body d-flex flex-column justify-content-between p-3">
            <div class="d-flex align-items-center mb-2">
              <span class="sample-title flex-grow-1">{{ focusedSample.title }}</span>
              <div class="toggle-group ms-2">
                <button
                  class="toggle-btn"
                  :class="{active: selectedType[focusedSample.id] === 'with'}"
                  @click="setType(focusedSample.id, 'with')"
                  title="With Drums"
                >
                  <i class="fa fa-drum"></i>
                </button>
                <button
                  class="toggle-btn"
                  :class="{active: selectedType[focusedSample.id] === 'without'}"
                  @click="setType(focusedSample.id, 'without')"
                  title="No Drums"
                >
                  <i class="fa fa-headphones"></i>
                </button>
              </div>
            </div>
            <audio
              :src="getAudioSrc(focusedSample)"
              controls
              class="w-100 mt-2 compact-audio"
            ></audio>
            <div class="mt-2 small sample-file text-truncate" :title="getAudioFile(focusedSample)">
              <i class="fa fa-file-audio me-1"></i>{{ getAudioFile(focusedSample) }}
              <span class="ms-2 badge bg-info" v-if="selectedType[focusedSample.id] === 'with'">With Drums</span>
              <span class="ms-2 badge bg-secondary text-dark" v-else>No Drums</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Side List -->
      <div class="side-list ms-md-2 mt-3 mt-md-0">
        <div class="list-group">
          <button
            v-for="sample in sideSamples"
            :key="sample.id"
            class="list-group-item list-group-item-action d-flex align-items-center gap-2 py-2 px-2 border-0"
            :class="{active: sample.id === focusedSample.id}"
            @click="focusSample(sample.id)"
          >
            <i class="fa fa-play-circle text-info"></i>
            <span class="side-title text-truncate" :title="sample.title">{{ sample.title }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { samples } from '~/data/samples';

// Which mix each sample is set to. Tracked per sample so switching between
// them remembers what you were listening to.
const selectedType = reactive({});
samples.forEach((s) => (selectedType[s.id] = 'with'));

const focusedId = ref(samples[0].id);

const focusedSample = computed(() => samples.find((s) => s.id === focusedId.value));
const sideSamples = computed(() => samples.filter((s) => s.id !== focusedId.value));

function setType(id, type) {
  selectedType[id] = type;
}

function getAudioSrc(sample) {
  return selectedType[sample.id] === 'with' ? sample.withDrums : sample.withoutDrums;
}

function getAudioFile(sample) {
  return getAudioSrc(sample).split('/').pop();
}

function focusSample(id) {
  focusedId.value = id;
}
</script>

<style scoped>
/* Dark surfaces matching the rest of the page. This block was previously a
   #F0F0F0 panel of white cards, which glared against the dark palette. */
.samples-panel {
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
  color: var(--text-color);
}

.sample-card {
  min-height: 180px;
  font-size: 1rem;
  background-color: rgba(var(--text-color-rgb), 0.07) !important;
  border: 1px solid rgba(var(--text-color-rgb), 0.12) !important;
  color: var(--text-color) !important;
  border-radius: var(--radius-md);
}

.sample-title {
  font-weight: 600;
  font-size: 1.1rem;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sample-file {
  color: var(--text-muted-on-dark);
}

.side-list {
  min-width: 180px;
  max-width: 220px;
  width: 100%;
}

@media (max-width: 900px) {
  .side-list { min-width: 120px; max-width: 100%; }
}

.list-group-item {
  font-size: 0.98rem;
  border-radius: var(--radius-sm);
  margin-bottom: 4px;
  transition: background 0.15s, color 0.15s;
  background-color: rgba(var(--text-color-rgb), 0.07) !important;
  color: var(--text-color) !important;
}

.list-group-item:hover {
  background-color: rgba(var(--text-color-rgb), 0.14) !important;
  color: var(--white) !important;
  cursor: pointer;
}

.list-group-item.active,
.list-group-item:active {
  background-color: var(--text-color) !important;
  color: var(--blue-deep) !important;
}

.list-group-item .fa-play-circle {
  color: var(--blue) !important;
}

.list-group-item.active .fa-play-circle {
  color: var(--blue-deep) !important;
}

.side-title {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toggle-group {
  display: flex;
  border-radius: 16px;
  background-color: rgba(var(--text-color-rgb), 0.1);
  overflow: hidden;
}

.toggle-btn {
  border: none;
  background: none;
  color: var(--text-muted-on-dark);
  font-size: 1rem;
  padding: 3px 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.toggle-btn.active {
  background-color: var(--text-color);
  color: var(--blue-deep);
}

.toggle-btn:not(.active):hover {
  color: var(--white);
  background-color: rgba(var(--text-color-rgb), 0.12);
}

.badge.bg-info {
  background-color: var(--blue-dark) !important;
  color: var(--text-color) !important;
}

.badge.bg-secondary {
  background-color: rgba(var(--text-color-rgb), 0.18) !important;
  color: var(--text-color) !important;
}

.compact-audio {
  height: 32px;
  /* Native controls render as a light widget; this stops them being the one
     bright rectangle left in the panel. */
  filter: invert(0.9) hue-rotate(180deg);
}
</style>
