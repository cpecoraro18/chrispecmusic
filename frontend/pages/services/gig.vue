<template>
  <div class="service-details mt-4">
    <div class="container">
      <div class="d-flex mb-3">
        <router-link to="/services" class="me-2">Services</router-link> - <span class="ms-2">Live Performances</span>
      </div>
      <h1 class="text-center mb-4">Live Performances</h1>
      <div class="text-center mb-5">
        <p class="lead">
          Dynamic, Professional Bassist for Live Shows, Tours, and Special Events
        </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScjH2TAHX2a4w97208k6ARgvH9KdWgavi951l0aGf6fZ4bUeQ/viewform?usp=sf_link" target="_blank" class="btn btn-primary btn-lg">Hire Me for a Gig</a>
      </div>
      <div class="row mb-5">
        <div class="col-md-6">
          <div class="d-flex justify-content-center">
            <h2 class="mb-4 border-bottom pb-3">What I Offer</h2>
          </div>
          <ul class="offerings list-group my-4">
            <li class="list-group-item"><span class="fw-bold">Versatile Performer:</span> Experienced in rock, jazz, blues, funk, and pop.</li>
            <li class="list-group-item"><span class="fw-bold">Quick Learner:</span> Able to pick up material fast and adapt to your band’s needs.</li>
            <li class="list-group-item"><span class="fw-bold">Reliable Support:</span> Punctual, prepared, and ready for any stage.</li>
            <li class="list-group-item"><span class="fw-bold">Pro Gear:</span> Equipped for venues of all sizes—see my <router-link to="/gear">gear list</router-link>.</li>
          </ul>
        </div>
        <div class="col-md-6">
          <img class="img-fluid rounded shadow" src="/img/live-performances.jpg" alt="Live Performance" />
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <h2 class="mb-4 border-bottom pb-3">How It Works</h2>
      </div>
      <div class="row mb-5">
        <div class="col-md-12">
          <ul class="list-group my-4">
            <li class="list-group-item"><span class="fw-bold">1. Contact Me:</span> Fill out the form below or email me directly at <a href="mailto:contact@chrispecmusic.com">contact@chrispecmusic.com</a></li>
            <li class="list-group-item"><span class="fw-bold">2. Quick Response:</span> I’ll confirm availability and discuss the details.</li>
            <li class="list-group-item"><span class="fw-bold">3. Rehearsal Ready:</span> Available for pre-gig prep if needed.</li>
          </ul>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScjH2TAHX2a4w97208k6ARgvH9KdWgavi951l0aGf6fZ4bUeQ/viewform?usp=sf_link" target="_blank" class="btn btn-primary btn-lg">Hire Me for a Gig</a>
        </div>
      </div>
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
  padding: 1em;
}

.img-fluid {
  height: 23em;
}
</style>