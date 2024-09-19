<template>
  <div class="service-details py-5">
    <div class="container">
      <div class="d-flex mb-3">
        <router-link to="/services" class="btn btn-outline-primary">Back to Services</router-link>
      </div>
      <h1 class="text-center mb-4">Bass Lessons</h1>
      <div class="text-center mb-5">
        <p class="lead">
          Take your bass playing to the next level with one-on-one lessons designed to help you build technique, groove, and confidence—whether you’re a beginner or advanced player.
        </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScjH2TAHX2a4w97208k6ARgvH9KdWgavi951l0aGf6fZ4bUeQ/viewform?usp=sf_link" target="_blank" class="btn btn-primary btn-lg">Book Your Lesson</a>
      </div>
      <div class="d-flex justify-content-center">
        <h2 class="mb-4 border-bottom pb-3">What I Offer</h2>
      </div>
      <div class="row mb-5">
        <div class="col-md-12">
          <p>
            Whether you're picking up the bass for the first time or looking to fine-tune your technique, my personalized lessons will give you the tools to reach your musical goals. As an experienced bassist with years of live performance and teaching under my belt, I’m here to provide structured guidance while helping you find your unique sound.
          </p>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <h2 class="mb-4 border-bottom pb-3">Why Take Lessons with Me?</h2>
      </div>
      <div class="row mb-5">
        <div class="col-md-6">
          <img class="img-fluid rounded shadow" alt="Local Performance" />
        </div>
        <div class="col-md-6">
          <ul class="my-4">
            <li class="my-2">
              <span class="fw-bold">
                Customized Lessons: 
              </span>
              Every lesson is tailored to your skill level, style, and goals, ensuring you get the most out of each session.
            </li>
            <li class="my-2">
              <span class="fw-bold">
                Real-World Experience:
              </span>
              Learn from someone who’s performed across a variety of genres and knows what it takes to be a professional bassist.
            </li>
            <li class="my-2">
              <span class="fw-bold">
                Focus on Fundamentals
              </span>
              Whether it's technique, theory, or groove, I’ll help you build a strong foundation to support your playing for years to come.
            </li>
            <li class="my-2">
              <span class="fw-bold">
                Flexibility
              </span>
              I offer lessons in person or online, making it easy to fit learning into your schedule.
            </li>
          </ul>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <h2 class="mb-4 border-bottom pb-3">What You Can Expect from My Lessons</h2>
      </div>
      <div class="row mb-5">
        <div class="col-md-6">
          <p>
            As we work together, you’ll first develop a solid foundation in bass technique, ensuring your playing is strong and reliable. We’ll then delve into music theory, helping you understand how music functions and how to use this knowledge in your playing. You'll practice passages from various genres to build versatility and tackle different styles. Exercises from method books will reinforce your skills and ensure steady progress. Additionally, you'll apply your learning to real-world music scenarios and receive constructive feedback to guide your improvement and keep you motivated.
          </p>
        </div>
        <div class="col-md-6">
          <img class="img-fluid rounded shadow" alt="Local Performance" />
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <h2 class="mb-4 border-bottom pb-3">How It Works</h2>
      </div>
      <div class="row mb-5">
        <div class="col-md-12">
          <p>
            To get started, fill out the form with your details and bass playing goals. This will help me understand your current skill level and what you hope to achieve. Once I receive your information, I'll contact you to schedule a lesson time that fits your schedule.
          </p>

          <i>
            Let's work together to take your bass playing to the next level!
          </i>
        </div>
      </div>

      <a href="https://docs.google.com/forms/d/e/1FAIpQLScjH2TAHX2a4w97208k6ARgvH9KdWgavi951l0aGf6fZ4bUeQ/viewform?usp=sf_link" target="_blank" class="btn btn-primary btn-lg">Book Your Lesson</a>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Live Performances - Chris Pecoraro',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Hire Chris Pecoraro for your live shows, offering professional bass performance for local gigs and touring bands.'
    }
  ]
});
</script>

<style scoped>
.list-group-item {
  background-color: var(--bg-light-blue);
  color: var(--text-color-dark);
  border: none;
}

.img-fluid {
  height: 23em;
}
</style>