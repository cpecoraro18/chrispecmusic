/**
 * Pushes events into the Google Tag Manager dataLayer (GTM-MFS3DSBM, loaded in
 * nuxt.config.ts).
 *
 * GTM was installed but nothing ever pushed to it, so the site reported
 * pageviews and nothing else — there was no way to tell which pages, or which
 * traffic sources, actually produced an inquiry. Every event fired from here is
 * something a booking depends on: a lead submitted, a booking CTA clicked, a
 * sample played, a link out to Fiverr or Instagram followed.
 *
 * Names follow GA4 conventions (snake_case, and `generate_lead` is one of GA4's
 * recommended event names) so they need no renaming on the GTM side. Each one
 * still has to be forwarded to GA4 by a tag in the container — see the note in
 * plugins/analytics.client.ts.
 */

type TrackParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * @param event   The dataLayer event name, e.g. 'generate_lead'.
 * @param params  Extra fields for the event. Empty and nullish values are
 *                dropped rather than sent as the string "undefined".
 */
export function trackEvent(event: string, params: TrackParams = {}): void {
  // Guarded rather than assumed: this runs on click handlers that also exist
  // during SSG prerendering, where there is no window.
  if (typeof window === 'undefined') return;

  // GTM creates dataLayer itself, but an ad blocker or a failed gtm.js request
  // leaves it undefined. Creating it here means a blocked tag manager degrades
  // to events queuing up harmlessly instead of every click throwing.
  window.dataLayer = window.dataLayer || [];

  const fields = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );

  window.dataLayer.push({
    event,
    // Attached here so no caller has to remember it. Read from location rather
    // than useRoute() so this stays callable from a plain event listener
    // outside a component's setup context.
    page_path: window.location.pathname,
    ...fields,
  });
}
