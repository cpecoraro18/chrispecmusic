<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-12 col-lg-5">
            <img
              src="/img/ChrisPecMusic.jpg"
              alt="Chris Pecoraro, upright and electric bassist based in Chicago"
              class="img-fluid rounded shadow about-photo"
              loading="eager"
              decoding="async"
            />
          </div>
          <div class="col-12 col-lg-7 text-lg-start">
            <h1 class="mb-4">About</h1>
            <p class="lead">
              I'm Chris Pecoraro, an upright and electric bassist based in Chicago. I record and
              perform with artists here at home and remotely around the world, and I've completed
              over 100 remote recording sessions for songwriters, producers, and bands across a
              wide range of styles.
            </p>
            <p class="text-muted">
              I'm currently a member of the Sean McKee Band, winners of the 2024 Chicago Blues
              Challenge. I've played with rock bands, jazz bands, orchestras, vocal jazz
              ensembles, and musicals, and I've had the chance to share a stage with Buddy Guy,
              Doc Severinsen, and members of Prince's band.
            </p>
            <p class="text-muted">
              I'm always glad to hear about a new project, whether it's in the studio or on stage.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= VENUES ================= -->
    <section class="section-tight venues-section">
      <div class="container">
        <h2 class="mb-5">Places I've played</h2>
        <ul class="venue-grid">
          <li v-for="venue in venues" :key="venue">{{ venue }}</li>
        </ul>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="section-tight">
      <div class="container">
        <h2 class="mb-3">Work with me</h2>
        <p class="lead measure mb-4">
          I record remote bass sessions from my studio and play live dates in Chicago and beyond.
        </p>
        <div class="about-actions">
          <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
          <nuxt-link class="btn btn-ghost" to="/book-live-gig">Book a Live Gig</nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const venues = [
  "Buddy Guy's Legends",
  'The Grand Ole Opry',
  'Lincoln Hall',
  'Rum Boogie Café',
];

useHead({
  title: 'About | Chris Pecoraro, Chicago Bassist',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        "Chris Pecoraro is an upright and electric bassist based in Chicago. Member of the Sean McKee Band, 100+ remote recording sessions, and stages shared with Buddy Guy and Doc Severinsen.",
    },
  ],
});
</script>

<style scoped>
.about-photo {
  width: 100%;
  max-height: 30rem;
  object-fit: cover;
}

.venues-section {
  background-color: var(--blue-deep);
}

.venue-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.venue-grid li {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
  font-weight: 600;
}

.about-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  justify-content: center;
}

@media (max-width: 575px) {
  .about-actions .btn {
    flex: 1 1 100%;
  }
}
</style>
