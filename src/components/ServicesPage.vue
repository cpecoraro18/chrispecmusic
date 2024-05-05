<template>
  <div class="services py-5 vh-100">
    <div class="container">
      <h1 class="text-center mb-5">Services</h1>
      <div class="row">
        <div class="col-md-4 mb-4">
          <img src="path/to/studio-sessions.jpg" alt="Studio Sessions" />
          <h2>Studio Sessions</h2>
          <p>I'm available for studio sessions. I can play a wide variety of genres and can adapt to any style.</p>
        </div>
        <div class="col-md-4 mb-4">
          <img src="path/to/live-performances.jpg" alt="Live Performances" />
          <h2>Live Performances</h2>
          <p>I'm available for live performances. I have extensive experience playing live and can provide a solid and reliable bass line for your band.</p>
        </div>
        <div class="col-md-4 mb-4">
          <img src="path/to/bass-lessons.jpg" alt="Bass Lessons" />
          <h2>Bass Lessons</h2>
          <p>I offer bass lessons for beginners and intermediate players. Lessons are tailored to the individual's needs and can cover a range of topics from basic technique to advanced concepts.</p>
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
</style>