/**
 * One delegated click listener that classifies every link on the site, so the
 * three things worth knowing about a visitor's intent get tracked without a
 * handler on each of the several dozen links that produce them:
 *
 *   cta_click       an internal link to a page where a booking starts
 *   email_click     the mailto fallback, in the footer and under every CTA band
 *   outbound_click  Fiverr, Instagram, YouTube, Spotify, the S3 downloads
 *
 * Delegation rather than per-link handlers because these links are spread over
 * ten pages and several components, and a CTA added later is tracked with no
 * extra work. Components that want a more specific event than the classifier
 * would give them (see BassAudioSamples.vue) call trackEvent themselves and
 * mark the anchor `data-track-ignore` so it is not also counted here.
 *
 * GTM side: each event name needs a Custom Event trigger and a GA4 event tag in
 * the container before it reaches reporting. Pageviews for in-app navigation
 * are deliberately not pushed — GA4's enhanced measurement already counts
 * history changes, and pushing our own would double-count them.
 */
export default defineNuxtPlugin(() => {
  /**
   * Internal destinations that represent booking intent. A click toward one of
   * these is the closest thing the site has to a mid-funnel signal: it is the
   * step between reading and actually submitting the form.
   */
  const CONVERSION_PATHS = ['/book-session', '/book-live-gig', '/contact'];

  /** What the visitor actually clicked, for telling one CTA from another. */
  function labelFor(anchor: HTMLAnchorElement): string {
    const text = anchor.textContent?.replace(/\s+/g, ' ').trim();
    // Icon-only links (the social row, the photo download) have no text, so
    // fall back to the labels they carry for screen readers.
    const label = text || anchor.getAttribute('aria-label') || anchor.getAttribute('title') || '';
    return label.slice(0, 100);
  }

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.dataset.trackIgnore !== undefined) return;

      const href = anchor.getAttribute('href') ?? '';

      // Same-page anchors: the hero scroll cue, the events filter dropdown.
      // Not navigation, and resolving them would wrongly report the current
      // path as the destination.
      if (href.startsWith('#')) return;

      if (href.startsWith('mailto:')) {
        trackEvent('email_click', { link_text: labelFor(anchor) });
        return;
      }

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { link_text: labelFor(anchor) });
        return;
      }

      let url: URL;
      try {
        // anchor.href is already absolute; the base is a formality for exotic
        // hrefs that would otherwise throw and take the click handler with them.
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.host !== window.location.host) {
        trackEvent('outbound_click', {
          link_domain: url.hostname,
          link_url: url.href,
          link_text: labelFor(anchor),
        });
        return;
      }

      if (CONVERSION_PATHS.some((path) => url.pathname === path || url.pathname.startsWith(`${path}/`))) {
        trackEvent('cta_click', {
          destination: url.pathname,
          link_text: labelFor(anchor),
        });
      }
    },
    // Capture, so a click is still counted when a handler further down calls
    // stopPropagation — and so the event is recorded before any navigation.
    { capture: true }
  );
});
