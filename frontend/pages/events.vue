<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Events</h1>
        <p class="lead measure mb-5">
          Where I'm playing next around Chicago and beyond. Come say hello.
        </p>
        <events-list :show-heading="false" />
      </div>
    </section>

    <CtaBand
      title="Looking for a bass player?"
      lead="I take live bookings and record remote sessions from my studio."
    >
      <nuxt-link class="btn btn-cta" to="/book-live-gig">Book a Live Gig</nuxt-link>
      <nuxt-link class="btn btn-ghost" to="/book-session">Book a Recording Session</nuxt-link>
    </CtaBand>
  </div>
</template>

<script setup>
useSeo({
  title: 'Upcoming Events | Chris Pecoraro, Chicago Bassist',
  description: 'Upcoming live performances and past shows featuring Chris Pecoraro on upright and electric bass around Chicago and beyond.',
});
</script>

