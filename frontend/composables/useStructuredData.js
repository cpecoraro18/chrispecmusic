import { SITE_URL, SITE_NAME, BRAND_NAME } from './useSeo';
import { CONTACT_EMAIL, STARTING_PRICE } from '~/data/service';

/**
 * Emits JSON-LD describing Chris as a person and the services he offers, so
 * search engines can associate him with "bass player Chicago" style queries
 * rather than inferring it from prose.
 *
 * Deliberately omits aggregateRating. The reviews in data/reviews.js are a
 * hand-picked selection, so any rating derived from them would misrepresent a
 * curated sample as a complete record — and review markup that cannot be
 * verified against a visible, complete source risks a manual penalty.
 */
export function usePersonStructuredData() {
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#chris`,
    name: SITE_NAME,
    // The domain and every social handle are one word; his name is two. Without
    // this, a search for "ChrisPecMusic" has no entity to attach to and the two
    // strings look unrelated.
    alternateName: BRAND_NAME,
    jobTitle: 'Bassist',
    description:
      'Upright and electric bassist based in Chicago, offering remote bass recording sessions and live performance.',
    url: SITE_URL,
    image: `${SITE_URL}/img/ChrisPecMusic.webp`,
    email: `mailto:${CONTACT_EMAIL}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chicago',
      addressRegion: 'IL',
      addressCountry: 'US',
    },
    knowsAbout: [
      'Upright bass',
      'Electric bass',
      'Remote session recording',
      'Jazz',
      'Blues',
      'Rock',
      'Soul',
      'Folk',
    ],
    sameAs: [
      'https://www.instagram.com/chrispecmusic',
      'https://www.youtube.com/@ChrisPecMusicOfficial',
      'https://www.fiverr.com/cpecoraro18',
    ],
  };

  /**
   * Identifies the site itself, as distinct from the person behind it. This is
   * what search engines read to decide the name to display for the site and
   * which URL that name belongs to — so without it, a brand-name search has
   * nothing pointing at the homepage in particular, and any page can answer it.
   *
   * Note the name/alternateName here are the reverse of the Person above, and
   * deliberately so. The site's name is the one-word form because that is what
   * the domain says, and a site name that contradicts its own domain is the
   * case search engines are most likely to override. The person's name is the
   * two-word form because that is his name. Only this node is emitted on the
   * homepage alone, so the brand string resolves to `/` and not to whichever
   * page happens to rank.
   */
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BRAND_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_URL}/#chris` },
  };

  const services = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Chris Pecoraro Session Bass',
    url: SITE_URL,
    image: `${SITE_URL}/img/BuddyGuys.webp`,
    provider: { '@id': `${SITE_URL}/#chris` },
    areaServed: [
      { '@type': 'Country', name: 'Worldwide' },
      { '@type': 'City', name: 'Chicago' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bass services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Remote bass recording session',
            description:
              'Upright or electric bass recorded remotely and delivered as mix-ready files, with multiple takes and revisions included.',
            serviceType: 'Remote session musician',
          },
          url: `${SITE_URL}/book-session`,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            // Derived from the pricing table so the rate advertised to search
            // engines cannot contradict the one on /book-session.
            price: STARTING_PRICE,
            priceCurrency: 'USD',
            unitText: 'per track',
            description: 'Starting price; per-track rate decreases on larger projects.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Live bass performance',
            description:
              'Upright and electric bass for clubs, weddings, private events, festivals, and touring dates.',
            serviceType: 'Live musician',
          },
          url: `${SITE_URL}/book-live-gig`,
        },
      ],
    },
  };

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [website, person, services],
        }),
      },
    ],
  });
}
