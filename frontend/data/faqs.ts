import {
  TAKES_PER_TRACK,
  GENRE_LIST_SENTENCE,
  REVISION_ROUNDS,
  MAX_SAMPLE_RATE,
  CONTACT_EMAIL,
} from './service';

/**
 * FAQ content for the two booking pages.
 *
 * Kept here rather than in the pages because the same questions are worth
 * emitting as FAQPage structured data, and content that has two consumers
 * should have one home.
 */
export interface Faq {
  q: string;
  a: string;
}

export const sessionFaqs: Faq[] = [
  {
    q: 'Who is this service for?',
    a: 'Songwriters, producers, bands, and artists who want professional bass without booking studio time.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A rough mix or demo (WAV, MP3, etc.), the tempo if you have it, and any notes on style, tone, or feel.',
  },
  {
    q: 'What if I don’t know exactly what bass line I want?',
    a: 'That’s fine. Many projects start with only a rough idea. I’ll write parts that support the song and give you options to choose from.',
  },
  {
    q: 'Can you play a part I’ve already written?',
    a: 'Yes. Send a chart, lead sheet, or guide bass line and I’ll play it as written, or I can write a part from scratch.',
  },
  {
    q: 'What happens if the first take isn’t quite right?',
    a: `${REVISION_ROUNDS.charAt(0).toUpperCase() + REVISION_ROUNDS.slice(1)} rounds of revisions are included with every song to adjust the part, tone, or feel. Beyond that, we agree on a price first.`,
  },
  {
    q: 'What files will I get?',
    a: `WAV files at your session’s sample rate, up to ${MAX_SAMPLE_RATE}, with DI and amp or mic on separate tracks to blend in your mix.`,
  },
  {
    q: 'Can you do a rush job?',
    a: 'Yes, for an extra fee. Send your deadline with the track and I’ll tell you what’s possible.',
  },
  {
    q: 'What styles do you play?',
    a: `${GENRE_LIST_SENTENCE}, from singer-songwriter demos to full productions.`,
  },
  {
    q: 'Can you work on multiple songs or a full album?',
    a: 'Yes. I regularly record EPs and full albums and keep tone and feel consistent across the tracks.',
  },
  {
    q: 'Do I own the bass recordings?',
    a: 'Yes. Once the project is paid for, the bass parts are yours to use however you like.',
  },
  {
    q: 'Can we talk before starting?',
    a: `Absolutely. Email me at ${CONTACT_EMAIL} and we’ll set up a call before recording begins.`,
  },
  {
    q: 'How does pricing and payment work?',
    a: 'I’ll quote based on the number of songs and what they need. When you’re happy with the final takes, you’ll get a link to pay securely online.',
  },
  {
    q: 'Is the price per song?',
    a: 'Yes. Every price on this page is per song, and the rate drops as the project grows.',
  },
  {
    q: 'Does upright cost more than electric?',
    a: 'No. Upright and electric are the same price.',
  },
];

export const liveFaqs: Faq[] = [
  {
    q: 'What styles do you play live?',
    a: `${GENRE_LIST_SENTENCE}. I adapt quickly to different bands.`,
  },
  {
    q: 'Do you travel for gigs?',
    a: 'Yes. I’m available for out-of-town shows, tours, and festivals.',
  },
  {
    q: 'Can you fill in last minute?',
    a: 'Often, yes. Get in touch as soon as you know.',
  },
  {
    q: 'Can you read charts or play by ear?',
    a: 'Both. Send charts, lead sheets, or recordings, whatever you have.',
  },
  {
    q: 'Can you provide a full band?',
    a: 'Yes. I can recommend and coordinate other pro musicians.',
  },
  {
    q: 'What gear do you bring?',
    a: 'Pro basses and amps for any venue. Let me know about any backline needs.',
  },
  {
    q: 'How do rehearsals work?',
    a: 'We schedule them as the material needs, in person or online. I come prepared, so the time goes further.',
  },
  {
    q: 'How is payment handled?',
    a: 'After the gig, by cash, check, or secure online payment.',
  },
  {
    q: 'Do you play upright and electric bass?',
    a: 'Yes, both. Let me know which you’d prefer.',
  },
  {
    q: 'Do you sing backing vocals?',
    a: 'No, I only play bass, so plan vocals around the rest of the band.',
  },
  {
    q: 'What do you wear?',
    a: 'Whatever suits the gig. For weddings and formal events, a suit.',
  },
  {
    q: 'Can you help with song selection or arrangements?',
    a: 'Yes. I’m happy to help with setlists, arrangements, and musical direction.',
  },
  {
    q: 'Do you play private/corporate events?',
    a: 'Yes, I regularly play weddings, private parties, and corporate events.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'The sooner the better, though I can sometimes fit in last-minute requests.',
  },
];

/** Steps shown on /book-session. */
export const sessionSteps = [
  {
    title: 'Send your track',
    copy: "Send a rough mix or demo with the tempo and any notes on style, tone, or feel. References or a guide bass line help but aren't required.",
  },
  {
    title: 'We agree on the details',
    copy: "I'll reply with a plan and a quote. Not sure what the bass should do? I'll suggest a few directions.",
  },
  {
    title: 'I record your bass',
    copy: `I record ${TAKES_PER_TRACK} takes, each with a different approach, so you have options.`,
  },
  {
    title: 'You request changes',
    copy: `${REVISION_ROUNDS.charAt(0).toUpperCase() + REVISION_ROUNDS.slice(1)} rounds of revisions are included to adjust the part, tone, or feel.`,
  },
  {
    title: 'You get the files',
    copy: 'Mix-ready stems arrive with a payment link. Once paid, the recordings are yours to use however you like.',
  },
];

/** Steps shown on /book-live-gig. */
export const liveSteps = [
  {
    title: 'Send the details',
    copy: 'Date, location, set length, and style of music, plus whether you want upright, electric, or both.',
  },
  {
    title: 'I confirm and quote',
    copy: "I'll check the date and come back with availability and a rate.",
  },
  {
    title: 'Share the material',
    copy: 'Setlist, charts, lead sheets, or recordings, whatever you have. We’ll add rehearsals if the material needs them.',
  },
  {
    title: 'I show up ready',
    copy: 'Parts learned, gear loaded, and on time.',
  },
];
