import { TAKES_PER_TRACK } from './service';

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
    a: 'Songwriters, producers, bands, and artists who want professional bass recorded remotely without booking studio time.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A rough mix or demo of your track (WAV, MP3, etc.), tempo (BPM) is helpful, and any notes on style, tone, or feel you want.',
  },
  {
    q: 'What if I don’t know exactly what bass line I want?',
    a: 'That’s completely fine. Many projects start with only a rough idea. I’ll create musical bass parts that support your song and give you options to choose from.',
  },
  {
    q: 'What happens if the first take isn’t quite right?',
    a: 'Revisions are included. I’ll adjust the part, tone, or feel until it fits your track.',
  },
  {
    q: 'What styles do you play?',
    a: 'Jazz, soul, folk, rock, pop, and singer-songwriter projects.',
  },
  {
    q: 'Can you work on multiple songs or a full album?',
    a: 'Yes. I regularly work on EPs and full albums, and I can keep tones and feel consistent across all tracks.',
  },
  {
    q: 'Do I own the bass recordings?',
    a: 'Yes. Once the project is complete and paid for, you own the recorded bass parts and can use them however you like.',
  },
  {
    q: 'Can we talk before starting?',
    a: 'Absolutely. You can schedule a call to talk through your project, goals, and any questions before recording begins.',
  },
  {
    q: 'How does pricing and payment work?',
    a: 'I’ll provide a quote based on your project size and requirements. Once you approve, you’ll receive a payment link and can pay securely online. Payment is only requested after you’re happy with the final recordings.',
  },
];

export const liveFaqs: Faq[] = [
  {
    q: 'What styles do you play live?',
    a: 'Jazz, rock, pop, soul, funk, folk, blues, and more. I adapt quickly to different genres and band settings.',
  },
  {
    q: 'Do you travel for gigs?',
    a: 'Yes! I’m available for out-of-town shows, tours, and festivals.',
  },
  {
    q: 'Can you fill in last minute?',
    a: 'Often, yes. Contact me ASAP for availability.',
  },
  {
    q: 'Can you read charts or play by ear?',
    a: 'Yes, I’m comfortable with both. Send charts, lead sheets, or recordings, whatever you have.',
  },
  {
    q: 'Can you provide a full band?',
    a: 'I can recommend and coordinate with other pro musicians if you need a full group.',
  },
  {
    q: 'What gear do you bring?',
    a: 'I bring pro-level basses and amps suitable for any venue. Let me know if you have specific backline needs.',
  },
  {
    q: 'How do rehearsals work?',
    a: 'We’ll schedule rehearsals as needed, either in person or virtually. I’ll come prepared so we use time efficiently.',
  },
  {
    q: 'How is payment handled?',
    a: 'Payment is due after the gig, via cash, check, or secure online payment.',
  },
  {
    q: 'Do you play upright and electric bass?',
    a: 'Yes, I play both upright and electric bass. Let me know your preference for your event.',
  },
  {
    q: 'Can you help with song selection or arrangements?',
    a: 'Absolutely! I’m happy to help with setlist planning, arrangements, and musical direction if needed.',
  },
  {
    q: 'Do you play private/corporate events?',
    a: 'Yes, I regularly play weddings, private parties, and corporate events.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'The sooner the better, but I can sometimes accommodate last-minute requests.',
  },
];

/** Steps shown on /book-session. */
export const sessionSteps = [
  {
    title: 'Send your track',
    copy: 'Send a rough mix or demo, along with the tempo and any notes on style, tone, or feel. References or a rough guide bass line help, but they are not required.',
  },
  {
    title: 'We agree on the details',
    copy: "I'll come back with a plan and a quote. If you're not sure what you want the bass to do, I'm happy to suggest a few directions.",
  },
  {
    title: 'I record your bass',
    copy: `I cut ${TAKES_PER_TRACK} takes with different approaches so you have options, recorded and edited in my studio.`,
  },
  {
    title: 'You request changes',
    copy: "Revisions are included, so I'll adjust the part, tone, or feel until it fits the song.",
  },
  {
    title: 'You get the files',
    copy: 'Mix-ready stems land in your inbox with a payment link. Once the project is paid, the recordings are yours to use however you like.',
  },
];

/** Steps shown on /book-live-gig. */
export const liveSteps = [
  {
    title: 'Send the details',
    copy: 'Date, location, set length, and the kind of music. Let me know whether you want upright, electric, or both.',
  },
  {
    title: 'I confirm and quote',
    copy: "I'll check the date and come back with availability and a rate for the booking.",
  },
  {
    title: 'Share the material',
    copy: 'Send whatever you have: setlist, charts, lead sheets, or recordings. We can add rehearsals if the material calls for it.',
  },
  {
    title: 'I show up ready',
    copy: 'Parts learned, gear loaded, and on time.',
  },
];
