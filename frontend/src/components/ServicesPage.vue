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
        <div class="col-md-4 offset-md-2 mb-4">
          <div class="card service bg-light-blue">
            <div class="p-2">
                <img class="card-img-top service-image rounded" src="img/studio.jpg" alt="Studio Sessions" />
            </div>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title">Studio Sessions</h2>
              <p class="card-text text-justify">I offer professional bass tracks for your recording projects, available for both live in-studio sessions or remote recording. Whether you're producing an album, a single, or a commercial jingle, I create bass lines that elevate your music. I specialize in a variety of genres and guarantee a fast turnaround without sacrificing quality. If you're a studio or artist looking to add depth and groove to your tracks, let's collaborate to bring your music to life.</p>
              <a class="btn btn-primary mt-auto" href="https://docs.google.com/forms/d/e/1FAIpQLSc8-7ieBniq4XbeI-eFB2R3X134V_PeGqEeqXJp21kdFYTSQg/viewform?usp=sf_link" target="_blank">Book a Session</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card service bg-light-blue">
              <div class="p-2">
                <img class="card-img-top service-image rounded" src="img/live-performances.jpg" alt="Live Performances" />
              </div>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title">Live Performances</h2>
              <p class="card-text text-justify">Need a bassist for your live shows? I have extensive experience performing in a variety of settings, from small clubs to large venues. I adapt to different band setups and styles, bringing energy and expertise to your live performances. Let's make your next gig unforgettable.</p>
              <a class="btn btn-primary mt-auto" href="https://docs.google.com/forms/d/e/1FAIpQLScjH2TAHX2a4w97208k6ARgvH9KdWgavi951l0aGf6fZ4bUeQ/viewform?usp=sf_link" target="_blank">Hire Me for a Gig</a>
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
    lessons() {
      window.open("", "_blank");
    },
  }
}
</script>

<style scoped>

.btn-primary {
  background-color: var(--primary);
  border-color: var(--primary);
}

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