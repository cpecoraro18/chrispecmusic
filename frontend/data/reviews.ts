/**
 * Client reviews, pulled from Chris's Fiverr history.
 *
 * IMPORTANT: this is a hand-picked selection of positive reviews, NOT a
 * complete record of every review received. Do not derive aggregate statistics
 * from it — review counts, average ratings, "clients in N countries" — and
 * present them as site-wide numbers. They would read as population statistics
 * while actually describing a curated sample, which is misleading and would not
 * survive a prospect cross-checking the Fiverr profile.
 *
 * Individual quotes are fine: a testimonial is understood to be selected.
 * Aggregates are not. Reviewer names link to FIVERR_PROFILE so visitors can
 * verify the source directly.
 */
export const FIVERR_PROFILE = "https://www.fiverr.com/cpecoraro18";

export interface Review {
  /** The reviewer's Fiverr username. Not unique: one client can leave several. */
  name: string;
  review: string;
}

export const reviews: Review[] = [
  {
    name: "trumanberic",
    review: "Chris is a true professional with an innate talent for pinpointing exactly what your song needs. His work is outstanding—complex or simple (if needed) and highly effective, delivering grooves as smooth as honey. He has an exceptional ability to understand your vision and bring it to life.",
  },
  {
    name: "davidmusic2018",
    review: "It was a pleasure working with Chris. His recordings and performances were excellent and made my job as audio engineer much easier than it could have been. I was able to quickly place Chris' work in the mix. Looking forward to working together again!",
  },
  {
    name: "kangaroocrucifx",
    review: "Chris brought my tune to life! He provided two tracks, one that was the part that I gave him and one that was his own interpretation, and it came out wonderfully—I used his take almost entirely! Thanks Chris for the excellent and tasteful musicianship.",
  },
  {
    name: "raindance_de",
    review: "Absolutely outstanding work! We hired Chris to record a double bass track for our band and the result completely blew us away. The tone, groove and musical sensitivity were perfect—exactly what the song needed.",
  },
  {
    name: "markuschang",
    review: "Chris is an incredible bass player. He turned the project around in under twenty four hours, nailed every detail, and delivered a flawless performance. Super professional throughout the whole process.",
  },
  {
    name: "tylernail",
    review: "Chris worked on multiple tracks for me and did a perfect job on every single one. I hope we work together again. He was easy to work with, professional, and creative.",
  },
];
