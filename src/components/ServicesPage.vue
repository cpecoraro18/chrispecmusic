<template>
  <div class="services py-5 vh-100">
    <div class="container">
      <h1 class="text-center mb-5">Services</h1>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card bg-light-blue">
            <img class="card-img-top p-1" src="/studio.png" alt="Studio Sessions" />
            <div class="card-body">
              <h2 class="card-title">Studio Sessions</h2>
              <p class="card-text text-justify">I offer professional bass tracks for your recording projects, available for both live in-studio sessions or remote recording. Whether you're producing an album, a single, or a commercial jingle, I create bass lines that elevate your music. I specialize in a variety of genres and guarantee a fast turnaround without sacrificing quality. If you're a studio or artist looking to add depth and groove to your tracks, let's collaborate to bring your music to life.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card bg-light-blue">
            <img class="card-img-top p-1" src="/live-performances.jpg" alt="Live Performances" />
            <div class="card-body">
              <h2 class="card-title">Live Performances</h2>
              <p class="card-text text-justify">Need a bassist for your live shows? I have extensive experience performing in a variety of settings, from small clubs to large venues. I adapt to different band setups and styles, bringing energy and expertise to your live performances. Let's make your next gig unforgettable.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card bg-light-blue">
            <img class="card-img-top p-1" src="path/to/bass-lessons.jpg" alt="Bass Lessons" />
            <div class="card-body">
              <h2 class="card-title">Bass Lessons</h2>
              <p class="card-text text-justify">If you're looking to learn bass or improve your skills, I offer personalized bass lessons tailored to your goals. Whether you're a beginner or an advanced player, I can help you build technique, music theory knowledge, and confidence on the bass. Sessions are available in-person or online for your convenience.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <router-link to="/contact" class="nav-link">
          <button class="btn btn-primary">Contact Me</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesPage',
}
</script>

<style scoped>

.bg-light-blue {
  background-color: var(--bg-light-blue);
}
</style>