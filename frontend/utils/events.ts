/**
 * Turning a Google Calendar entry into the handful of lines an event card
 * shows: who is playing, where, and when.
 *
 * The shape of the output follows the gig poster — act, then venue, then
 * address, with the date and time set apart — but this is a live calendar
 * rather than a printed sheet, so the venue stays a real map link and the
 * address keeps enough of itself to actually find the place by.
 *
 * The calendar is written by hand between gigs, so nothing here can assume a
 * tidy input. A summary is usually "Act @ Venue" but sometimes just the act; a
 * location is usually "Venue, Street, Town, ST 60640" but sometimes just the
 * venue, sometimes with a country on the end. Every helper below degrades to
 * "print what we were given" rather than dropping information it didn't
 * recognise.
 *
 * Everything returns natural case. Uppercase is a drawing decision and belongs
 * in CSS (`text-transform`), so a venue written "SPACE" and one written "Space"
 * read alike in the list while the underlying text stays correct for the map
 * link and for screen readers.
 */

export interface CalendarEvent {
  id?: string;
  summary?: string;
  location?: string;
  description?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
}

export interface FormattedEvent {
  id: string;
  /** URL segment for this event's own page, e.g. the shareable link. */
  slug: string;
  /** The act, never dropped however little room there is. */
  act: string;
  venue: string;
  address: string;
  /** "Friday, September 12", "Tonight", or "Sep 12 - Sep 18". */
  date: string;
  /** "8 PM". Empty for an all-day event, which has no meaningful time. */
  time: string;
  /** "8 – 11 PM". Falls back to the start alone when there's no end time. */
  timeRange: string;
  allDay: boolean;
  start: Date | null;
  /** The real end time, for the time range. Null for an all-day event. */
  endsAt: Date | null;
  /** Inclusive: the last day the event runs, not Google's exclusive end. */
  end: Date | null;
  description: string;
  /** What to hand Google Maps, or '' when there's nothing to search for. */
  mapQuery: string;
}

export type DateStyle = 'long' | 'short';

/**
 * Countries worth recognising on the end of a location. The list is
 * deliberately short and matched exactly: the rule is "drop a trailing country
 * if it really is one", and a fuzzier test would happily eat "Chicago, IL" or a
 * town called Mexico.
 */
const COUNTRIES = new Set([
  'us', 'usa', 'u.s.', 'u.s.a.', 'united states', 'united states of america',
  'canada', 'mexico',
  'uk', 'u.k.', 'united kingdom', 'england', 'scotland', 'wales', 'ireland',
  'france', 'germany', 'italy', 'spain', 'portugal', 'netherlands', 'belgium',
  'switzerland', 'austria', 'denmark', 'sweden', 'norway', 'finland', 'poland',
  'japan', 'australia', 'new zealand', 'brazil', 'argentina',
]);

/** A street line: a house number, or a PO box written any of the usual ways. */
const STREET = /^(?:\d|p\.?\s*o\.?\s*box\b)/i;

/**
 * A postcode on the end of the town line - US ZIP (with or without +4), a bare
 * 4-6 digit European one, Canadian ("M5V 3L9") or UK ("W1D 4HT"). Anchored to
 * the end so a street number can't match it.
 */
const POSTCODE =
  /(?:^|[\s,]+)(?:\d{4,6}(?:-\d{4})?|[A-Za-z]\d[A-Za-z][\s-]?\d[A-Za-z]\d|[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2})$/;

/** A part that is a postcode and nothing else, such as a stray trailing ZIP. */
const BARE_POSTCODE = /^\d{4,6}(?:-\d{4})?$/;

/** Splits "Act @ Venue" on the first @. Everything before it is the act. */
function splitSummary(summary: string): { act: string; after: string } {
  const at = summary.indexOf('@');
  if (at === -1) return { act: summary.trim(), after: '' };
  return { act: summary.slice(0, at).trim(), after: summary.slice(at + 1).trim() };
}

/** The act: the title before the @, or the whole title when there isn't one. */
export function eventAct(summary = ''): string {
  return splitSummary(summary).act;
}

/** A part that names a street rather than continuing the venue's name. */
function isStreet(part: string): boolean {
  return STREET.test(part) && !BARE_POSTCODE.test(part);
}

