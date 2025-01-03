<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <h1 class="mb-4">Bio</h1>

        <img src="/img/ChrisPecMusicSmall.jpg" alt="Your Image" class="img-fluid mb-4 w-50 mx-auto d-block rounded mb-5">

        <p>Chris Pecoraro is a professional bassist with over a decade of experience spanning live performances and studio recordings. Proficient in both electric and upright bass, he excels in genres such as rock, jazz, funk, blues, and pop. His playing style is influenced by legends like Jaco Pastorius, Pino Palladino, and Oteil Burbridge.</p>

        <p>Chris has played with a variety of groups, including the <a href="https://www.seanmckeeband.com" target="_blank">Sean McKee Band</a>, winners of the Chicago portion of the 2023 International Blues Challenge, and is always excited to collaborate with new artists and projects.</p>
        
        <img src="/img/SeanMcKeeBand.jpg" alt="Sean Mckee Band" class="img-fluid mb-4 mx-auto w-75 d-block rounded mb-5">

        <div>
          <p>For inquiries or bookings, <a href="mailto:contact@chrispecmusic.com">get in touch</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: 'Bio - Chris Pecoraro',
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