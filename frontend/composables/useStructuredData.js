import { SITE_URL, SITE_NAME } from './useSeo';

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
    jobTitle: 'Bassist',
    description:
      'Upright and electric bassist based in Chicago, offering remote bass recording sessions and live performance.',
    url: SITE_URL,
    image: `${SITE_URL}/img/ChrisPecMusic.jpg`,
    email: 'mailto:contact@chrispecmusic.com',
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

  const services = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Chris Pecoraro Session Bass',
    url: SITE_URL,
    image: `${SITE_URL}/img/BuddyGuys.jpg`,
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
            price: 80,
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
          '@graph': [person, services],
        }),
      },
    ],
  });
}
