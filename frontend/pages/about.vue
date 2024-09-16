<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <h1 class="mb-4 mt-2">About Me</h1>

        <NuxtImg src="/img/ChrisPecMusicSmall.jpg" alt="Your Image" class="img-fluid mb-4 w-50 mx-auto d-block rounded mb-5"></NuxtImg>

        <h3>Experience</h3>
        <p>Hi, I'm Chris Pecoraro, a bass player with over 10 years of experience playing in a variety of musical settings. My background spans blues bands, jazz combos, show bands, and orchestras, and I earned my music minor from the University of Minnesota.</p>
        
        <NuxtImg src="/img/UMN.jpg" alt="University of Minnesota Bass" class="img-fluid mb-4 w-50 mx-auto d-block rounded mb-5"></NuxtImg>

        <h3>Influences</h3>
        <p>While my playing style is rooted in retro soul, I'm versatile and can play a range of genres, including pop, blues, rock, jazz, and funk. My influences include Jaco Pastorius, Pino Palladino, and Oteil Burbridge, all of whom have shaped my unique approach to the bass.</p>
        
        <div class="d-flex justify-content-around align-items-center mb-5">
          <NuxtImg src="/img/Pino-Palladino.jpeg" alt="Influence 1 - Pino Palladino" class="img-fluid influence-img rounded"></NuxtImg>
          <NuxtImg src="/img/Oteil-Burbridge.jpeg" alt="Influence 2 - Oteil Burbridge" class="img-fluid influence-img rounded"></NuxtImg>
          <NuxtImg src="/img/Jaco-Pastorius.jpeg" alt="Influence 3 - Jaco Pastorius" class="img-fluid influence-img rounded"></NuxtImg>
        </div>

        <h3>Current Projects</h3>
        <p>Currently, I play with the <a href="https://www.seanmckeeband.com" target="_blank">Sean McKee Band</a>, winners of the Chicago portion of the 2023 International Blues Challenge. I'm passionate about collaborating with other musicians, both in person and remotely, and I always look for opportunities to contribute to new projects.</p>
        
        <NuxtImg src="/img/SeanMcKeeBand.jpg" alt="Sean Mckee Band" class="img-fluid mb-4 mx-auto w-75 d-block rounded mb-5"></NuxtImg>

        <h3>Work with Me</h3>
        <p>If you'd like to work together, whether it's for a recording session, live performance, or another musical project, I'd love to hear from you. Let's make some great music.</p>
        <p>I'm available for studio sessions, live performances, and bass lessons. If you're interested in working with me, please <a href="mailto:contact@chrispecmusic.com">contact me</a>.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: 'About Me - Chris Pecoraro',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Learn more about Chris Pecoraro, a bass player with over 10 years of experience playing in a variety of musical settings.'
      }
    ]
  })
</script>

<style scoped>
.influence-img {
  width: 30%; /* Adjust this value to change the size of the images */
  margin: 0 1%; /* Adjust this value to change the spacing between the images */
}
</style>