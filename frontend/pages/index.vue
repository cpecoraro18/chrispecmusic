<template>
  <div class="pb-5">
    <div class="hero-image">
      <div class="hero-text text-center">
        <h1>Chris Pecoraro</h1>
        <h2 class="h5 text-muted">Professional Electric and Upright Bassist | Chicago</h2>
        <nuxt-link class="btn btn-outline-light hero-button mt-3 rounded-lg" to="/contact">Get In Touch</nuxt-link>
      </div>
    </div>

    <div class="container my-5">
      <div class="row">
        <div class="col-12 col-lg-5 mx-auto">
          <h3 class="display-4 text-center mb-4">About</h3>
          <p class="lead text-center mb-4">
            Chris Pecoraro is a professional upright and electric bassist based in Chicago with over a decade of experience in live performances and studio recordings. <br><br>
            Currently, he is a member of the <a href="https://www.seanmckeeband.com">Sean McKee Band</a>, 2024 International Blues Challenge semi-finalists.
          </p>

        </div>
        <div class="col-12 col-lg-5">
          <img src="/img/BuddyGuys.jpg" alt="Sean Mckee Band at Buddy Guys Legends - Upright Bass" class="img-fluid mx-auto d-block rounded mb-5">
        </div>
      </div>
    </div>

    <discography-list></discography-list>

    <div class="bg-light-blue py-5">
      <h3 class="text-dark fw-bold h2">Reviews</h3>
      <p class="lead text-muted">Read what my clients have to say about working with me.</p>
      <review-list></review-list>
    </div>

    <div class="container">
      <events-list :limit="5"></events-list>
    </div>


    <div class="container mt-5">
      <div class="w-100 border-bottom"></div>
    </div>


    <div class="container-fluid py-3 mt-5">
      <div class="row text-center">
        <h3 class="mx-auto mb-4 fw-bold h2">Get in Touch</h3>
        <p class="lead">Have questions or want to book a session? Let’s connect!</p>
      </div>
      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <p class="lead d-flex justify-content-center align-items-center">
            <i class="fa fa-envelope me-2"></i>
            <a href="mailto:contact@chrispecmusic.com" class="fw-bold">contact@chrispecmusic.com</a>
          </p>
        </div>
      </div>
      <div class="row mt-2 mb-4">
        <div class="col-lg-6 mx-auto text-center">
          <nuxt-link class="btn btn-outline-light mt-3 rounded-lg" to="/contact">Contact Me</nuxt-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import DiscographyList from '../components/DiscographyList.vue';
import ServiceCards from '~/components/ServiceCards.vue';

export default {
  name: 'HomePage',
  components: {
    DiscographyList,
    ServiceCards
  },
}
</script>

<style scoped>
.hero-image {
  height: 70vh;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url("/img/ChrisPecMusic.jpg");
  background-position: center 20%;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  transition: all 0.5s ease;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-text {
  margin-top: 8%;
}

.hero-text h1 {
  font-size: 5em;
}

.hero-text h2 {
  font-size: 20px;
}

.album {
  transition: box-shadow .3s;
  border-radius: 5px;
  padding: 20px;
  cursor: pointer;
}

.album:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.album-link:hover {
  color: var(--primary)
}

.album-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.custom-card {
  background-color: var(--bg-light);
  color: var(--text-color-dark);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.custom-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  color: var(--primary);
}

.card-title {
  font-weight: bold;
}

.card-body {
  padding: 2rem;
}

/* Mobile styles */
@media only screen and (max-width: 991px) {
  .hero-image {
    height: 60vh;
    background-position: center center;
    background-size: cover;
  }
  
  .hero-text h1 {
    font-size: 2.5em;
  }


  .hero-text h2 {
    font-size: 20px;
  }
}

@media only screen and (min-width: 991px) {
  .hero-button {
    padding: 1rem 2rem;
    font-size: 20px;
    border-radius: 16px;
  }
}
</style>