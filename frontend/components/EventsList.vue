<template>
  <div class="mt-5 events-list">
    <!-- Outside the card, in the site's own heading style, so the homepage
         section reads like every other section and the card is the content. -->
    <h2 v-if="showHeading" class="mb-4 text-center">{{ heading }}</h2>

    <!-- The same dark card and date block as each event's own page, so
         clicking through from a row feels like opening it up rather than
         landing somewhere new. -->
    <div class="events-sheet">
      <div class="events-filters">
        <button
          class="filter-btn"
          :class="{ active: selectedFilter === 'future' }"
          :aria-pressed="selectedFilter === 'future'"
          @click="filterEvents('future')"
        >
          Upcoming
        </button>

        <div class="btn-group" role="group">
          <button
            class="filter-btn dropdown-toggle"
            :class="{ active: selectedFilter.startsWith('past') }"
            type="button"
            data-bs-toggle="dropdown"
          >
            {{ pastLabel }}
          </button>
          <ul class="dropdown-menu">
            <li v-for="year in pastYears" :key="year">
              <a class="dropdown-item" href="#" @click.prevent="filterEvents(`past-${year}`)">{{ year }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Loading Icon -->
      <div v-if="loading" class="events-status">
        <AppIcon name="spinner" spin :scale="2" label="Loading events" />
      </div>

      <!-- Failed to load. Kept distinct from the empty state below: reporting a
           dead API as "no upcoming events" tells visitors he has no gigs. -->
      <div v-else-if="error" class="events-status" role="alert">
        <p class="mb-3">The event list couldn't be loaded just now.</p>
        <button class="filter-btn" @click="retry">Try again</button>
      </div>

      <!-- Events List -->
      <div v-else-if="events.length" class="events">
        <article v-for="event in limitedEvents" :key="event.id" class="event">
          <!-- Month over a big day number, ruled off, as on the event page. A run of several days has no single number to set
               big, so it prints its range instead. -->
          <p class="event-date">
            <template v-if="event.parts">
              <span class="event-month">{{ event.parts.month }}</span>
              <span class="event-day">{{ event.parts.day }}</span>
              <span v-if="event.parts.year" class="event-year">{{ event.parts.year }}</span>
            </template>
            <span v-else class="event-range">{{ unbreakable(event.date) }}</span>
          </p>

          <div class="event-what">
            <p v-if="event.relative" class="event-tag">
              {{ event.relative }}
            </p>

            <!-- The act is the link to the event's own page: a plain text link
                 rather than a button, so the row stays a listing and not a form. -->
            <h3 class="event-act">
              <nuxt-link :to="`/events/${event.slug}`" class="event-act-link">{{ event.act }}</nuxt-link>
            </h3>

            <!-- The venue stays a live map link: this is the listing someone
                 actually navigates from. -->
            <p v-if="event.venue" class="event-where">
              <component
                :is="event.mapQuery ? 'a' : 'span'"
                v-bind="event.mapQuery ? { href: mapLink(event.mapQuery), target: '_blank', rel: 'noopener' } : {}"
                class="event-place"
              >
                <span class="event-venue">{{ event.venue }}</span>
                <span v-if="event.address" class="event-address">{{ event.address }}</span>
              </component>
            </p>

            <!-- Start time only. The full range is on the event's own page,
                 where someone is checking one gig in detail. -->
            <p v-if="event.parts || event.time" class="event-meta">
              <span v-if="event.parts">{{ event.parts.weekday }}</span>
              <span v-if="event.time">{{ event.time }}</span>
            </p>

            <p v-if="event.description" class="event-note">{{ event.description }}</p>
          </div>
        </article>

        <div v-if="events.length > limit" class="events-more">
          <nuxt-link to="/events">See all events &rarr;</nuxt-link>
        </div>
      </div>

      <!-- No Events Message -->
      <p v-else class="events-status">{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { formatEvents, isUpcoming, startOfDay, eventDateParts, eventRelativeDay } from '~/utils/events';

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

/**
 * The rows to draw, each with its date block's pieces and its "Tonight" label
 * worked out once here rather than on every render of the template.
 */
const limitedEvents = computed(() =>
  events.value.slice(0, props.limit).map((event) => ({
    ...event,
    parts: eventDateParts(event),
    relative: eventRelativeDay(event.start),
  }))
);

/** The dropdown names the year it's showing, so the filter row says where you are. */
const pastLabel = computed(() =>
  selectedFilter.value.startsWith('past-') ? selectedFilter.value.slice(5) : 'Past events'
);

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
.events-list {
  max-width: 44rem;
  margin-left: auto;
  margin-right: auto;
}

/* ---- The card ---------------------------------------------------------
   Same colours and corner as the card on each event's page. */
.events-sheet {
  padding: 1.75rem 2rem 2rem;
  background-color: var(--card-bg);
  color: var(--card-text);
  border: 1px solid rgba(var(--card-text-rgb), 0.06);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
}

.events-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(var(--card-text-rgb), 0.15);
}

/* Styled here rather than with Bootstrap's outline-light so the filters use
   the card's own colours. The selected filter fills solid. */
.filter-btn {
  padding: 0.35rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--card-text);
  background: transparent;
  border: 1px solid rgba(var(--card-text-rgb), 0.35);
  border-radius: var(--radius-sm);
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.filter-btn:hover,
.filter-btn:focus-visible {
  border-color: var(--card-text);
}

.filter-btn.active {
  color: var(--card-bg);
  background: var(--card-text);
  border-color: var(--card-text);
}

.events-status {
  margin: 0;
  padding: 2.5rem 0 0.5rem;
  text-align: center;
  color: var(--card-text-soft);
}

/* ---- One gig ----------------------------------------------------------
   Date block on the left, who/where/when centred in the column beside it, at
   every width — the block is narrow enough that a phone never needs to stack
   them. */
.event {
  display: grid;
  grid-template-columns: 4.25rem minmax(0, 1fr);
  gap: 1.25rem;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(var(--card-text-rgb), 0.12);
}

.event:last-of-type {
  border-bottom: 0;
  padding-bottom: 0;
}

.event p {
  margin: 0;
}

#app .event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  padding-right: 0.75rem;
  border-right: 1px solid rgba(var(--card-text-rgb), 0.2);
  line-height: 1;
}

