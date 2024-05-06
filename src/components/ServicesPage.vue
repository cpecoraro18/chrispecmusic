<template>
  <div class="services py-5">
    <div class="container">
      <h1 class="text-center mb-5">Services</h1>
        <div class="text-center mb-5">
          <router-link to="/contact" class="nav-link">
            <p>Here are the services I provide. If you'd like to reach out to me to ask questions feel free.</p>
            <button class="btn btn-primary">Contact Me</button>
          </router-link>
        </div>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card service bg-light-blue">
            <div class="p-2">
                <img class="card-img-top service-image rounded" src="/studio.png" alt="Studio Sessions" />
            </div>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title">Studio Sessions</h2>
              <p class="card-text text-justify">I offer professional bass tracks for your recording projects, available for both live in-studio sessions or remote recording. Whether you're producing an album, a single, or a commercial jingle, I create bass lines that elevate your music. I specialize in a variety of genres and guarantee a fast turnaround without sacrificing quality. If you're a studio or artist looking to add depth and groove to your tracks, let's collaborate to bring your music to life.</p>
              <button class="btn btn-primary mt-auto" v-on:click="studio">Book a Session</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card service bg-light-blue">
              <div class="p-2">
                <img class="card-img-top service-image rounded" src="/live-performances.jpg" alt="Live Performances" />
              </div>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title">Live Performances</h2>
              <p class="card-text text-justify">Need a bassist for your live shows? I have extensive experience performing in a variety of settings, from small clubs to large venues. I adapt to different band setups and styles, bringing energy and expertise to your live performances. Let's make your next gig unforgettable.</p>
              <button class="btn btn-primary mt-auto" v-on:click="gig">Hire Me for a Gig</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card service bg-light-blue">
              <div class="p-2">
                <img class="card-img-top service-image rounded" src="path/to/bass-lessons.jpg" alt="Bass Lessons" />
              </div>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title">Bass Lessons</h2>
              <p class="card-text text-justify">If you're looking to learn bass or improve your skills, I offer personalized bass lessons tailored to your goals. Whether you're a beginner or an advanced player, I can help you build technique, music theory knowledge, and confidence on the bass. Sessions are available in-person or online for your convenience.</p>
              <button class="btn btn-primary mt-auto" v-on:click="lessons">Schedule a Lesson</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesPage',
  methods: {
    studio() {
      window.open("https://docs.google.com/forms/d/e/1FAIpQLScHQvfiOjz0E0FuXDik6prbJevLq7FyR-GcmU1nckpgGmSzpw/viewform?usp=sf_link", "_blank");
    },
    gig() {
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSc6j31rPbvKItBikh-u8-hvM-rnohLwwKsiQ8UnoUvysi1XbQ/viewform?usp=sf_link", "_blank");
    },
    lessons() {
      window.open("", "_blank");
    },
  }
}
</script>

<style scoped>

.bg-light-blue {
  background-color: var(--bg-light-blue);
}

.service {
  color: var(--text-color-dark);
  height: 100%;
}

.service-image {
  height: 23em;
  object-fit: cover;
}

</style>