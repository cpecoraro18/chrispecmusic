<template>
  <div class="services py-5">
    <div class="container">
      <h1 class="text-center mb-5">Services</h1>
        <div class="text-center mb-5">
          <p>Whether you’re a producer needing a solid bass line for your latest track, a bandleader looking to add a pro bassist to your live gigs, or a student wanting to up your bass game, I’m here to help. With years of experience and a passion for low end, I offer services designed to bring your musical vision to life. If you'd like to reach out to me to ask questions feel free.</p>
          <router-link to="/contact" class="btn btn-primary">Contact Me</router-link>
        </div>
      <div class="row">
        <div class="col-md-4 offset-md-2 mb-4">
          <div class="card service bg-light-blue">
            <div class="p-2">
                <img class="card-img-top service-image rounded" src="/img/studio.jpg" alt="Studio Sessions" />
            </div>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title">Studio Sessions</h2>
              <p class="card-text text-justify">Achieve the perfect bass sound for your project with professional recording services designed to meet your specific needs. Whether you require a compelling bass line to complete your track or need to elevate your production with a unique sound, I provide top-tier recording services both remotely and in-person. Using high-quality, professional gear, I ensure each bass track is crafted to enhance your music and align with your vision.</p>
              <router-link to="/services/studio" class="btn btn-primary mt-auto">Learn More</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card service bg-light-blue">
              <div class="p-2">
                <img class="card-img-top service-image rounded" src="/img/live-performances.jpg" alt="Live Performances" />
              </div>
            <div class="card-body d-flex flex-column">
              <h2 class="card-title">Live Performances</h2>
              <p class="card-text text-justify">Need a bassist for your live shows? I have extensive experience performing in a variety of settings, from small clubs to large venues. I adapt to different band setups and styles, bringing energy and expertise to your live performances. Let's make your next gig unforgettable.</p>
              <router-link to="/services/gig" class="btn btn-primary mt-auto">Learn More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
  title: 'Services - Chris Pecoraro',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Learn more about the services Chris Pecoraro offers, including studio sessions and live performances.'
    }
  ]
});

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