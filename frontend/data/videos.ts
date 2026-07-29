/**
 * Live footage shown on /portfolio.
 *
 * Stored as bare YouTube IDs rather than embed URLs: YouTubeEmbed derives both
 * the thumbnail and the player URL from the ID. To add one, copy the eleven
 * characters after `v=` or `youtu.be/` — not the whole share URL, whose `?si=`
 * token is a tracking parameter that does nothing here.
 */
export interface Video {
  /** YouTube video ID, e.g. 'dQw4w9WgXcQ'. Not a URL. */
  id: string;
  title: string;
  /** Free-form; the /portfolio filter builds its pills from whatever appears. */
  genre: string;
}

export const videos: Video[] = [
  // --- Pop ---
  { title: "Alright Maybes - Come and Get Your Love", id: "-1akA4BaSkc", genre: "Pop" },
  { title: "Alright Maybes - Red Wine Supernova Cover", id: "A5KX41GrZsc", genre: "Pop" },
  { title: "Alright Maybes - Ain't It Fun Cover", id: "UevnkOhMo2o", genre: "Pop" },

  // --- Rock ---
  { title: "Alright Maybes - Misery Business Cover", id: "NJOk4imcY50", genre: "Rock" },
  { title: "Alright Maybes - Paradise City Cover", id: "I_nMxVfUFpM", genre: "Rock" },
  { title: "Sean's Guitar Lounge Ft. Sophie Hafer - Got to Get Better in a Little While Cover", id: "OFJ75eQKOlc", genre: "Rock" },
  { title: "Sean McKee Band - Got to Get Better in a Little While Cover", id: "53Vx75OUEQw", genre: "Rock" },
  { title: "Sean McKee Band - Ain't Talkin' About Love", id: "h2jR9AGe0yI", genre: "Rock" },
  { title: "Sean McKee Band - Live at Madcats - Fragile", id: "5e3GEKrsUnc", genre: "Rock" },
  { title: "Sean McKee Band - Poison Ivy", id: "_sUEwDyL70w", genre: "Rock" },
  { title: "Sean McKee Band - Color Outside the Lines", id: "xjNzCIJnm7I", genre: "Rock" },
  { title: "Sean McKee Band - Monster - Live at Madcats", id: "u-lH9EmIN_o", genre: "Rock" },

  // --- Blues ---
  { title: "Sean's Guitar Lounge Ft. Brandon Simmons - Sweet Little Angel Cover", id: "4dWC3QAfFyY", genre: "Blues" },
  { title: "Sean's Guitar Lounge - Suburban Glory Cover", id: "8d3lh_wB8Zk", genre: "Blues" },
  { title: "Sean's Guitar Lounge - I Wouldn't Treat a Dog Cover", id: "8VqFfWw5Roo", genre: "Blues" },

  // --- Jazz ---
  { title: "University of Minnesota Jazz Ensemble I - 2019 Spring Concert", id: "VwqKnToOPik", genre: "Jazz" },
  { title: "2018 University of Minnesota Jazz Festival - Jazz Ensemble 1", id: "pZdC1mELkto", genre: "Jazz" },
  { title: "University of Minnesota Jazz Festival 2018 - 12:20 Jazz Combo", id: "AQ_slt8-i5o", genre: "Jazz" },
];