.event-month {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--card-accent);
}

.event-day {
  margin-top: 0.2rem;
  font-size: 2.25rem;
  font-weight: 700;
}

.event-year {
  margin-top: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--card-text-soft);
}

/* A multi-day run: "Sep 12 – Sep 18", set small so it fits the column. */
.event-range {
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.15;
  text-align: center;
}

.event-tag {
  margin-bottom: 0.25rem !important;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--card-accent);
}

/* `#app` because styles/main.css sizes every heading as `#app h3`, and an id
   beats a class — without it the act takes the page's heading scale. */
#app .event-act {
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.25;
  letter-spacing: -0.005em;
  overflow-wrap: anywhere;
  color: var(--card-text);
  margin: 0 0 0.35rem;
}

/* Inherits the text colour so it doesn't read as a stray link colour; the
   accent on hover is what marks it as clickable. */
.event-act-link {
  color: inherit;
  text-decoration: none;
}

.event-act-link:hover,
.event-act-link:focus-visible {
  color: var(--card-accent);
}

.event-place {
  color: inherit;
  text-decoration: none;
}

.event-venue {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.35;
}

.event-address {
  display: block;
  margin-top: 0.1rem;
  font-size: 0.85rem;
  color: var(--card-text-soft);
  text-underline-offset: 3px;
}

a.event-place:hover .event-venue,
a.event-place:focus-visible .event-venue {
  color: var(--card-accent);
}

a.event-place:hover .event-address,
a.event-place:focus-visible .event-address {
  text-decoration: underline;
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 0.6rem;
  margin-top: 0.5rem !important;
  font-size: 0.9rem;
  color: var(--card-text-soft);
}

.event-meta span + span::before {
  content: '·';
  margin-right: 0.6rem;
  color: var(--card-text-soft);
}

.event-note {
  margin-top: 0.5rem !important;
  font-size: 0.9rem;
  color: var(--card-text-soft);
}

.events-more {
  padding-top: 1.25rem;
  margin-top: 1.25rem;
  border-top: 1px solid rgba(var(--card-text-rgb), 0.15);
  text-align: center;
}

.events-more a {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--card-text);
  text-decoration: none;
}

.events-more a:hover,
.events-more a:focus-visible {
  color: var(--card-accent);
}

@media (max-width: 575.98px) {
  .events-sheet {
    padding: 1.35rem 1.35rem 1.6rem;
  }

  .event {
    grid-template-columns: 3.5rem minmax(0, 1fr);
    gap: 1rem;
  }

  .event-date {
    padding-right: 0.5rem;
  }

  .event-day {
    font-size: 1.75rem;
  }
}
</style>
