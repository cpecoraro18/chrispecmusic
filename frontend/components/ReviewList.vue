<template>
  <div class="container-fluid py-3 bg-light review-container">
    <div id="reviewCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="10000">
      <div class="carousel-inner px-5">
        <div
          class="carousel-item"
          :class="{ active: index === 0 }"
          v-for="(chunk, index) in chunkedReviews"
          :key="index"
        >
          <div class="row">
            <div class="col-md-4" v-for="review in chunk" :key="review.name">
              <div class="text-center p-3 review-item">
                <p class="mb-2 review-text">"{{ review.review }}"</p>
                <small class="fst-italic review-author">
                  - <a href="https://www.fiverr.com/cpecoraro18" target="_blank">{{ review.name }}</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviews: [
        {
          "name": "davidalmroth",
          "country": "Sweden",
          "rating": 5,
          "review": "Very good. Tasty playing and very easy to communicate with. Got my idea just right! Will order from this seller next time I need a bass line to make my song sound even better. Look no further if you need a professional bass player for a good price.",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "tylernail",
          "country": "United States",
          "rating": 5,
          "review": "Chris worked on multiple tracks for me and did a perfect job on every single one. I hope we work together again. He was easy to work with, professional, and creative.",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "alfonsfonsal",
          "country": "Germany",
          "rating": 5,
          "review": "Working with Chris is a true blessing! Not only did he deliver in less than 24 hours, he also delivered two different iterations of the product. We were satisfied with both versions, so there was no need of a revision. 10/10!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "larasilv12",
          "country": "United States",
          "rating": 5,
          "review": "Fantastic! This is my second time working with Chris and he never fails to deliver. Perfect sound, perfect delivery and excellent musicianship.",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "leathaber",
          "country": "Israel",
          "rating": 5,
          "review": "Chris P is amazing!!!! Very talented and so nice!!!! I will definitely work with him again!!!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "matty_trav",
          "country": "United States",
          "rating": 5,
          "review": "Quick work and it sounds solid. Thank you for the assist on these tracks!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "jnw1994",
          "country": "United Kingdom",
          "rating": 5,
          "review": "Beautiful work!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "alittlewhile",
          "country": "United Kingdom",
          "rating": 5,
          "review": "Great playing yet again.",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "anthony258",
          "country": "United States",
          "rating": 5,
          "review": "Perfect! Did exactly what I needed!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "gatanmaire",
          "country": "France",
          "rating": 5,
          "review": "Excellent collaboration and very good performance. Deadlines were met. Thank you very much!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "joseph_munday",
          "country": "United Kingdom",
          "rating": 5,
          "review": "Pleasure working with Chris - quick turnaround and great player!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "loney_aroma",
          "country": "Australia",
          "rating": 5,
          "review": "100% satisfied with this bass player! Absolutely brilliant sounds, technique, and production quality. If you need some catchy or jazzy bass, look no further honestly! You won't be disappointed and the end result hits harder than expected! Thank you again and again!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "wadleyworld",
          "country": "United States",
          "rating": 5,
          "review": "Wow, blown away by how tight he is... well done man! Delivered two songs flawlessly, no notes or revisions needed. Will utilize his talent in the future. Highly recommended!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "davidmusic2018",
          "country": "United States",
          "rating": 5,
          "review": "It was a pleasure working with Chris. His recordings and performances were excellent and made my job as audio engineer much easier than it could have been. In my case, it was symphonic/orchestral music and I was able to quickly place Chris' work in the mix. Looking forward to working together again!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "sambadkat",
          "country": "United States",
          "rating": 5,
          "review": "Great work, Chris. The bassline was very high quality both musically and sound quality wise, did not need any further processing whatsoever. Look forward to working with you more in the future!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "oldmanlion",
          "country": "United Kingdom",
          "rating": 5,
          "review": "Chris P came up with two alternative bass tracks for my song, both in raw and mixed form. Met the brief perfectly. Response time and turnaround time were both amazingly fast. Totally professional job, and unquestionable value for money. Would certainly come back again.",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "jk6strings",
          "country": "United States",
          "rating": 5,
          "review": "Chris provided two options for my song, both of which were excellent, and I can't decide which I like more! Also, very prompt delivery. Highly recommend!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "abelyss",
          "country": "United Kingdom",
          "rating": 5,
          "review": "Chris has been an outstanding addition to our team, bringing not only technical skill on the bass but also sensitivity to the emotional core of our music. His lines are tasteful, supportive, and full of nuance, enhancing the depth of each piece without ever overwhelming the arrangement. Beyond his musicality, Chris has been reliable, collaborative, and open to ideas — a true professional who elevates the creative process.",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "abelyss",
          "country": "United Kingdom",
          "rating": 4.7,
          "review": "Chris was professional, responsive, and deeply musical. His performance brought great tone and sensitivity to the piece, and he handled everything with care and creativity. A pleasure to work with — highly recommended.",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "joshuahamm",
          "country": "United States",
          "rating": 5,
          "review": "Delivered precisely what I asked for and expected in a very timely manner! Sound quality is professional, and he is skilled enough to make the piece his own as well. Highly recommend!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "giovanniseba170",
          "country": "Austria",
          "rating": 5,
          "review": "Great work within 1 day. :-)",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "jusufwinardi",
          "country": "Indonesia",
          "rating": 4.3,
          "review": "Super quick response and delivery. It was less than a day. Loving the sound of the bass and the playing. Made my vision of the production manifested. Definitely going back for my contra bass projects.",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "harold_g",
          "country": "Japan",
          "rating": 5,
          "review": "Thank you for the great bass track, which was perfect for the song!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          "name": "kedaman1337",
          "country": "Sweden",
          "rating": 5,
          "review": "Amazing job!",
          "link": "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "justinrayna",
          country: "United States",
          rating: 5,
          review: "Excellent contrabass player, friendly and professional, worked with me to deliver precisely what I needed!",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "tonycohen2000",
          country: "United States",
          rating: 5,
          review: "Chris did the job perfectly, in a timely manner, with wonderful quality of sound and awesome result. Highly recommended! :)",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "franciskabango",
          country: "United States",
          rating: 5,
          review: "Good result, talented musician.",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "loops4producers",
          country: "United States",
          rating: 5,
          review: "Great work and quality",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "pablomg89",
          country: "Mexico",
          rating: 4.3,
          review: "chris delivered 2 takes which was super useful. really loved the tone of the bass, it was super solid and clean. i think it really helps the song and overall im very pleased with the result. can recommend for sure.",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "chrisdoran1984",
          country: "United Kingdom",
          rating: 5,
          review: "Great player, knew exactly what I needed and delivered with no fuss",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "kiowaearth123",
          country: "United Kingdom",
          rating: 5,
          review: "Another professional bassline from mr bass man, highly recommend",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "holgarjacobsen",
          country: "Faroe Islands",
          rating: 5,
          review: "Very nice to work with Cris looking forward another time",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "leoralala",
          country: "Israel",
          rating: 5,
          review: "working with Chris was very good. he played by ear the written part and also made another take of him improvising on the take. the sound quality was good and his playing was on point. he worked with me until i was 100% ready, and any revision i asked for doing small fixes was very easy in communication and he was glad to provide it for me.",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "adam_glen",
          country: "United Kingdom",
          rating: 5,
          review: "Just listened mate, over the moon really. Finally got my track sounding how I visioned it. Thanks so much man!",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "kbarchitek",
          country: "United States",
          rating: 5,
          review: "I'm not sure what he did, but I love it! definitely something I can build on",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "jagosto089",
          country: "United States",
          rating: 5,
          review: "Chris is an exceptional artist who has truly elevated my work. He is a master at the base and has a remarkable ability to bring my projects to life. I am incredibly grateful for artists like him who are always willing to collaborate and contribute their talents to my endeavors. I not only trust him as a collaborator but also as a friend.",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "raindance_de",
          country: "Germany",
          rating: 5,
          review: "Absolutely outstanding work! We hired Chris to record a double bass track for our band and the result completely blew us away. The tone, groove and musical sensitivity were perfect — exactly what the song needed. Communication was quick and friendly, the delivery was right on time, and the performance was flawless.",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "cvan_kan",
          country: "Israel",
          rating: 5,
          review: "Great work :)",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "one_d_hundred",
          country: "Morocco",
          rating: 5,
          review: "Chris est d'une efficacité et d'une rapidité incroyable, j'ai commandé la veille pour recevoir son travail d'une grande qualité le lendemain, un grand merci à lui :-)",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "gluiu86",
          country: "Italy",
          rating: 5,
          review: "Thank you for your help! It was a pleasure working with you and I'm looking forward to working with you more in the future.",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "theimprovingmus",
          country: "United States",
          rating: 5,
          review: "Chris did a great job recording upright bass for a project of mine! His tone and intonation were excellent, and his style was right on for the genre of the song. I would recommend him, and will certainly be using him again.",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "mauxtumb",
          country: "Germany",
          rating: 4,
          review: "Working with Chris was a fantastic experience! He responded quickly and professionally, and the upright bass tracks he recorded for my project added so much depth and soul. I sent him my audio and MIDI files, and in no time, he delivered exactly what I was looking for. The collaboration was smooth, and I highly recommend him.",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "kangaroocrucifx",
          country: "United States",
          rating: 5,
          review: "Chris made my track come to life. Tasteful and present, warm and smooth. He was quick to respond and quick to deliver, and I'd gladly work with him again. Thanks again and I'll be back for more!",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "smoochyface",
          country: "United States",
          rating: 5,
          review: "Absolutely nailed it. Thanks so much!",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "richopportunity",
          country: "United States",
          rating: 5,
          review: "Great bassist! Provided tracks that work very well with the mix! Interpreted things perfectly!",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "davidebiale",
          country: "Italy",
          rating: 5,
          review: "Epic work!",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "c_arthur_adams",
          country: "United Kingdom",
          rating: 5,
          review: "Wonderful playing, great communication. Look no further !",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "eivindroysland",
          country: "Norway",
          rating: 4.7,
          review: "Really good sounding bass that adds a lot of character to the mix. Nice working with Chris!",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "miketackett285",
          country: "United States",
          rating: 5,
          review: "Played exactly what I wanted",
          link: "https://www.fiverr.com/cpecoraro18"
        },
        {
          name: "lousaskatoon",
          country: "United States",
          rating: 5,
          review: "Efficient and impressive.",
          link: "https://www.fiverr.com/cpecoraro18"
        }
      ]
    };
  },
  computed: {
    chunkedReviews() {
      const chunkSize = 3;
      const sorted = [...this.reviews].sort((a, b) => b.review.length - a.review.length);
  
      // Split into thirds
      const third = Math.ceil(sorted.length / 3);
      const long = sorted.slice(0, third);
      const medium = sorted.slice(third, 2 * third);
      const short = sorted.slice(2 * third);
  
      // Interleave: [long, medium, short, long, medium, short, ...]
      const interleaved = [];
      for (let i = 0; i < third; i++) {
        if (medium[i]) interleaved.push(medium[i]);
        if (long[i]) interleaved.push(long[i]);
        if (short[i]) interleaved.push(short[i]);
      }
  
      // Chunk into groups of 3
      const chunks = [];
      for (let i = 0; i < interleaved.length; i += chunkSize) {
        chunks.push(interleaved.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
};
</script>

<style scoped>
.review-container {
  min-height: 15em; /* 200px / 16 */
}

.review-item {
  background-color: var(--bg-grey);
  border-radius: 0.625em; /* 10px / 16 */
  padding: 1.25em; /* 20px / 16 */
  margin: 0.3125em; /* 5px / 16 */
}

.review-text {
  font-size: 1rem;
  color: var(--text-color-dark)
}

.review-author {
  color: var(--bg-dark-blue);
}

.review-author a {
  color: inherit;
}

.review-author a:hover {
  text-decoration: underline;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1);
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%; /* 5% of 16px */
}

.carousel-item {
  color: var(--text-color-dark);
}

@media only screen and (max-width: 991px) {
  .review-container {
    min-height: 40em; /* 200px / 16 */
  }
}
</style>
