<template>
  <div class="mt-5 bg-dark text-white p-4 rounded">
    <h2 class="mb-4 text-center">Events</h2>
    
    <!-- Event Filter Buttons -->
    <div class="mb-3">
      <button 
        class="btn btn-outline-light btn-sm me-2"
        :class="{ active: selectedFilter === 'future' }"
        @click="filterEvents('future')"
      >
        Upcoming
      </button>
      
      <!-- Past Events Dropdown -->
      <div class="btn-group me-2" role="group">
        <button 
          class="btn btn-outline-light btn-sm dropdown-toggle"
          :class="{ active: selectedFilter.startsWith('past') }"
          type="button" 
          data-bs-toggle="dropdown"
        >
          Past Events
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" @click.prevent="filterEvents('past-2025')">2025</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="filterEvents('past-2024')">2024</a></li>
        </ul>
      </div>
    </div>
    
    <!-- Loading Icon -->
    <div v-if="loading" class="text-center py-4">
      <i class="fa fa-spinner fa-spin fa-2x"></i> <!-- Add a spinner icon -->
    </div>
    
    <!-- Events List -->
    <div v-if="!loading && events.length" class="list-group">
      <div v-for="(event, index) in limitedEvents" :key="event.id" class="list-group-item mb-3 bg-dark border-0">
        <div class="row border-bottom border-1 pb-3">
          <div class="col-12 col-md-2 mb-4 mb-md-0">
            <h4 class="mb-1">{{ event.date}}</h4>
            <p class="text-muted">{{ event.month }} {{ event.year }}</p>
            <p class="text-muted mb-0"> {{ event.timeRange }}</p>
          </div>
          <div class="col-12 col-md-10 text-md-end">
            <h4 class="mb-2">{{ event.summary }}</h4>
            <div class="mb-2 text-info small">
              <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(event.location)" target="_blank"><i class="fa fa-map-marker me-2"></i>{{ event.location.split(",")[0] }}</a>
            </div>
            <p v-if="event.description" class="mb-0">{{ event.description }}</p>
          </div>
        </div>
      </div>
      <div v-if="events.length > limit" class="text-center mt-3">
        <a href="/events" class="text-info">See all</a>
      </div>
    </div>

    <!-- No Events Message -->
    <p v-else-if="!loading" class="text-muted text-center">No upcoming events.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  limit: {
    type: Number,
    default: Infinity
  }
});

const events = ref([]);
const loading = ref(true); 
const selectedFilter = ref('future');

async function getEvents(timeMin = null, timeMax = null) {
  let url = 'https://api.chrispecmusic.com/events';
  const params = new URLSearchParams();
  
  if (timeMin) {
    params.append('timeMin', timeMin);
  }
  if (timeMax) {
    params.append('timeMax', timeMax);
  }
  
  if (params.toString()) {
    url += '?' + params.toString();
  }
  
  const response = await $fetch(url);
  events.value = JSON.parse(response).items.map((x) => {
    const start = x.start?.dateTime ? new Date(x.start.dateTime) : null;
    const end = x.end?.dateTime ? new Date(x.end.dateTime) : null;
    return {
      id: x.id,
      summary: x.summary,
      location: x.location || 'TBD',
      description: x.description || "",
      date: start ? start.getDate() : 'N/A',
      month: start ? start.toLocaleString('default', { month: 'long' }) : 'N/A',
      year: start ? start.getFullYear() : 'N/A',
      timeRange: start && end
        ? `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : 'Time not available',
    };
  })
  loading.value = false;
}

const limitedEvents = computed(() => {
  return events.value.slice(0, props.limit);
});

function getPastEvents(year = null) {
  if (year) {
    const startOfYear = `${year}-01-01`;
    const endOfYear = `${year}-12-31`;
    return getEvents(startOfYear, endOfYear);
  } else {
    const today = new Date().toISOString().split('T')[0];
    return getEvents(null, today);
  }
}

function getFutureEvents() {
  return getEvents();
}

async function filterEvents(filter) {
  selectedFilter.value = filter;
  loading.value = true;
  
  if (filter.startsWith('past-')) {
    const year = filter.split('-')[1];
    await getPastEvents(year);
  } else {
    switch (filter) {
      case 'past':
        await getPastEvents();
        break;
      case 'future':
      default:
        await getFutureEvents();
        break;
    }
  }
}

onMounted(() => {
  getEvents();
});
</script>

<style scoped>
.container {
  max-width: 800px;
}

.list-group-item h5 {
  color: #f8f9fa;
}

.list-group-item small {
  color: #ccc;
}

.list-group-item p {
  color: #bbb;
}

/* Add some margin for the spinner */
.text-center i {
  margin-top: 50px;
}
</style>