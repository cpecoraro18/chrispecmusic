<template>
  <div class="service-details py-5">
    <div class="container">
      <div class="d-flex mb-3">
        <router-link to="/services" class="me-2">Services</router-link> - <span class="ms-2">Studio Recordings</span>
      </div>
      <h1 class="text-center mb-4">Studio Recordings</h1>
      <div class="text-center mb-5">
        <p class="lead">
          Professional Electric and Upright Bass for Your Studio Projects
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc8-7ieBniq4XbeI-eFB2R3X134V_PeGqEeqXJp21kdFYTSQg/viewform?usp=sf_link"
          target="_blank"
          class="btn btn-primary btn-lg"
        >
          Book Your Custom Bass Track
        </a>
      </div>
      <div class="row mb-5">
        <div class="col-md-6">
          <div class="d-flex justify-content-center">
        <h2 class="mb-4 border-bottom pb-3">What I Offer</h2>
      </div>
          <ul class="list-group my-4">
            <li class="list-group-item">
              <span class="fw-bold">Versatile Sound:</span> Experienced in rock, jazz, funk, blues, pop, and more.
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Quick Turnaround:</span> Fast learner and efficient in both in-person and remote sessions.
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Tailored Performance:</span> Basslines crafted to fit your project’s unique style and vision.
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Pro Gear:</span> High-quality instruments and recording tools - <router-link to="/gear">gear list</router-link>.
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <img
            class="img-fluid rounded shadow"
            src="/img/studio.jpg"
            alt="Professional Studio Setup"
          />
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
            <li class="list-group-item"><span class="fw-bold">3. Receive Your Tracks:</span>  Professionally recorded basslines delivered on time.</li>
          </ul>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSc8-7ieBniq4XbeI-eFB2R3X134V_PeGqEeqXJp21kdFYTSQg/viewform?usp=sf_link" target="_blank" class="btn btn-primary btn-lg">Book Your Custom Bass Track</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Studio Bass Sessions by Chris Pecoraro - Elevate Your Music',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Get top-quality custom bass tracks for your music from bassist Chris Pecoraro. Perfect for any genre, remotely or in-studio.'
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