/**
 * Divides a location into the venue and whatever follows it.
 *
 * The split is at the first part that looks like a street, not at the first
 * comma, because venue names contain commas of their own: "Cuda's Restaurant,
 * Bar and Pizza, 27045 W Grass Lake Rd, Antioch, IL" is one venue and one
 * address, and cutting at the comma put "Bar and Pizza" in the address.
 *
 * With no street to find — "Green Mill, Chicago, IL" — the venue is the first
 * part and the rest is the address, as before.
 */
function splitLocation(location: string): { venue: string[]; rest: string[] } {
  const parts = location.split(',').map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return { venue: [], rest: [] };

  // From index 1: a venue whose own name starts with a number ("1st Ward") must
  // not be mistaken for the street.
  const streetAt = parts.findIndex((part, index) => index > 0 && isStreet(part));

  return streetAt === -1
    ? { venue: parts.slice(0, 1), rest: parts.slice(1) }
    : { venue: parts.slice(0, streetAt), rest: parts.slice(streetAt) };
}

/**
 * The venue: the location up to the street. Falls back to the part of the title
 * after the @, which is where the venue lives on the entries that never got a
 * location filled in.
 */
export function eventVenue(location = '', summary = ''): string {
  return splitLocation(location).venue.join(', ') || splitSummary(summary).after;
}

/**
 * The address, with the venue removed so it isn't said twice.
 *
 * Splits on commas, drops the venue and any trailing country, then reads the
 * rest as an optional street followed by a town. Depending on how much was
 * written this prints nothing, "Chicago, IL", "4802 N Broadway", both, or -
 * when the parts don't fit that shape at all - simply everything that was left.
 */
export function eventAddress(location = ''): string {
  // Everything the venue didn't claim, which is already shown on its own line.
  const rest = splitLocation(location).rest;

  // Lowercased for the comparison only; nothing here rewrites the text.
  if (rest.length && COUNTRIES.has(rest[rest.length - 1].toLowerCase())) rest.pop();
  if (!rest.length) return '';

  const street = isStreet(rest[0]) ? rest.shift()! : '';
  const town = stripPostcode(rest.join(', '));

  return [street, town].filter(Boolean).join(', ');
}

/**
 * Drops a postcode off the end of the town line - "Chicago, IL 60640" reads as
 * "Chicago, IL" on a listing, and the map link carries the full location
 * anyway. A line that was nothing but a postcode comes back empty.
 */
function stripPostcode(text: string): string {
  return text.replace(POSTCODE, '').trim();
}

/**
 * Parses a Google all-day date ("2026-09-12") in local time.
 *
 * `new Date('2026-09-12')` is parsed as UTC midnight, which in Chicago is the
 * evening of the 11th - so an all-day gig would list, and sort, a day early.
 */
function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/** Midnight at the start of the day `date` falls in. */
export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

/**
 * "Tonight" or "Tomorrow" when the date is one of those, otherwise ''. These
 * beat a formatted date: someone scanning the list wants to know a gig is
 * happening now far more than they want to read back today's date.
 */
function relativeDay(date: Date, now: Date): string {
  const days = Math.round(
    (startOfDay(date).getTime() - startOfDay(now).getTime()) / 86_400_000
  );
  if (days === 0) return 'Tonight';
  if (days === 1) return 'Tomorrow';
  return '';
}

/** "Friday, September 12", or "Friday, September 12, 2027" with the year. */
export function formatLongDate(date: Date, withYear = false): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  });
}

/** "Sep 12", or "Sep 12, 2027" with the year. */
export function formatShortDate(date: Date, withYear = false): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  });
}

/**
 * The date line: "Friday, September 12", "Sep 12" where the column is narrow,
 * "Sep 12 - Sep 18" when it runs across days, and "Tonight"/"Tomorrow" in
 * preference to any of them.
 */
export function formatEventDate(
  start: Date | null,
  end: Date | null,
  { now = new Date(), style = 'long' as DateStyle } = {}
): string {
  if (!start) return '';

  // The year is noise on a gig three weeks out and essential on one from the
  // 2024 filter, so it appears only when the event isn't in the current year.
  const withYear = start.getFullYear() !== now.getFullYear();

  if (end && !isSameDay(start, end)) {
    return `${formatShortDate(start)} – ${formatShortDate(end, withYear)}`;
  }

  return (
    relativeDay(start, now) ||
    (style === 'short' ? formatShortDate(start, withYear) : formatLongDate(start, withYear))
  );
}

