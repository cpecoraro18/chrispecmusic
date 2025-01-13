<template>
  <div class="pb-5">
    <div class="hero-image">
      <div class="hero-text text-center">
        <h1>Chris Pecoraro</h1>
        <h2 class="h5 text-muted">Professional Electric and Upright Bassist | Chicago</h2>
        <a class="btn btn-primary hero-button mt-3 rounded-lg" href="mailto:contact@chrispecmusic.com">Contact Me</a>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-lg-5 offset-2 mx-auto">
          <h3 class="display-4 text-center mb-4">Welcome</h3>
          <p class="lead text-center mb-4">
            I’m <span class=" fw-bold">Chris Pecoraro</span>, a professional electric and upright bassist offering 
            <span class="fw-semibold">live performance</span> and
            <span class="fw-semibold">studio recording</span>.
            Whether you're a band, producer, or aspiring bassist, I’m here to provide the sound and support you need. 
            Let’s make your next project a success. 
            <router-link class="fw-semibold" to="/bio">Read more...</router-link>
        </p>
        </div>
        <div class="col-12 col-lg-5">
          <img src="/img/BuddyGuys.jpg" alt="Sean Mckee Band at Buddy Guys Legends - Upright Bass" class="img-fluid mx-auto d-block rounded mb-5">
        </div>
      </div>
    </div>

    <h3 class="text-center fw-bold mb-3 h2">Services</h3>
    <div class="text-center mb-3">
      <p class="lead">Explore live gig and studio session bass services</p>
    </div> 

    <service-cards></service-cards>

    <div class="bg-light-blue py-5 mt-5">
      <h3 class="text-dark fw-bold h2">Reviews</h3>
      <p class="lead text-muted">Read what my clients have to say about working with me.</p>
      <review-list></review-list>
    </div>

    <discography-list></discography-list>

    <!--
    <events-list></events-list>
    -->
    <div class="container mt-5">
      <div class="w-100 border-bottom"></div>
    </div>


    <div class="container-fluid py-3 mt-5">
      <div class="row text-center">
        <h3 class="mx-auto mb-4 fw-bold h2">Get in Touch</h3>
        <p class="text-muted lead">Have questions or want to book a session? Let’s connect!</p>
      </div>
      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <p class="lead">
            <i class="bi bi-envelope text-primary"></i> 
            Email: <a href="mailto:contact@chrispecmusic.com" class="fw-bold">contact@chrispecmusic.com</a>
          </p>
        </div>
      </div>
      <div class="row mt-2 mb-4">
        <div class="col-lg-6 mx-auto text-center">
          <a class="btn btn-primary py-2 mt-3 rounded-lg" href="mailto:contact@chrispecmusic.com">Contact Me</a>
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
  height: 80vh;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url("/img/ChrisPecMusic.jpg");
  background-position: center right;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  transition: all 0.5s ease;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
}

.hero-text {
  text-align: left;
  position: relative;
  left: 5%;
  color: white;
}

.hero-text h1 {
  font-size: 60px;
}

.hero-text p {
  font-size: 20px;
}

.hero-button {
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 16px;
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
    background-position: center center;
    background-size: cover;
  }

  .hero-text {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-30%, -50%);
  }

  .hero-text h1 {
    font-size: 40px;
  }

  .hero-text p {
    font-size: 16px;
  }
}
</style>