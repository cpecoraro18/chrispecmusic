<template>
  <div class="mt-5 p-3 rounded bg-light text-dark">
    <h2 class="mb-3 text-center" style="font-size:1.4rem;">Bass Audio Samples</h2>
    <div class="d-flex flex-column flex-md-row gap-3">
      <!-- Focused Sample -->
      <div class="flex-grow-1">
        <div class="card sample-card bg-white text-dark border-0 shadow-sm h-100">
          <div class="card-body d-flex flex-column justify-content-between p-3">
            <div class="d-flex align-items-center mb-2">
              <span class="sample-title flex-grow-1" style="font-size:1.2rem;">{{ focusedSample.title }}</span>
              <div class="toggle-group ms-2">
                <button
                  class="toggle-btn"
                  :class="{active: selectedType[focusedSample.baseFile] === 'with'}"
                  @click="setType(focusedSample.baseFile, 'with')"
                  title="With Drums"
                >
                  <i class="fa fa-drum"></i>
                </button>
                <button
                  class="toggle-btn"
                  :class="{active: selectedType[focusedSample.baseFile] === 'without'}"
                  @click="setType(focusedSample.baseFile, 'without')"
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
            <div class="mt-2 small text-muted text-truncate" :title="getAudioFile(focusedSample)">
              <i class="fa fa-file-audio me-1"></i>{{ getAudioFile(focusedSample) }}
              <span class="ms-2 badge bg-info" v-if="selectedType[focusedSample.baseFile] === 'with'">With Drums</span>
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
            :key="sample.baseFile"
            class="list-group-item list-group-item-action bg-white text-dark d-flex align-items-center gap-2 py-2 px-2 border-0"
            :class="{active: sample.baseFile === focusedSample.baseFile}"
            @click="focusSample(sample.baseFile)"
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

const samples = [
  {
    title: 'Fender Precision Bass DI Tone',
    baseFile: 'pbass-di',
    withDrums: '/audio/pbass-di-drums.wav',
    withoutDrums: '/audio/pbass-di.wav',
  },
{
    title: 'Fender Precision Bass Vintage Amp Tone',
    baseFile: 'pbass-b15',
    withDrums: '/audio/pbass-b15-drums.wav',
    withoutDrums: '/audio/pbass-b15.wav',
  },
  {
    title: 'Fender Jazz Bass Amp Tone',
    baseFile: 'jbass-svt',
    withDrums: '/audio/jbass-svt-drums.wav',
    withoutDrums: '/audio/jbass-svt.wav',
  },
  {
    title: 'Lakland DI Tone',
    baseFile: 'lakland-di',
    withDrums: '/audio/lakland-di-drums.wav',
    withoutDrums: '/audio/lakland-di.wav',
  },
    {
    title: 'Lakland Slap Tone',
    baseFile: 'lakland-slap',
    withDrums: '/audio/lakland-slap-drums.wav',
    withoutDrums: '/audio/lakland-slap.wav',
  },
  {
    title: 'Upright Bass',
    baseFile: 'upright',
    withDrums: '/audio/upright-drums.wav',
    withoutDrums: '/audio/upright.wav',
  },
];

const selectedType = reactive({});
samples.forEach(s => selectedType[s.baseFile] = 'with');

const focusedBaseFile = ref(samples[0].baseFile);

const focusedSample = computed(() => samples.find(s => s.baseFile === focusedBaseFile.value));
const sideSamples = computed(() => samples.filter(s => s.baseFile !== focusedBaseFile.value));

function setType(baseFile, type) {
  selectedType[baseFile] = type;
}

function getAudioSrc(sample) {
  return selectedType[sample.baseFile] === 'with' ? sample.withDrums : sample.withoutDrums;
}

function getAudioFile(sample) {
  return selectedType[sample.baseFile] === 'with'
    ? sample.withDrums.split('/').pop()
    : sample.withoutDrums.split('/').pop();
}

function focusSample(baseFile) {
  focusedBaseFile.value = baseFile;
}
</script>

<style scoped>
.sample-card {
  min-height: 180px;
  font-size: 1rem;
  background: #fff !important;
  color: #222 !important;
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
  border-radius: 6px;
  margin-bottom: 4px;
  transition: background 0.15s, color 0.15s;
  background: #fff !important;
  color: #222 !important;
}
.list-group-item:hover {
  background: #e9ecef !important;
  color: #17a2b8 !important;
  cursor: pointer;
}
.list-group-item.active, .list-group-item:active {
  background: #17a2b8 !important;
  color: #fff !important;
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
  background: #f0f0f0;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.toggle-btn {
  border: none;
  background: none;
  color: #888;
  font-size: 1rem;
  padding: 3px 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.toggle-btn.active {
  background: #17a2b8;
  color: #fff;
  transform: scale(1.08) rotate(-4deg);
  box-shadow: 0 1px 4px #17a2b8aa;
}
.toggle-btn:not(.active):hover {
  color: #17a2b8;
  background: #e9ecef;
}
.badge.bg-info {
  background-color: #17a2b8 !important;
}
.badge.bg-secondary {
  background-color: #6c757d !important;
    color: #fff !important;
}
.sample-title {
  font-weight: 600;
  font-size: 1.1rem;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-audio {
  height: 32px;
}
.bg-light {
  background: #f8f9fa !important;
}
.text-dark {
  color: #222 !important;
}
</style>