/**
 * "8 PM", or "8:30 PM" when a gig doesn't start on the hour. All-day events
 * have no time worth showing.
 */
export function formatEventTime(start: Date | null, allDay = false): string {
  if (!start || allDay) return '';
  return start
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    .replace(':00', '');
}

/**
 * "8 – 11 PM", or "9 PM – 1 AM" when the two straddle noon or midnight. The
 * shared meridiem is dropped from the first half because printing it twice is
 * how a listing starts looking like a timetable.
 *
 * Falls back to the start alone when there is no end, and to nothing at all for
 * an all-day event.
 */
export function formatEventTimeRange(
  start: Date | null,
  endsAt: Date | null,
  allDay = false
): string {
  const from = formatEventTime(start, allDay);
  if (!from || !endsAt) return from;

  const to = formatEventTime(endsAt, allDay);
  if (!to || to === from) return from;

  const meridiem = /\s([AP]M)$/.exec(from)?.[1];
  const head = meridiem && meridiem === /\s([AP]M)$/.exec(to)?.[1]
    ? from.replace(/\s[AP]M$/, '')
    : from;

  return `${head} – ${to}`;
}

/**
 * The last day an event actually runs on, which is not the end Google gives us:
 *
 * - All-day events end exclusively, so a one-day event on the 12th ends on the
 *   13th. Step back a day.
 * - A club date that runs 9 PM to 1 AM technically ends the following morning,
 *   and calling that "Sep 12 - Sep 13" would be silly. Anything ending within
 *   six hours of midnight still belongs to the night it started on.
 */
function lastDay(end: Date, allDay: boolean): Date {
  const offset = allDay ? 86_400_000 : 6 * 3_600_000;
  return startOfDay(new Date(end.getTime() - offset));
}

