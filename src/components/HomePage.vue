<template>
  <div>
    <div class="hero-image">
      <div class="hero-text">
        <h1>Chris Pecoraro</h1>
        <p>Professional Bass Player</p>
        <button class="btn btn-primary" v-on:click="contact">Contact Me</button>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row pb-5">
        <div class="col-lg-8 mx-auto">
          <p class="lead">Welcome to my site! My name is Chris Pecoraro, a professional session bassist in Chicago, with over 10 years of experience playing bass for a variety of musical projects. If you are a music producer, recording studio, or artist seeking a versatile session player to bring depth an groove to your music, you've come to the right place!</p>
          <p class="lead">I specialize in a broad range of styles, from rock, jazz, funk, and blues to pop and R&B. My adaptable approach ensures that my bass lines blend seamlessly into your tracks, adding the perfect rhythm and texture to elevate your music.</p>
          <p class="lead">I offer both in-studio and remote recording services, making it easy for you to collaborate with me whether you're in Chicago or working from anywhere else in the world. My professional home studio is equipped with top-of-the-line audio equipment, ensuring high-quality bass recordings for your projects.</p>
          <p class="lead">Explore my portfolio to hear examples of my bass work, and don't hesitate to contact me for rates and availability. Let's create amazing music together!</p>

          <button class="btn btn-primary mt-3" v-on:click="contact">Contact Me</button>
        </div>
      </div>
    </div>

    <div class="container-fluid mt-5 bg-light text-dark">
      <div class="container py-5">
        <div class="row">
          <h2 class="mx-auto mb-5">Discography</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 album" v-for="album in discography" :key="album.name">
            <a :href="album.link" target="_blank">
              <img :src="album.image" :alt="album.name" class="img-fluid album-image">
              <p>{{ album.name }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-3">
      <div class="row">
        <h2 class="mx-auto my-5">Reviews</h2>
      </div>
      <div class="row">
        <div class="col-lg-8 mx-auto my-2" v-for="review in reviews" :key="review.name">
          <p>"{{ review.text }}"</p>
          <small>- {{ review.name }}</small>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
    data() {
      return {
        discography: [
          { name: 'So Long My Queen', artist: 'Sean Mckee Band', image: 'albums/SoLongMyQueen.jpeg', link: 'https://open.spotify.com/album/0khwm9sod28mcfP46kTtLe?si=NG2pyAYARjC_jGA6XkXizA' },
          { name: 'In This Life', artist: 'Sean Mckee Band', image: 'albums/InThisLife.jpeg', link: 'https://open.spotify.com/album/0X0u012zBrFq1537i174tL?si=Ne2uSNhVRxCpsnXgcaFbrQ' },
          { name: 'Poison Ivy', artist: 'Sean Mckee Band', image: 'albums/PoisonIvy.jpeg', link: 'https://open.spotify.com/album/5xNhmtFlAey1zwkky6c5b0?si=l2mWBcGSRE6v1WA2Eu2n6A' },
        ],
        reviews: [
          { name: 'jk6strings on Fiverr', text: 'Really enjoy working with Chris. He provided two versions of basslines for my song, and they\'re both awesome! I can\'t decide which I like best. Turnaround time and communication also excellent. Very highly reccomend.' },
          { name: 'oldmanlion on Fiverr', text: 'Chris P came up with two alternative bass tracks for my song, both in raw and mixed form. Met the breif perfectly. Response time and turnaround time were both amazingly fast. Totally professional job, and unquestionable value for money. Would certainly come back again.' },
          { name: 'wadleyworld on Fiverr', text: 'Wow, blown away by how tight he is... well done man! delivered two songs flawlessly. no notes or revisions needed. Will utilize his talent in the future. Highly recommended Obvi...' },
          { name: 'davidmusic2018 on Fiverr', text: 'It was a pleasure working with Chris. His recordings and performance were excellent and made my job as audio engineer much easier than it could have been. In my case, it was symphonic/orchestral music and I was able to quickly place Chris\' work in the mix. Looking forward to working together again!' },


        ],
      };
    },
    methods: {
      contact() {
        window.location.href = "mailto:chrispecmusic@gmail.com"
      }
    }
}
</script>

<style scoped>
.hero-image {
  height: 90vh;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url("../../public/ChrisPecMusic.png");
  background-position: center right;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  transition: all 0.5s ease;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
}

.hero-text {
  text-align: left;
  position: relative;
  left: 5%;
  color: white;
}

.hero-text h1 {
  font-size: 50px;
}

.hero-text p {
  font-size: 20px;
}

.album {
  transition: box-shadow .3s;
  border-radius: 5px;
  padding: 20px;
  cursor: pointer;
}

.album:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.album-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

/* Mobile styles */
@media only screen and (max-width: 991px) {
  .hero-image {
    background-position: center center;
    background-size: cover;
  }

  .hero-text {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-30%, -50%);
  }

  .hero-text h1 {
    font-size: 30px;
  }

  .hero-text p {
    font-size: 16px;
  }
}
</style>