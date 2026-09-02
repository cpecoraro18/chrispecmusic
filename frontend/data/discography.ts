/**
 * Records Chris has played on, shown on /portfolio.
 *
 * Every album needs an entry for each streaming platform. Where a release is
 * not on a platform yet, use PLATFORM_PENDING rather than omitting the key —
 * the UI renders it as a disabled "Coming Soon" row, which reads better than a
 * silently missing option.
 */
import type { Credited } from './credits';

export const PLATFORM_PENDING = '#';

export interface Platform {
  name: string;
  /** Path under public/ to the platform's logo. */
  icon: string;
}

export const platforms: Platform[] = [
  { name: 'Spotify', icon: '/img/spotify-logo.svg' },
  { name: 'Apple Music', icon: '/img/apple-music-logo.svg' },
  { name: 'YouTube', icon: '/img/youtube-logo.webp' },
];

export interface Album extends Credited {
  name: string;
  artist: string;
  /** Path under public/ to the cover art. */
  image: string;
  year: string;
  /** Keyed by Platform['name']; PLATFORM_PENDING when not yet released there. */
  links: Record<string, string>;
}

export const discography: Album[] = [
  {
    name: 'Hold On',
    artist: 'Sean McKee Band',
    image: '/img/albums/HoldOn.webp',
    year: '2026',
    credits: ['Bass', 'Mix'],
    links: {
      'Spotify': 'https://open.spotify.com/track/05bRigqg2ZbDJOMlpR2DBv?si=b00825da317f473d',
      'Apple Music': 'https://music.apple.com/us/album/hold-on-single/6805040734',
      'YouTube': 'https://www.youtube.com/watch?v=4w4s5Zdy1HM&list=RD4w4s5Zdy1HM&start_radio=1',
    },
  },
  {
    name: 'Away From Home',
    artist: 'Tyler Nail',
    image: '/img/albums/AwayFromHome.webp',
    year: '2026',
    links: {
      'Spotify': 'https://open.spotify.com/album/6VBeFatAq2wbVIIsZeUel5?si=utBLKbghT8uzZ7DPt_MSJw',
      'Apple Music': 'https://music.apple.com/us/album/away-from-home-single/6772517971',
      'YouTube': 'https://www.youtube.com/watch?v=SC5xW3KlPjs',
    },
  },
  {
    name: 'Western Wind',
    artist: 'Tyler Nail',
    image: '/img/albums/WesternWind.webp',
    year: '2026',
    links: {
      'Spotify': 'https://open.spotify.com/album/4UOuTJ4ftjJGCYHA5WUcTy?si=M9CSRVTbSmGCOzUWm-mCLw',
      'Apple Music': 'https://music.apple.com/us/album/western-wind-single/6774884289',
      'YouTube': 'https://www.youtube.com/watch?v=vvDXg4DkO0A',
    },
  },
  {
    name: 'Blades and Bullets',
    artist: 'Tyler Nail',
    image: '/img/albums/BladesandBullets.webp',
    year: '2026',
    links: {
      'Spotify': 'https://open.spotify.com/album/2Y3E1IBYxaMLrT14dZCobN?si=fzY5enVITxeg8ULQr5Ld9w',
      'Apple Music': 'https://music.apple.com/us/album/blades-and-bullets-single/1882020234',
      'YouTube': 'https://www.youtube.com/watch?v=BKUFS1E5WuA&list=RDBKUFS1E5WuA&start_radio=1',
    },
  },
  {
    name: 'Haunted Houses',
    artist: 'Tyler Nail',
    image: '/img/albums/HauntedHouses.webp',
    year: '2025',
    links: {
      'Spotify': 'https://open.spotify.com/track/27bVwMOxai0M5oGX7GfGLb?si=4e45518e92534d58',
      'Apple Music': 'https://music.apple.com/us/album/haunted-houses-single/1846783765',
      'YouTube': 'https://www.youtube.com/watch?v=cj9yoAB-8vc&list=RDcj9yoAB-8vc&start_radio=1',
    },
  },
  {
    name: 'Family Pt. 2',
    artist: 'Tyler Nail',
    image: '/img/albums/FamilyPt2.webp',
    year: '2025',
    links: {
      'Spotify': 'https://open.spotify.com/album/5Kg1EusZf3DbtTxqcdL6on?si=Dru1ZG5PSsGXv27v04_biA',
      'Apple Music': 'https://music.apple.com/us/album/family-pt-2-single/1788765824',
      'YouTube': 'https://www.youtube.com/watch?v=73sHQNnWxX8&list=OLAK5uy_l_XeJ7DGSKq-YWPIgi1z_laLpDoFosHVI',
    },
  },
  {
    name: 'Family Pt. 1',
    artist: 'Tyler Nail',
    image: '/img/albums/Family.webp',
    year: '2025',
    links: {
      'Spotify': 'https://open.spotify.com/album/087F8TL4iU2i9R6M9kQLRk?si=chERu7rITpaeAfBMro1tNw',
      'Apple Music': 'https://music.apple.com/us/album/family-pt-1-single/1788141490',
      'YouTube': 'https://www.youtube.com/watch?v=BLvS-tL1hPE&list=OLAK5uy_kkQuCtZX-gQZfwK-4XmUq-sl7VqkcDR_M',
    },
  },
  {
    name: 'Advent of the Symphonina: Spreading the Joy of Symphonic Music to Young Audiences Around the World',
    artist: 'The 2024 International Symphonina Orchestra',
    image: '/img/albums/AdventoftheSymphonina.webp',
    year: '2024',
    links: {
      'Spotify': 'https://open.spotify.com/album/6qyRRoHPScyfYQcoqSkQnH?si=YpAMZ2SbQo6JBGbPr3L8Zg&nd=1&dlsi=cb332c81c38042c9',
      'Apple Music': 'https://music.apple.com/us/album/advent-of-the-symphonina-spreading-the-joy/1752538603',
      'YouTube': PLATFORM_PENDING,
    },
  },
  {
    name: 'In This Life',
    artist: 'Sean McKee Band',
    image: '/img/albums/InThisLife.webp',
    year: '2023',
    links: {
      'Spotify': 'https://open.spotify.com/album/0X0u012zBrFq1537i174tL?si=Ne2uSNhVRxCpsnXgcaFbrQ',
      'Apple Music': 'https://music.apple.com/us/album/in-this-life-ep/1724110519',
      'YouTube': 'https://www.youtube.com/watch?v=v3QdME_ZCkQ&list=OLAK5uy_mx-fdqkQbdbJRGyz9epJcCEFIuEQlNWbM',
    },
  },
  {
    name: 'So Long My Queen',
    artist: 'Sean McKee Band',
    image: '/img/albums/SoLongMyQueen.webp',
    year: '2022',
    // An EP, so the mix credit names its track rather than claiming the record.
    credits: ['Bass', { role: 'Mix', track: 'So Long My Queen' }],
    links: {
      'Spotify': 'https://open.spotify.com/album/0khwm9sod28mcfP46kTtLe?si=NG2pyAYARjC_jGA6XkXizA',
      'Apple Music': 'https://music.apple.com/us/album/so-long-my-queen-ep/1606473575',
      'YouTube': 'https://www.youtube.com/watch?v=xjNzCIJnm7I&list=OLAK5uy_nMsFgpzWSVpTnYerATa-dUNL662FaYMTI',
    },
  },
  {
    name: 'Poison Ivy',
    artist: 'Sean McKee Band',
    image: '/img/albums/PoisonIvy.webp',
    year: '2021',
    links: {
      'Spotify': 'https://open.spotify.com/album/5xNhmtFlAey1zwkky6c5b0?si=l2mWBcGSRE6v1WA2Eu2n6A',
      'Apple Music': 'https://music.apple.com/us/album/poison-ivy-single/1588077087',
      'YouTube': 'https://www.youtube.com/watch?v=_sUEwDyL70w&list=OLAK5uy_lflNt4oOsohmcl1CtF97Z1PZPDT1e7dHo',
    },
  },
];
