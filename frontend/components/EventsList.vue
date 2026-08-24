<template>
  <div class="mt-5 bg-dark text-white p-4 rounded events-list">
    <h2 v-if="showHeading" class="mb-4 text-center">{{ heading }}</h2>
    
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
          <li v-for="year in pastYears" :key="year">
            <a class="dropdown-item" href="#" @click.prevent="filterEvents(`past-${year}`)">{{ year }}</a>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Loading Icon -->
    <div v-if="loading" class="text-center py-4">
      <AppIcon name="spinner" spin :scale="2" label="Loading events" class="events-spinner" />
    </div>

    <!-- Failed to load. Kept distinct from the empty state below: reporting a
         dead API as "no upcoming events" tells visitors he has no gigs. -->
    <div v-else-if="error" class="text-center py-4" role="alert">
      <p class="text-muted mb-3">The event list couldn't be loaded just now.</p>
      <button class="btn btn-outline-light btn-sm" @click="retry">Try again</button>
    </div>

    <!-- Events List -->
    <div v-else-if="events.length" class="list-group">
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
              <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(event.location)" target="_blank"><AppIcon name="location-dot" class="me-2" />{{ event.location.split(",")[0] }}</a>
            </div>
            <p v-if="event.description" class="mb-0">{{ event.description }}</p>
          </div>
        </div>
      </div>
      <div v-if="events.length > limit" class="text-center mt-3">
        <nuxt-link to="/events" class="text-info">See all events</nuxt-link>
      </div>
    </div>

    <!-- No Events Message -->
    <p v-else class="text-muted text-center">{{ emptyMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  limit: {
    type: Number,
    default: Infinity
  },
  heading: {
    type: String,
    default: 'Events'
  },
  // The /events page supplies its own <h1>, so it turns this off rather than
  // rendering the word "Events" twice.
  showHeading: {
    type: Boolean,
    default: true
  }
});

const events = ref([]);
const loading = ref(true);
const error = ref(false);
const selectedFilter = ref('future');
const api = useApi();

/**
 * Identifies the most recent request. Clicking through the year filters faster
 * than the Lambda responds used to let an earlier response land after a later
 * one and leave the list showing a year the visitor is no longer on.
 */
let latestRequest = 0;

/**
 * Years offered in the "Past Events" dropdown, newest first. These used to be
 * three hardcoded <li> elements, so every January the current year silently
 * stopped being listed.
 */
const FIRST_YEAR_WITH_EVENTS = 2024;
const pastYears = computed(() => {
  const thisYear = new Date().getFullYear();
  return Array.from(
    { length: Math.max(0, thisYear - FIRST_YEAR_WITH_EVENTS + 1) },
    (_, i) => thisYear - i
  );
});

async function getEvents(timeMin = null, timeMax = null) {
  const request = ++latestRequest;
  loading.value = true;
  error.value = false;

  try {
    const payload = await api.get('/events', { timeMin, timeMax });
    if (request !== latestRequest) return;

    events.value = (payload?.items ?? []).map((x) => {
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
  } catch (err) {
    // Nothing used to catch this. A Lambda error, a cold-start timeout or a
    // CORS failure left `loading` true forever, so the homepage sat on a
    // spinner that would never resolve.
    console.error('Error fetching events:', err);
    if (request !== latestRequest) return;
    error.value = true;
    events.value = [];
  } finally {
    if (request === latestRequest) loading.value = false;
  }
}

const limitedEvents = computed(() => {
  return events.value.slice(0, props.limit);
});

/**
 * "No upcoming events" is wrong under a past-year filter, where an empty list
 * means that year had none rather than that nothing is booked.
 */
const emptyMessage = computed(() =>
  selectedFilter.value.startsWith('past')
    ? 'No events found for that year.'
    : 'No upcoming events.'
);

/** Re-runs whichever filter is selected, so a retry stays on the same view. */
function retry() {
  filterEvents(selectedFilter.value);
}

function getPastEvents(year = null) {
  const thisYear = new Date().getFullYear();
  if (year) {
    const startOfYear = `${year}-01-01`;
    if (year == thisYear) {
      const today = new Date().toISOString().split('T')[0];
      return getEvents(startOfYear, today);
    }
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
  color: var(--text-color);
}

.list-group-item small {
  color: var(--bg-grey);
}

.list-group-item p {
  color: var(--grey);
}

/* Add some margin for the spinner. Was `.text-center i`, which stopped matching
   when the spinner became an inline <svg> rather than an icon-font <i>. */
.events-spinner {
  margin-top: 50px;
}
@media (min-width: 992px) {
  .events-list {
    max-width: 75%;
  }
}

.events-list {
  margin-left: auto;
  margin-right: auto;
}
</style>