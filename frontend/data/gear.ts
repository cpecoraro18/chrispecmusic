/**
 * The instruments and equipment listed on /gear.
 *
 * `type` drives the filter on that page: the pills and the mobile select are
 * both derived from the distinct values here, so adding a new category is just
 * a matter of using it.
 */
export interface GearItem {
  name: string;
  /** Category, e.g. 'Bass', 'Pedal'. Drives the /gear filter. */
  type: string;
  /** Path under public/, e.g. '/img/gear/Fender-P-Bass.webp'. */
  image: string;
  description: string;
}

export const gear: GearItem[] = [
  { name: 'Lakland 5501', type: 'Bass', image: '/img/gear/Lakland5501.webp', description: 'Upgraded with Bartolini pickups and a Lakland LH3 preamp. A bright, punchy 5-string that plays smooth and fits any mix.' },
  { name: 'Fender P Bass', type: 'Bass', image: '/img/gear/Fender-P-Bass.webp', description: 'Classic Precision Bass tone with the reliability to match.' },
  { name: 'Fender Jazz Bass', type: 'Bass', image: '/img/gear/Fender-J-Bass.webp', description: 'My first bass, used for everything from jazz gigs to rock covers.' },
  { name: 'Knilling Bucharest 1308T', type: 'Bass', image: '/img/gear/Knilling-Upright.webp', description: 'Go-to upright for jazz sessions and acoustic sets.' },
  { name: 'Markbass Little Mark 3', type: 'Amp', image: '/img/gear/Markbass-Little-Mark-3.webp', description: 'Lightweight, powerful head with a clean, punchy sound.' },
  { name: 'Phil Jones Double 4', type: 'Amp', image: '/img/gear/Phil-Jones-Double-Four.webp', description: 'Small practice amp with a clear, surprisingly big sound.' },
  { name: 'Markbass 4x10', type: 'Cabinet', image: '/img/gear/Markbass-4x10.webp', description: 'Big, punchy lows and clean mids for live shows.' },
  { name: 'Markbass New York 121', type: 'Cabinet', image: '/img/gear/Markbass-NewYork-121.webp', description: 'Compact cab that still brings warmth and punch. I own two for flexible live setups.' },
  { name: 'Radial Tonebone', type: 'Pedal', image: '/img/gear/Radial-Bassbone-V2.webp', description: 'DI and preamp for fast switching between upright and electric bass.' },
  { name: 'Origin Effects BassRig Super Vintage', type: 'Pedal', image: '/img/gear/Origin-Effects-BassRig-Super-Vintage.webp', description: 'SVT-style tones with tube-like feel and grit.' },
  { name: 'JHS Colour Box', type: 'Pedal', image: '/img/gear/JHS-ColorBox.webp', description: 'Flexible preamp that goes from clean to driven tones easily.' },
  { name: 'Cali76 Bass Compressor', type: 'Pedal', image: '/img/gear/Cali76-Bass-Compressor.webp', description: 'Smooth, studio-style compression with a touch of vintage vibe.' },
  { name: 'MXR Bass Compressor', type: 'Pedal', image: '/img/gear/MXR-Bass-Compressor.webp', description: 'Clean, transparent compression that keeps your attack intact.' },
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
];
