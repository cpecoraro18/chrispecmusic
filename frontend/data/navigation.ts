/**
 * The primary navigation, in the order it appears in the header.
 *
 * Adding a page used to mean hand-editing a block of markup in SiteHeader; it
 * is now a line here. An item with `children` renders as a dropdown.
 */
export interface NavItem {
  label: string;
  /** Route path. Omitted on items that only exist to open a dropdown. */
  to?: string;
  children?: { label: string; to: string }[];
}

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  {
    label: 'Hire Me',
    children: [
      { label: 'Recording Session', to: '/book-session' },
      { label: 'Live Gig', to: '/book-live-gig' },
    ],
  },
  { label: 'Photos', to: '/photos' },
  { label: 'Events', to: '/events' },
  { label: 'Gear', to: '/gear' },
];

/** The single call-to-action pinned to the right of the nav. */
export const navCta = { label: 'Contact', to: '/contact' };
