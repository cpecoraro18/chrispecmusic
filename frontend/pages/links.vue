<template>
  <div class="container vh-75">
    <div class="text-center mt-5">
      <h1>Chris Pecoraro</h1>
      <h2 class="h5 text-muted">Electric and Upright Bassist | Chicago</h2>
      <img src="/img/ChrisPecMusic.jpg" alt="Chris Pecoraro" class="img-fluid rounded mt-3 profile-image">
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-12 text-center">
          <a class="btn btn-outline-light m-4 m-md-2 d-block d-md-inline-block" href="https://www.chrispecmusic.com" target="_blank">
            <i class="fa fa-globe me-2"></i>
            Website</a>
          <nuxt-link class="btn btn-outline-light m-4 m-md-2 d-block d-md-inline-block" to="/portfolio">
            <i class="fa fa-video me-2"></i>
            Portfolio
          </nuxt-link>
          <a class="btn btn-outline-light m-4 m-md-2 d-block d-md-inline-block" href="https://www.instagram.com/chrispecmusic" target="_blank">
            <img src="/instagram-logo.png" alt="Instagram" class="social-icon me-1"/>
            Instagram
          </a>
          <nuxt-link class="btn btn-outline-light m-4 m-md-2 d-block d-md-inline-block" to="/contact">
            <i class="fa fa-envelope me-2"></i>
            Contact Me
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: 'Chris Pecoraro - Electric and Upright Bassist',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Chris Pecoraro is a professional electric and upright bassist based in Chicago. Explore his portfolio, music, and contact information.'
      }
    ]
  });
</script>

<style scoped>
.text-center {
  text-align: center;
}

.profile-image {
  max-width: 30em;
}

@media (max-width: 767px) {
  .profile-image {
    max-width: 200px; /* Smaller size for mobile devices */
  }
}
.social-icon {
    width: 1em;
    height: auto;
}

@media only screen and (max-width: 991px) {
    .social-icon {
        margin-left: 0;
    }

}
</style>