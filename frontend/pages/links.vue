<template>
  <div class="container">
    <div class="text-center mt-5">
      <h1>Chris Pecoraro</h1>
      <h2 class="h5 text-muted">Electric and Upright Bassist | Chicago</h2>
      <img src="/img/ChrisPecMusic.jpg" alt="Chris Pecoraro" class="img-fluid rounded mt-3 profile-image">
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-12 text-center">
          <a class="btn btn-outline-light m-4 m-md-2 d-block d-md-inline-block" href="https://www.chrispecmusic.com" target="_blank">Website</a>
          <nuxt-link class="btn btn-outline-light m-4 m-md-2 d-block d-md-inline-block" to="/photos">Photos Page</nuxt-link>
          <a class="btn btn-outline-light m-4 m-md-2 d-block d-md-inline-block" href="https://www.instagram.com/chrispecmusic" target="_blank">Instagram</a>
          <nuxt-link class="btn btn-outline-light m-4 m-md-2 d-block d-md-inline-block" to="/contact">Contact Me</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinksPage'
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.profile-image {
  max-width: 100%;
  height: auto;
  max-width: 200px; /* Adjust this value as needed */
}

@media (min-width: 768px) {
  .profile-image {
    max-width: 300px; /* Adjust this value as needed */
  }
}
</style>