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

    <section class="final-cta">
      <div class="container">
        <h2 class="mb-3">Looking for a bass player?</h2>
        <p class="lead measure mb-4">
          I take live bookings and record remote sessions from my studio.
        </p>
        <div class="cta-actions">
          <nuxt-link class="btn btn-cta" to="/book-live-gig">Book a Live Gig</nuxt-link>
          <nuxt-link class="btn btn-ghost" to="/book-session">Book a Recording Session</nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Upcoming Events | Chris Pecoraro, Chicago Bassist',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Upcoming live performances and past shows featuring Chris Pecoraro on upright and electric bass around Chicago and beyond.',
    },
  ],
});
</script>

<style scoped>
.final-cta {
  background-color: var(--blue-deep);
  padding-block: var(--section-y);
  border-top: 1px solid rgba(var(--text-color-rgb), 0.12);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  justify-content: center;
}

@media (max-width: 575px) {
  .cta-actions .btn {
    flex: 1 1 100%;
  }
}
</style>
