<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-12 col-lg-5">
            <img
              src="/img/ChrisPecMusic.webp"
              alt="Chris Pecoraro, upright and electric bassist based in Chicago"
              class="img-fluid rounded shadow about-photo"
              width="1600"
              height="676"
              loading="eager"
              decoding="async"
            />
          </div>
          <div class="col-12 col-lg-7 text-lg-start">
            <h1 class="mb-4">About</h1>
            <p class="lead">
              Chris Pecoraro is an upright and electric bassist based in Chicago, recording and performing with artists locally and remotely around the world. 
              He has completed over 100 remote recording sessions for songwriters, producers, and bands, providing bass tracks for projects across many styles and genres.
            </p>
            <p class="text-muted">
              Chris is a currently a member of the Sean McKee Band, winners of the 2024 Chicago Blues Challenge. He has performed with rock bands, jazz bands, orchestras, vocal jazz ensembles, musicals, and more. He was selected as a contrabassist for the 2024 <a href="https://symphonina.org/bio-chris-pecoraro" target="_blank" rel="noopener">International Symphonina Orchestra</a>. Chris has also had the privilege to share the stage with world-class artists including Buddy Guy, Doc Severinsen, and members of Prince’s band. He has also appeared at renowned venues such as the Buddy Guy’s Legends, the Grand Ole Opry, Lincoln Hall, and the Rum Boogie Café.
            </p>
            <p class="text-muted mb-0">
              Chris is always excited to connect with other artists and contribute to new projects, whether in the studio or on stage, and is continuously looking for opportunities to grow, experiment, and bring fresh musical ideas to life.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <CtaBand
      title="Work with me"
      lead="I record remote bass sessions from my studio and play live dates in Chicago and beyond."
    >
      <nuxt-link class="btn btn-cta" to="/book-session">Book a Recording Session</nuxt-link>
      <nuxt-link class="btn btn-ghost" to="/book-live-gig">Book a Live Gig</nuxt-link>
    </CtaBand>
  </div>
</template>

<script setup>
useSeo({
  title: 'About | Chris Pecoraro, Chicago Bassist',
  description: "Chris Pecoraro is an upright and electric bassist based in Chicago. Member of the Sean McKee Band, 100+ remote recording sessions, and stages shared with Buddy Guy and Doc Severinsen.",
});
</script>

<style scoped>
.about-photo {
  width: 100%;
  max-height: 30rem;
  object-fit: cover;
}

/* Inline link in body copy. Bootstrap's default blue is unreadable on the dark
   background, so the link takes the paragraph's colour and relies on the
   underline to read as a link. */
.text-muted a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.text-muted a:hover,
.text-muted a:focus-visible {
  color: var(--white);
}
</style>