/**
 * Text to a URL segment. Apostrophes are removed rather than replaced, so
 * "Buddy Guy's Legends" reads "buddy-guys-legends" and not "buddy-guy-s-".
 * Both the straight and the curly apostrophe appear in the calendar.
 */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['\u2018\u2019]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * The time zone the gigs are played in, and so the one a link's date is read
 * in. Every visitor has to derive the same slug for the same gig, whatever their
 * own clock says: a 9 PM Chicago show is already the 13th in London, and a link
 * shared from Chicago used to resolve to "Event not found" there.
 */
const EVENT_TIME_ZONE = 'America/Chicago';

const eventDayFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: EVENT_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * The date an event falls on, as YYYY-MM-DD.
 *
 * A timed event is read on Chicago's calendar. `toISOString()` would be the UTC
 * day, which for an evening gig is tomorrow's date, and the viewer's local day
 * differs from one visitor to the next. An all-day event has no instant to
 * convert: `parseDateOnly` built it from Google's bare date in local time, so
 * its local fields are that date exactly, wherever the viewer is.
 */
function eventDateKey(date: Date, allDay: boolean): string {
  if (allDay) {
    const pad = (part: number) => String(part).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  const parts = Object.fromEntries(
    eventDayFormat.formatToParts(date).map(({ type, value }) => [type, value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

/**
 * The event's own URL segment: "2026-09-12-sean-mckee-band-at-buddy-guys-legends".
 *
 * The date leads so the segment sorts, reads as a date to a human scanning a
 * pasted link, and — the part that matters — lets the standalone page work out
 * which single day to ask the calendar for. Resolving a link by opaque Google
 * event id would mean fetching the whole calendar to find one gig, and the act
 * plays the same rooms often enough that the date alone would collide.
 */
export function eventSlug(
  event: Pick<FormattedEvent, 'act' | 'venue' | 'start' | 'id' | 'allDay'>
): string {
  const day = event.start ? eventDateKey(event.start, event.allDay) : '';
  const name = [slugify(event.act), event.venue ? `at-${slugify(event.venue)}` : '']
    .filter(Boolean)
    .join('-');

  return [day, name].filter(Boolean).join('-') || slugify(event.id);
}

/**
 * The span of time to ask the calendar for to resolve a slug, or null if the
 * slug doesn't start with a date. Querying around just the day the slug names
 * is what lets a link to a gig from last year still resolve.
 *
 * Deliberately wider than the day: UTC midnight on the date through UTC
 * midnight two days later. That contains the whole Chicago day (05:00 or 06:00
 * UTC to the same the next morning) without working out the DST offset, and
 * the page matches the full slug among what comes back, so the neighbouring
 * events it also returns are never shown.
 */
export function slugWindow(slug: string): { timeMin: Date; timeMax: Date } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(slug);
  if (!match) return null;
  const from = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return { timeMin: new Date(from), timeMax: new Date(from + 2 * 86_400_000) };
}

/**
 * "Tonight" or "Tomorrow" for a date that is one of those, else ''. Exported so
 * a page can tell whether the date it is showing is a relative label and print
 * the real date alongside it.
 */
export function eventRelativeDay(date: Date | null, now = new Date()): string {
  return date ? relativeDay(date, now) : '';
}

export interface DateParts {
  /** "Sep" */
  month: string;
  /** 25 */
  day: number;
  /** "Friday" */
  weekday: string;
  /** The year, or '' when it's this one — noise on a gig three weeks out. */
  year: number | '';
}

/**
 * The pieces a date block sets separately: a small month over a big day number.
 * Null for an event with no start, or one that runs across several days, which
 * has no single day to set big and prints its range as a line instead.
 */
export function eventDateParts(
  event: Pick<FormattedEvent, 'start' | 'end'>,
  now = new Date()
): DateParts | null {
  const { start, end } = event;
  if (!start || (end && !isSameDay(start, end))) return null;

  return {
    month: start.toLocaleDateString('en-US', { month: 'short' }),
    day: start.getDate(),
    weekday: start.toLocaleDateString('en-US', { weekday: 'long' }),
    year: start.getFullYear() !== now.getFullYear() ? start.getFullYear() : '',
  };
}

/** Whether an event is still worth listing as upcoming. */
export function isUpcoming(
  event: Pick<FormattedEvent, 'start' | 'end'>,
  now = new Date()
): boolean {
  // Measured against the start of today, not this moment, so an afternoon gig
  // stays on the site all day rather than vanishing while it's being played.
  const end = event.end ?? event.start;
  return end ? end.getTime() >= startOfDay(now).getTime() : false;
}

/**
 * Chronological, with all-day events at the head of the day they fall on -
 * they have no start time to sort by, and a festival should sit above the club
 * date that evening. Ties fall back to the act so the order is stable.
 */
export function compareEvents(a: FormattedEvent, b: FormattedEvent): number {
  if (!a.start || !b.start) return a.start ? -1 : b.start ? 1 : 0;

  const byDay = startOfDay(a.start).getTime() - startOfDay(b.start).getTime();
  if (byDay) return byDay;

  if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;

  const byStart = a.start.getTime() - b.start.getTime();
  if (byStart) return byStart;

  return a.act.localeCompare(b.act);
}

/** Reads one calendar entry into the fields a card draws. */
export function formatEvent(
  event: CalendarEvent,
  { now = new Date(), style = 'long' as DateStyle } = {}
): FormattedEvent {
  const allDay = Boolean(event.start?.date && !event.start?.dateTime);

  const start = event.start?.dateTime
    ? new Date(event.start.dateTime)
    : event.start?.date
      ? parseDateOnly(event.start.date)
      : null;

  const rawEnd = event.end?.dateTime
    ? new Date(event.end.dateTime)
    : event.end?.date
      ? parseDateOnly(event.end.date)
      : null;

  // Two different things, both needed: `endsAt` is the clock time the gig
  // finishes, `end` the last calendar day it covers.
  const endsAt = allDay ? null : rawEnd;
  const end = rawEnd ? lastDay(rawEnd, allDay) : start;

  const summary = event.summary ?? '';
  const location = event.location ?? '';

  const id = event.id ?? summary;
  const act = eventAct(summary);
  const venue = eventVenue(location, summary);

  return {
    id,
    slug: eventSlug({ id, act, venue, start, allDay }),
    act,
    venue,
    address: eventAddress(location),
    date: formatEventDate(start, end, { now, style }),
    time: formatEventTime(start, allDay),
    timeRange: formatEventTimeRange(start, endsAt, allDay),
    allDay,
    start,
    endsAt,
    end,
    description: event.description ?? '',
    // Only linkable when a location was actually written down; searching maps
    // for a bare band name lands the visitor somewhere random.
    mapQuery: location,
  };
}

/** Reads a calendar feed into a sorted list of cards. */
export function formatEvents(
  events: CalendarEvent[] = [],
  options: { now?: Date; style?: DateStyle } = {}
): FormattedEvent[] {
  return events.map((event) => formatEvent(event, options)).sort(compareEvents);
}
