<template>
  <div class="vh-100">
    <div class="hero-image">
      <div class="hero-text">
        <h1>Chris Pecoraro</h1>
        <p>Professional Bass Player</p>
      </div>
    </div>
    <div class="container py-5">
      <div class="row pb-5">
        <div class="col-lg-8 mx-auto">
          <p class="lead">I'm a professional bass player available for studio sessions, live performances, and bass lessons. Explore the site to learn more about me and my services.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scoped>
.hero-image {
  height: 60vh;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url("../../public/ChrisPecMusic.png");
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
  left: 10%;
  color: white;
}

.hero-text h1 {
  font-size: 50px;
}

.hero-text p {
  font-size: 20px;
}

/* Mobile styles */
@media only screen and (max-width: 991px) {
  .hero-image {
    background-position: center center;
    background-size: cover;
  }

  .hero-text {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .hero-text h1 {
    font-size: 30px;
  }

  .hero-text p {
    font-size: 16px;
  }
}
</style>