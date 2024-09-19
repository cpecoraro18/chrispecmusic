<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <h1 class="mb-4 mt-2">About Me</h1>

        <img src="/img/ChrisPecMusicSmall.jpg" alt="Your Image" class="img-fluid mb-4 w-50 mx-auto d-block rounded mb-5">

        <p>Hello! I’m Chris Pecoraro, a seasoned bassist with over a decade of experience in delivering top-notch performances across a diverse array of styles, including rock, jazz, funk, blues, pop, and R&B. My journey in music has been fueled by a passion for versatility and a dedication to mastering the art of the bass.</p>
        
        <h2 class="mt-5">Background</h2>
        <p>My musical path began in high school, where I immersed myself in a variety of groups—from successful show choir bands to jazz bands, vocal jazz trios to orchestras, marching bands to rock and blues bands. This broad experience set the stage for my advanced studies at the University of Minnesota, where I earned a music minor with a focus on upright bass. Under the mentorship of Dave Williamson and Chris Brown, I played in Jazz Band I, jazz combos, orchestras, and various other bands, enriching my skills and expanding my musical horizons.</p>
        
        <img src="/img/UMN.jpg" alt="University of Minnesota Bass" class="img-fluid w-50 mx-auto d-block rounded mb-5">


        <h2>Influences</h2>
        <p>While my playing style is rooted in retro soul, I'm versatile and can play a range of genres, including pop, blues, rock, jazz, and funk. My influences include Jaco Pastorius, Pino Palladino, and Oteil Burbridge, all of whom have shaped my unique approach to the bass.</p>
        
        <div class="d-flex justify-content-around align-items-center mb-5">
          <img src="/img/Pino-Palladino.jpeg" alt="Influence 1 - Pino Palladino" class="img-fluid influence-img rounded">
          <img src="/img/Oteil-Burbridge.jpeg" alt="Influence 2 - Oteil Burbridge" class="img-fluid influence-img rounded">
          <img src="/img/Jaco-Pastorius.jpeg" alt="Influence 3 - Jaco Pastorius" class="img-fluid influence-img rounded">
        </div>

        <h2>Current Projects</h2>
        <p>Currently, I play with the <a href="https://www.seanmckeeband.com" target="_blank">Sean McKee Band</a>, winners of the Chicago portion of the 2023 International Blues Challenge. I'm passionate about collaborating with other musicians, both in person and remotely, and I always look for opportunities to contribute to new projects.</p>
        
        <img src="/img/SeanMcKeeBand.jpg" alt="Sean Mckee Band" class="img-fluid mb-4 mx-auto w-75 d-block rounded mb-5">

        <div class="mb-5">
          <h2>Get In Touch</h2>
          <p>If you're interested in working with me, please <a href="mailto:contact@chrispecmusic.com">contact me</a>.</p>
        </div>
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