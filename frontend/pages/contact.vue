<template>
  <div>
    <section class="section-tight">
      <div class="container">
        <h1 class="mb-3">Get in touch</h1>
        <p class="lead measure mb-5">
          Recording project, live date, or just a question. Send it over and I'll get back to
          you.
        </p>

        <div class="row g-5 align-items-start justify-content-center">
          <div class="col-12 col-lg-6">
            <contact-form
              heading="Send a message"
              message-placeholder="Tell me what you have in mind, whether it's a recording project, a gig, or a question."
            ></contact-form>
          </div>

          <div class="col-12 col-lg-5 text-lg-start">
            <div class="contact-aside">
              <h2 class="h4 mb-2">Prefer email?</h2>
              <p class="mb-4">
                <a href="mailto:contact@chrispecmusic.com" class="contact-email">
                  contact@chrispecmusic.com
                </a>
              </p>

              <h2 class="h4 mb-2">Booking something specific?</h2>
              <p class="text-muted mb-3">
                These pages cover how it works, what's included, and what it costs.
              </p>
              <div class="aside-actions mb-4">
                <nuxt-link class="btn btn-ghost" to="/book-session">Recording session</nuxt-link>
                <nuxt-link class="btn btn-ghost" to="/book-live-gig">Live gig</nuxt-link>
              </div>

              <h2 class="h4 mb-2">Elsewhere</h2>
              <social-links class="aside-social"></social-links>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeo({
  title: 'Contact | Chris Pecoraro, Chicago Bassist',
  description: 'Get in touch with Chris Pecoraro about remote bass recording sessions or live bookings. Email contact@chrispecmusic.com or use the contact form.',
});
</script>

<style scoped>
.contact-aside {
  padding: 2rem;
  border-radius: var(--radius-lg);
  background-color: rgba(var(--text-color-rgb), 0.06);
  border: 1px solid rgba(var(--text-color-rgb), 0.14);
}

.contact-email {
  font-weight: 600;
  font-size: 1.05rem;
  word-break: break-word;
}

.aside-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.aside-actions .btn {
  padding: 0.6rem 1.1rem;
  font-size: 0.95rem;
}

.aside-social {
  display: block;
}
</style>
