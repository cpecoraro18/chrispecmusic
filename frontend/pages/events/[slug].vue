<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <!-- Left-aligned from md up, where there's a margin for it to sit in.
             `#app` sets `text-align: center` for the whole site, so this needs
             Bootstrap's utility — those carry !important and win. Stays centred
             on a phone, where a lone link pinned left just looks stranded. -->
        <p class="mb-4 text-md-start">
          <nuxt-link to="/events" class="text-info">&larr; All events</nuxt-link>
        </p>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <AppIcon name="spinner" spin :scale="2" label="Loading event" />
        </div>

        <!-- The API is down. Distinct from "no such event": telling someone the
             gig they were linked to doesn't exist, when really the Lambda is
             cold, is the worst of the three states. -->
        <div v-else-if="error" class="text-center py-5" role="alert">
          <p class="lead mb-3">This event couldn't be loaded just now.</p>
          <button class="btn btn-cta" @click="load">Try again</button>
        </div>

        <!-- The link resolved, but nothing on that day matches. -->
        <div v-else-if="!event" class="text-center py-5">
          <h1 class="h3 mb-3">Event not found</h1>
          <p class="lead measure mx-auto mb-4">
            This gig may have been rescheduled or removed from the calendar.
          </p>
          <nuxt-link class="btn btn-cta" to="/events">See upcoming events</nuxt-link>
        </div>

        <!-- The same dark card and date block as the events list, so arriving
             from a row feels like opening it up. The act is set large: this
             is the page that gets texted around. -->
        <div v-else class="event-layout mx-auto" :class="{ 'has-map': event.mapQuery }">
          <article class="poster">
            <!-- The only place "Tonight" appears; the date block below always
                 carries the real date, because this page gets shared and read
                 on other days. -->
            <p v-if="relativeLabel" class="poster-tag">{{ relativeLabel }}</p>

            <h1 class="poster-act">{{ event.act }}</h1>

            <p v-if="event.venue" class="poster-where">
              <component
                :is="event.mapQuery ? 'a' : 'span'"
                v-bind="event.mapQuery ? { href: mapLink(event.mapQuery), target: '_blank', rel: 'noopener' } : {}"
                class="poster-place"
              >
                <span class="poster-venue">{{ event.venue }}</span>
                <span v-if="event.address" class="poster-address">{{ event.address }}</span>
              </component>
            </p>

            <!-- Month over a big day number, as on the events list. A run of
                 several days has no single number to set big, so it prints
                 the range as a line instead. -->
            <div class="poster-stub">
              <template v-if="dateParts">
                <p class="stub-date">
                  <span class="stub-month">{{ dateParts.month }}</span>
                  <span class="stub-day">{{ dateParts.day }}</span>
                </p>
                <p class="stub-detail">
                  <span class="stub-weekday">{{ dateParts.weekday }}</span>
                  <span v-if="event.timeRange" class="stub-time">{{ event.timeRange }}</span>
                  <span v-if="dateParts.year" class="stub-year">{{ dateParts.year }}</span>
                </p>
              </template>
              <p v-else class="stub-detail stub-detail-only">
                <span class="stub-weekday">{{ event.date }}</span>
                <span v-if="event.timeRange" class="stub-time">{{ event.timeRange }}</span>
              </p>
            </div>

            <p v-if="event.description" class="poster-note">{{ event.description }}</p>
          </article>

          <div class="event-actions">
            <a
              v-if="event.mapQuery"
              class="btn btn-cta"
              :href="mapLink(event.mapQuery)"
              target="_blank"
              rel="noopener"
            >
              Get directions
            </a>
            <button class="btn btn-ghost" type="button" @click="share">{{ shareLabel }}</button>
          </div>

          <!-- Keyless Google embed: no API key to provision or leak into a
               static build, and it needs only the address string we already
               have rather than coordinates we'd have to geocode. Lazy so it
               costs nothing until someone scrolls to it. -->
          <div v-if="event.mapQuery" class="event-map">
            <iframe
              :src="mapEmbed(event.mapQuery)"
              :title="`Map showing ${event.venue}`"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  formatEvents,
  formatLongDate,
  eventRelativeDay,
  eventDateParts,
  slugWindow,
} from '~/utils/events';
import { SITE_URL } from '~/composables/useSeo';

const route = useRoute();
const api = useApi();

const slug = computed(() => String(route.params.slug ?? ''));

const event = ref(null);
const loading = ref(true);
const error = ref(false);

/**
 * Fetches just the day the slug names rather than the whole calendar.
 *
 * The slug leads with the date for exactly this reason: a window around one day
 * is a cheap query that resolves a link to a gig from any year, where the list's
 * "upcoming" request would never return a past one.
 */
