<template>
  <div class="service-details py-5">
    <div class="container">
      <div class="d-flex mb-3">
        <router-link to="/services" class="btn btn-outline-primary">Back to Services</router-link>
      </div>
      <h1 class="text-center mb-4">Live Performances</h1>
      <div class="text-center mb-5">
        <p class="lead">
          Get adynamic, professional bass plater that elevate your live shows. Available for gigs, tours, and special events.
        </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScjH2TAHX2a4w97208k6ARgvH9KdWgavi951l0aGf6fZ4bUeQ/viewform?usp=sf_link" target="_blank" class="btn btn-primary btn-lg">Hire Me for a Gig</a>
      </div>
      <div class="row mb-5">
        <div class="col-md-6">
          <div class="d-flex justify-content-center">
            <h2 class="mb-4 border-bottom pb-3">What I Offer</h2>
          </div>
          <p>
            Whether you're looking for a reliable bassist for your band, a fill-in for an upcoming gig, or need that extra touch to bring your live show to life, I’m here to provide rock-solid basslines that lock in with the band and keep the groove going all night. With years of experience playing live across a variety of genres, I’m ready to step in and deliver a performance that fits your sound.          </p>
          <ul class="list-group my-4">
            <li class="list-group-item fw-bold">What You Get:</li>
            <li class="list-group-item">Experienced with small venues, large stages, and everything in between</li>
            <li class="list-group-item">Proficient in multiple genres, including rock, jazz, blues, and more</li>
            <li class="list-group-item">Quick to adapt to different band dynamics</li>
          </ul>
        </div>
        <div class="col-md-6">
          <img class="img-fluid rounded shadow" src="/img/live-performances.jpg" alt="Live Performance" />
        </div>
      </div>
      
      <div class="row mb-5">
        <div class="col-md-6">
          <img class="img-fluid rounded shadow" src="/img/live-performances-2.jpg"  alt="Local Performance" />
        </div>
        <div class="col-md-6">
          <div class="d-flex justify-content-center">
            <h2 class="mb-4 border-bottom pb-3">Why Hire Me?</h2>
          </div>
          <p>
            When you hire me for your live shows, you get a bassist who is dedicated to making your music sound its best. I bring professionalism, versatility, and preparedness to every performance, ensuring that your band sounds tight and groovy every time you hit the stage.
          </p>
          <ul class="my-4">
            <li class="my-2">
              <span class="fw-bold">
                Professionalism: 
              </span>
              I bring reliability and stage experience to every performance.
            </li>
            <li class="my-2">
              <span class="fw-bold">
                Versatility:
              </span>
              Whether it’s jazz, rock, funk, or anything in between, I can adapt to your band's style.
            </li>
            <li class="my-2">
              <span class="fw-bold">
                Preparedness:
              </span>
              My focus is always on enhancing the overall sound, supporting the music, and delivering tight, groovy basslines.
            </li>
          </ul>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <h2 class="mb-4 border-bottom pb-3">How It Works</h2>
      </div>
      <div class="row mb-5">
        <div class="col-md-12">
          <p>
            To book me for your live event, simply fill out the booking form with all the details about your show—date, location, and any special requests. Once I receive your form, I’ll personally reach out to discuss your event, confirm availability, and finalize any necessary details.
          </p>
        </div>
      </div>

      <a href="https://docs.google.com/forms/d/e/1FAIpQLScjH2TAHX2a4w97208k6ARgvH9KdWgavi951l0aGf6fZ4bUeQ/viewform?usp=sf_link" target="_blank" class="btn btn-primary btn-lg">Hire Me for a Gig</a>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Live Performances - Chris Pecoraro',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Hire Chris Pecoraro for your live shows, offering professional bass performance for local gigs and touring bands.'
    }
  ]
});
</script>

<style scoped>
.list-group-item {
  background-color: var(--bg-light-blue);
  color: var(--text-color-dark);
  border: none;
}

.img-fluid {
  height: 23em;
}
</style>