<template>
  <div class="service-details py-5">
    <div class="container">
      <div class="d-flex mb-3">
        <router-link to="/services" class="btn btn-outline-primary">Back to Services</router-link>
      </div>
      <h1 class="text-center mb-4">Professional Studio Bass Tracks</h1>
      <div class="text-center mb-5">
        <p class="lead">
          Get professional bass tracks tailored to your sound – fast, affordable, in-person or remotely.
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
          <p>
            Whether you're a songwriter, band, remixer, or producer, I’m here to provide the perfect bassline for your music. My remote recording services are fast, affordable, and tailored to your specific needs. My top priority is delivering the bass part you envision, with clear communication and quick turnaround times.          </p>
          <ul class="list-group my-4">
            <li class="list-group-item fw-bold">
              <span class="border-bottom border-dark">
                What You Get:
              </span>
            </li>
            <li class="list-group-item fw-semibold">
              Personalized basslines tailored to your track's unique sound
            </li>
            <li class="list-group-item fw-semibold">
              Quick turnaround while maintaining the highest quality
            </li>
            <li class="list-group-item fw-semibold">
              Top-tier equipment and professional studio environment
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

      <div class="row mb-5">
        <div class="col-md-6">
          <img
            class="img-fluid rounded shadow"
            src="/img/upright-studio.png"
            alt="Professional Studio Setup"
          />
        </div>
        <div class="col-md-6">
          <div class="d-flex justify-content-center">
           <h2 class="mb-4 border-bottom pb-3">Why Use Me?</h2>
          </div>
          <p>
            With years of experience working across genres, I bring precision, creativity, and expertise to each project. I collaborate closely with you to ensure that my bass lines match your song’s vision and add that extra depth and energy that will make it unforgettable.
          </p>
          <ul class="my-4">
            <li class="my-2">
              <span class="fw-bold">
                Convenience: 
              </span>
              Get studio-quality bass without ever leaving your home.
            </li>
            <li class="my-2">
              <span class="fw-bold">
                Cost Effective: 
              </span>
              No studio booking, no hidden fees – just high-quality bass tracks.
            </li>
            <li class="my-2">
              <span class="fw-bold">
                Professional Results: 
              </span>
              I use top-tier gear to ensure your tracks are of the highest standard. Check out my <NuxtLink to="/gear">gear list</NuxtLink>.
            </li>
          </ul>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <h2 class="mb-4 border-bottom pb-3">How It Works?</h2>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <p>
            Getting started is easy. Simply fill out the form below to tell me about your project and what you're looking for in a bass track. Once I receive your message, I'll get back to you promptly to discuss your needs and provide a quote. From there, we can schedule a recording session and get started on your custom bass track.
          </p>
          <i>
            Let's work together to create the perfect bass track for your music!
          </i>
        </div>
      </div>
      <div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc8-7ieBniq4XbeI-eFB2R3X134V_PeGqEeqXJp21kdFYTSQg/viewform?usp=sf_link"
          target="_blank"
          class="btn btn-primary btn-lg"
        >
          Book Your Custom Bass Track
        </a>
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