async function load() {
  loading.value = true;
  error.value = false;
  event.value = null;

  const range = slugWindow(slug.value);
  if (!range) {
    loading.value = false;
    return;
  }

  try {
    const payload = await api.get('/events', {
      timeMin: range.timeMin.toISOString(),
      timeMax: range.timeMax.toISOString(),
    });
    event.value = formatEvents(payload?.items ?? []).find((item) => item.slug === slug.value) ?? null;
  } catch (err) {
    console.error('Error fetching event:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

/** "Tonight" or "Tomorrow" for the label over the act, else ''. */
const relativeLabel = computed(() => eventRelativeDay(event.value?.start ?? null));

/** The stub's month, day and weekday; null prints the date as a plain line. */
const dateParts = computed(() => (event.value ? eventDateParts(event.value) : null));

function mapLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * The embeddable map for the same query.
 *
 * This is the keyless `output=embed` form rather than the Maps Embed API, which
 * would need a billing-enabled key shipped in a public static bundle. If Google
 * ever drops it, the "Get directions" link below still works — the map is an
 * enhancement, not the way anyone finds the venue.
 */
function mapEmbed(query) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

const shareLabel = ref('Copy link');

/**
 * The native share sheet on a phone, falling back to the clipboard on a desktop
 * browser. Both can be refused — share throws on cancel, clipboard needs a
 * permission — so neither is allowed to leave the button lying about what it did.
 */
async function share() {
  const url = `${SITE_URL}${route.path}`;
  const title = event.value ? `${event.value.act} — ${event.value.venue}` : 'Event';

  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch {
      // Cancelled, or unavailable in this context — fall through to the copy.
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    shareLabel.value = 'Link copied';
    setTimeout(() => (shareLabel.value = 'Copy link'), 2000);
  } catch {
    shareLabel.value = 'Press Ctrl+C to copy';
  }
}

/**
 * Reactive because the title is only known once the fetch lands.
 *
 * This is set client-side, which is as good as it gets on a statically
 * generated site whose events live in a calendar that changes without a
 * rebuild: a person opening the link sees the right title, but a social
 * unfurler that doesn't run JavaScript shows the site's default card.
 */
const title = computed(() =>
  event.value
    ? `${event.value.act} at ${event.value.venue}${
        event.value.start ? ` — ${formatLongDate(event.value.start)}` : ''
      } | Chris Pecoraro`
    : 'Event | Chris Pecoraro, Chicago Bassist'
);

const description = computed(() =>
  event.value
    ? `${event.value.act} live at ${event.value.venue}${
        event.value.address ? `, ${event.value.address}` : ''
      }${event.value.start ? ` on ${formatLongDate(event.value.start)}` : ''}${
        event.value.time ? ` at ${event.value.time}` : ''
      }. Chris Pecoraro on bass.`
    : 'A live performance featuring Chris Pecoraro on upright and electric bass.'
);

useSeo({
  title,
  description,
  type: 'article',
  // One gig's page is thin, duplicated across the run of a residency, and gone
  // from the calendar once it's played. It exists to be shared by link, not to
  // compete with /events in search.
  noindex: true,
});

onMounted(load);
</script>


<style scoped>
/* ---- Layout -----------------------------------------------------------
   Poster, then buttons, then map, stacked. From md up the map moves beside
   the poster and runs its full height, so the page is still act, venue,
   date, buttons reading down the left. */
.event-layout {
  max-width: 32rem;
  display: grid;
  gap: 1.75rem;
}

@media (min-width: 768px) {
  .event-layout.has-map {
    max-width: 62rem;
    grid-template-columns: minmax(0, 32rem) minmax(0, 1fr);
    grid-template-areas:
      'poster map'
      'actions map';
    column-gap: 2.5rem;
  }

  .has-map .poster { grid-area: poster; }
  .has-map .event-actions { grid-area: actions; }
  .has-map .event-map {
    grid-area: map;
    aspect-ratio: auto;
    min-height: 22rem;
  }
}

/* ---- The poster ------------------------------------------------------- */
.poster {
  padding: 2.25rem 2rem 2rem;
  background-color: var(--card-bg);
  color: var(--card-text);
  border: 1px solid rgba(var(--card-text-rgb), 0.06);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
}

.poster-tag {
  margin-bottom: 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--card-accent);
}

/* `#app` because styles/main.css sizes every heading as `#app h1`, and an id
   beats a class — without it the act silently takes the global scale. */
#app .poster-act {
  font-weight: 700;
  font-size: clamp(2rem, 1.5rem + 2vw, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-wrap: balance;
  overflow-wrap: anywhere;
  color: var(--card-text);
  margin: 0 0 1rem;
}

.poster-where {
  margin-bottom: 1.5rem;
}

.poster-place {
  color: inherit;
  text-decoration: none;
}

.poster-venue {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.3;
}

.poster-address {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.9rem;
  color: var(--card-text-soft);
  text-underline-offset: 3px;
}

a.poster-place:hover .poster-venue,
a.poster-place:focus-visible .poster-venue {
  color: var(--card-accent);
}

a.poster-place:hover .poster-address,
a.poster-place:focus-visible .poster-address {
  text-decoration: underline;
}

/* ---- Date block ------------------------------------------------------- */
/* The pair sits together in the middle of the card; the weekday and time
   stay left-aligned against the rule so they read as one unit with the day. */
.poster-stub {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(var(--card-text-rgb), 0.15);
}

.poster-stub p {
  margin: 0;
}

#app .stub-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 1.25rem;
  border-right: 1px solid rgba(var(--card-text-rgb), 0.2);
  line-height: 1;
}

.stub-month {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--card-accent);
}

.stub-day {
  margin-top: 0.2rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.stub-detail {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  text-align: left;
}

/* A multi-day run has no day block beside it, so it centres like the rest. */
.stub-detail-only {
  text-align: center;
}

.stub-weekday {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
}

.stub-time {
  font-size: 0.95rem;
  color: var(--card-text-soft);
}

.stub-year {
  font-size: 0.85rem;
  color: var(--card-text-soft);
}

.poster-note {
  margin: 1.5rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid rgba(var(--card-text-rgb), 0.15);
  font-size: 0.95rem;
  color: var(--card-text-soft);
  white-space: pre-line;
}

/* ---- Buttons and map -------------------------------------------------- */
.event-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

/* Boxed by aspect-ratio when stacked, so it stays proportionate down to a
   phone; beside the poster it stretches to the poster's height instead. */
.event-map {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.event-map iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 575.98px) {
  .poster {
    padding: 2rem 1.35rem 1.6rem;
  }

  /* Full width so neither wraps to a lonely second row. */
  .event-actions .btn {
    flex: 1 1 100%;
  }
}
</style>
