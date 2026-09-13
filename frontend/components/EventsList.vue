<template>
  <div class="mt-5 bg-dark text-white p-4 rounded events-list">
    <h2 v-if="showHeading" class="mb-4 text-center">{{ heading }}</h2>

    <!-- Event Filter Buttons. Centred to sit over a centred list. -->
    <div class="mb-4 text-center">
      <button
        class="btn btn-outline-light btn-sm me-2"
        :class="{ active: selectedFilter === 'future' }"
        @click="filterEvents('future')"
      >
        Upcoming
      </button>

      <!-- Past Events Dropdown -->
      <!-- No trailing margin: it would throw the centred row off by its width. -->
      <div class="btn-group" role="group">
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
    <div v-else-if="events.length" class="events">
      <article v-for="event in limitedEvents" :key="event.id" class="event">
        <div class="event-when">
          <p class="event-date mb-0">{{ unbreakable(event.date) }}</p>
          <!-- Start time only. The full range is on the event's own page, where
               there's room for it and someone is checking one gig in detail. -->
          <p v-if="event.time" class="event-time mb-0">{{ event.time }}</p>
        </div>

        <div class="event-what">
          <!-- The act is the link to the event's own page: a plain text link
               rather than a button, so the card stays a listing and not a form. -->
          <h3 class="event-act">
            <nuxt-link :to="`/events/${event.slug}`" class="event-act-link">{{ event.act }}</nuxt-link>
          </h3>

          <!-- The venue and address stay a live map link rather than the flat
               text they'd be on a poster: this is the listing someone actually
               navigates from. -->
          <p v-if="event.venue" class="event-where mb-0">
            <component
              :is="event.mapQuery ? 'a' : 'span'"
              v-bind="event.mapQuery ? { href: mapLink(event.mapQuery), target: '_blank', rel: 'noopener' } : {}"
              class="event-place"
            >
              <AppIcon name="location-dot" class="me-2" />
              <span class="event-venue">{{ event.venue }}</span>
              <span v-if="event.address" class="event-address">{{ event.address }}</span>
            </component>
          </p>

          <p v-if="event.description" class="event-note mb-0">{{ event.description }}</p>
        </div>
      </article>

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
import { formatEvents, isUpcoming, startOfDay } from '~/utils/events';

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
  },
  // 'long' spells the date out ("Friday, September 12"); 'short' ("Sep 12")
  // suits the narrower column of the teaser on the homepage.
  dateStyle: {
    type: String,
    default: 'long'
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

function mapLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Ties a month to its day number so the date column can't split them.
 *
 * "Friday, September 25" was wrapping to leave "25" stranded on the second
 * line; a non-breaking space there forces the break after the comma instead,
 * where it reads as deliberate. Also keeps the two halves of "Sep 12 – Sep 18"
 * whole, so a range can only break at the dash.
 *
 * Drawing only — the date string itself keeps ordinary spaces, since it also
 * feeds the page title and the meta description.
 */
function unbreakable(date) {
  return date.replace(/([A-Za-z]) (\d)/g, '$1\u00A0$2');
}

async function getEvents(timeMin = null, timeMax = null, { upcomingOnly = false } = {}) {
  const request = ++latestRequest;
  loading.value = true;
  error.value = false;

  try {
    const payload = await api.get('/events', { timeMin, timeMax });
    if (request !== latestRequest) return;

    const formatted = formatEvents(payload?.items ?? [], { style: props.dateStyle });
    events.value = upcomingOnly ? formatted.filter((event) => isUpcoming(event)) : formatted;
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
  // Google filters timeMin against an event's *end*, so asking from midnight
  // this morning keeps today's gig listed until the day is over rather than
  // dropping it the moment it starts. The client-side pass applies the same
  // rule, since the Lambda falls back to "now" if the parameter never arrives.
  return getEvents(startOfDay(new Date()).toISOString(), null, { upcomingOnly: true });
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
  getFutureEvents();
});
</script>

<style scoped>
.container {
  max-width: 800px;
}

/* Two columns on a wide screen — when on the left, who and where on the right —
   collapsing to one centred stack on a phone. Same type, weights and spacing in
   both; the grid is the only thing that changes, so the two read as one design.

   Text is stored in natural case and uppercased here, so the map link and
   screen readers still get the real venue name. */
.event {
  display: grid;
  /* Wide enough for "SEPTEMBER 25" on one line — the longest month plus a day —
     so the date breaks after the weekday comma and nowhere else. */
  grid-template-columns: 13rem 1fr;
  gap: 0 1.75rem;
  align-items: start;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.event:last-of-type {
  border-bottom: 0;
  margin-bottom: 0;
}

.event-when {
  /* Nudged down so the date sits on the act's baseline rather than its cap. */
  padding-top: 0.2rem;
}

/* Medium. The stack (Avenir Next, Segoe UI, Roboto) only ships discrete
   weights, so 400 and 500 are the two real options here — anything between
   snaps to one of them.

   `#app` so the tighter line-height survives: styles/main.css sets
   `#app p { line-height: 1.65 }`, and an id beats a class. */
#app .event-date {
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 500;
  line-height: 1.35;
}

.event-time {
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: 0.875rem;
  color: var(--bg-grey);
  margin-top: 0.1rem;
}

/* `#app` for the same reason as the date: `#app h3` in styles/main.css would
   otherwise win and hand this the page's heading scale, negative tracking and
   all — which is not what a listing row wants. */
#app .event-act {
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.3;
  margin-bottom: 0.4rem;
}

/* Inherits the heading's colour so it doesn't read as a stray blue link in the
   middle of the card; the underline on hover is what marks it as clickable. */
.event-act-link {
  color: inherit;
  text-decoration: none;
}

.event-act-link:hover,
.event-act-link:focus-visible {
  text-decoration: underline;
}

.event-place {
  display: inline-block;
  color: var(--bg-grey);
  text-decoration: none;
}

.event-venue {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.9rem;
}

/* Underlined and on its own line: it's the part someone taps to navigate, and
   a long street address never squeezes the venue name. */
.event-address {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  text-decoration: underline;
}

a.event-place:hover,
a.event-place:focus {
  color: #fff;
}

.event-note {
  margin-top: 0.5rem;
  color: var(--grey);
}

/* One centred column once the two stop fitting side by side. Nothing is
   dropped here — the phone has the vertical room for all of it. */
@media (max-width: 767.98px) {
  .event {
    grid-template-columns: 1fr;
    gap: 0.35rem;
    text-align: center;
  }

  .event-when {
    padding-top: 0;
  }
}

/* Genuinely cramped. Shed in priority order: the address goes first, then the
   venue name, and the act never goes — it's the reason the line is there. */
@media (max-width: 399.98px) {
  .event-address {
    display: none;
  }
}

@media (max-width: 319.98px) {
  .event-venue {
    display: none;
  }
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
