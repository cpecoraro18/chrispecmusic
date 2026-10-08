/**
 * The instruments and equipment listed on /gear.
 *
 * `type` decides which section of that page an item appears in; the sections
 * are listed in GEAR_SECTIONS in pages/gear.vue. A new type needs adding there,
 * or its items won't show.
 */
export interface GearItem {
  name: string;
  /** Category, e.g. 'Bass', 'DI', 'Pedal'. Picks the /gear section. */
  type: string;
  /** Path under public/, e.g. '/img/gear/Fender-P-Bass.webp'. */
  image: string;
  description: string;
  /**
   * A tall photo, like the upright. On /gear it gets a card two rows tall
   * instead of a wide one, which would shrink it to a sliver.
   */
  portrait?: boolean;
}

// `as const` so GearName below is a union of the literal names rather than
// `string` — that is what lets data/sounds.ts flag a misspelled pedal.
const gearList = [
  { name: 'Lakland 5501', type: 'Bass', image: '/img/gear/Lakland5501.webp', description: 'Upgraded with American Bartolini pickups and a Lakland LH3 preamp. A bright, punchy 5-string that plays smooth and fits any mix.' },
  { name: 'Fender P Bass', type: 'Bass', image: '/img/gear/Fender-P-Bass.webp', description: 'Classic Precision Bass tone with the reliability to match.' },
  { name: 'Fender Jazz Bass', type: 'Bass', image: '/img/gear/Fender-J-Bass.webp', description: 'My first bass, used for everything from jazz gigs to rock covers.' },
  { name: 'Fender JMJ Mustang Bass', type: 'Bass', image: '/img/gear/Fender-JMJ-Mustang-Bass.webp', description: 'Black short-scale Mustang with a single split-coil pickup. Punchy, focused, and a little gritty, great for indie and garage tones.' },
  { name: 'Knilling Bucharest 1308T', type: 'Bass', image: '/img/gear/Knilling-Upright.webp', portrait: true, description: 'Fully carved upright — go-to for jazz sessions and acoustic sets.' },
  { name: 'Markbass Little Mark 3', type: 'Amp', image: '/img/gear/Markbass-Little-Mark-3.webp', description: 'Lightweight, powerful head with a clean, punchy sound.' },
  { name: 'Phil Jones Double 4', type: 'Amp', image: '/img/gear/Phil-Jones-Double-Four.webp', description: 'Small practice amp with a clear, surprisingly big sound.' },
  { name: 'Markbass 4x10', type: 'Cabinet', image: '/img/gear/Markbass-4x10.webp', description: 'Big, punchy lows and clean mids for live shows.' },
  { name: 'Markbass New York 121', type: 'Cabinet', image: '/img/gear/Markbass-NewYork-121.webp', description: 'Compact cab that still brings warmth and punch. I own two for flexible live setups.' },
  { name: 'Radial Tonebone', type: 'DI', image: '/img/gear/Radial-Bassbone-V2.webp', description: 'DI and preamp for fast switching between upright and electric bass.' },
  { name: 'Rupert Neve Designs RNDI', type: 'DI', image: '/img/gear/Rupert-Neve-RNDI.webp', description: 'Transformer-coupled active DI. The direct signal on most of my remote sessions starts here.' },
  { name: 'Origin Effects BassRig Super Vintage', type: 'Pedal', image: '/img/gear/Origin-Effects-BassRig-Super-Vintage.webp', description: 'SVT-style tones with tube-like feel and grit.' },
  { name: 'Origin Effects BassRig Fifteen', type: 'Pedal', image: '/img/gear/Origin-Effects-BassRig-Fifteen.webp', description: 'Ampeg B-15 flip-top preamp tones — warm, round, and a little woolly when pushed. My go-to for vintage-leaning tracks.' },
  { name: 'JHS Colour Box', type: 'Pedal', image: '/img/gear/JHS-ColorBox.webp', description: 'Flexible preamp that goes from clean to driven tones easily.' },
  { name: 'Cali76 Bass Compressor', type: 'Pedal', image: '/img/gear/Cali76-Bass-Compressor.webp', description: 'Smooth, studio-style compression with a touch of vintage vibe.' },
  { name: 'MXR Bass Compressor', type: 'Pedal', image: '/img/gear/MXR-Bass-Compressor.webp', description: 'Clean, transparent compression that keeps your attack intact.' },
  { name: 'MXR Bass Chorus Deluxe', type: 'Pedal', image: '/img/gear/MXR-Bass-Chorus-Deluxe.webp', description: 'Lush stereo chorus with a bass filter that keeps the low end dry and focused.' },
  { name: 'HX Stomp', type: 'Pedal', image: '/img/gear/HX-Stomp.webp', description: 'Compact multi-effects processor with extensive routing options.' },
  { name: 'MXR Octave Deluxe', type: 'Pedal', image: '/img/gear/MXR-Bass-Octave-Delux.webp', description: 'Fat sub-octave sounds that thicken your tone.' },
  { name: 'Electro-Harmonix Pico POG', type: 'Pedal', image: '/img/gear/PicoPog.webp', description: 'Polyphonic octave pedal, great for solos and layering.' },
  { name: 'Aguilar Twin Filter', type: 'Pedal', image: '/img/gear/Aguilar-Filter-Twin.webp', description: 'Dual filter pedal for funky sweeps and vintage textures.' },
  { name: 'Damnation Audio MBD', type: 'Pedal', image: '/img/gear/MBD.webp', description: 'Bass distortion with depth, plus a blend knob to keep the low end intact.' },
  { name: 'Korg Pitchblack Advanced', type: 'Pedal', image: '/img/gear/Kork-Pitchblack-Advanced.webp', description: 'Reliable tuner with true bypass and clear visibility.' },
  { name: 'Pedaltrain Metro 20', type: 'Pedalboard', image: '/img/gear/Pedaltrain-Metro-20.webp', description: 'Compact pedalboard that keeps the essentials tight and tidy.' },
  { name: 'Cioks DC7', type: 'Power Supply', image: '/img/gear/Cioks-DC7.webp', description: 'Quiet, low-profile power supply that handles a full board with ease.' },
  { name: 'Shure SM57', type: 'Microphone', image: '/img/gear/Shure-SM57.webp', description: 'Classic dynamic mic that works anywhere and sounds great.' },
  { name: 'Electro-Voice RE20', type: 'Microphone', image: '/img/gear/EV-RE20.webp', description: 'Versatile dynamic mic, well suited to bass amps and vocals.' },
  { name: 'Audio-Technica AT2038', type: 'Microphone', image: '/img/gear/Audio-Technica-AT2038.webp', description: 'Solid condenser mic for upright bass, vocals, and more.' },
  { name: 'Soyuz 013 FET', type: 'Microphone', image: '/img/gear/Soyuz-013-FET.webp', description: 'High-quality FET microphone with a warm, vintage sound.' },
  { name: 'Audio-Technica AT4041', type: 'Microphone', image: '/img/gear/Audio-Technica-AT4041.webp', description: 'Small-diaphragm condenser with a bright, detailed sound. Great on upright bass.' },
] as const satisfies readonly GearItem[];

export const gear: GearItem[] = [...gearList];

/** Any item on /gear, by exact name. Used to tag clips in data/sounds.ts. */
export type GearName = (typeof gearList)[number]['name'];

/** Just the instruments, for the `bass` field on a clip. */
export type BassName = Extract<(typeof gearList)[number], { type: 'Bass' }>['name'];
