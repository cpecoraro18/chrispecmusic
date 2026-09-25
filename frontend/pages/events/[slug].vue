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

        <!-- The same dark card the list sits in, so arriving here from a link
             looks like the same site rather than a bare page of text. -->
        <article
          v-else
          class="event-card bg-dark text-white rounded mx-auto"
          :class="{ 'has-map': event.mapQuery }"
        >
          <div class="event-grid">
            <div class="event-body">
              <h1 class="event-act">{{ event.act }}</h1>

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

              <div class="event-datetime">
                <p class="event-when mb-0">
                  <span class="event-date">{{ event.date }}</span>
                  <!-- "Tonight" is the useful label in the list, but a standalone
                       page gets shared and read later, so the real date goes with it. -->
                  <span v-if="absoluteDate" class="event-absolute">{{ absoluteDate }}</span>
                </p>
                <p v-if="event.timeRange" class="event-time mb-0">{{ event.timeRange }}</p>
              </div>

              <p v-if="event.description" class="event-note">{{ event.description }}</p>

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
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { formatEvents, formatLongDate, eventRelativeDay, slugWindow } from '~/utils/events';
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

/** The real date, shown only when the date line is a relative label. */
const absoluteDate = computed(() => {
  if (!event.value?.start) return '';
  return eventRelativeDay(event.value.start) ? formatLongDate(event.value.start) : '';
});

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
/* Capped rather than full-bleed: one gig is a short piece of text, and stretched
   across a desktop it read as a stray paragraph instead of a listing. */
.event-card {
  max-width: 36rem;
  padding: 2.5rem 2rem;
  text-align: center;
}

/* A rule between where and when, as on a ticket — the card's only divider, so
   the eye goes act and venue, then date. */
.event-datetime {
  padding-top: 1rem;
  margin-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.event-when {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 500;
}

.event-absolute {
  color: var(--bg-grey);
}

.event-time {
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: 0.875rem;
  color: var(--bg-grey);
}

/* Sized to the card, not to an <h1>'s place in the page's type scale.
   `#app` is load-bearing: styles/main.css sizes headings as `#app h1`, and an
   id beats a class, so a plain `.event-act` rule here lost silently and the
   band name kept rendering at the global clamp's 4rem ceiling. */
#app .event-act {
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.3;
  margin-bottom: 0.6rem;
}

.event-place {
  display: inline-block;
  color: var(--bg-grey);
  text-decoration: none;
}

a.event-place:hover,
a.event-place:focus {
  color: #fff;
}

.event-venue {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.95rem;
}

.event-address {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.875rem;
  text-decoration: underline;
}

.event-note {
  margin-top: 1.25rem;
  color: var(--grey);
}

/* Stacked by default — details, then map underneath. */
.event-grid {
  display: grid;
  gap: 1.75rem;
}

/* Boxed by aspect-ratio rather than a fixed height, so it stays proportionate
   from the card's full width down to a phone. */
.event-map {
  aspect-ratio: 16 / 10;
  border-radius: 0.5rem;
  overflow: hidden;
}

.event-map iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

/* Side by side once there's room: details left, map right. Only a card that
   actually has a map gets the extra width, so an event with no location stays
   the narrow single column it was. */
@media (min-width: 768px) {
  .event-card.has-map {
    max-width: 54rem;
  }

  .event-card.has-map .event-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.25rem;
    align-items: center;
  }

  .event-card.has-map .event-map {
    aspect-ratio: 1 / 1;
  }
}

.event-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

@media (max-width: 575.98px) {
  .event-card {
    padding: 2rem 1.25rem;
  }

  /* Full width so neither wraps to a lonely second row. */
  .event-actions .btn {
    flex: 1 1 100%;
  }
}
</style>
