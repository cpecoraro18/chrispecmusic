<template>
  <div class="links-page">
    <div class="container">
      <img
        src="/img/ChrisPecMusicSmall.webp"
        alt="Chris Pecoraro"
        class="profile-image mb-4"
        loading="eager"
        decoding="async"
      >
      <h1 class="h2 mb-1">Chris Pecoraro</h1>
      <p class="profile-tagline mb-5">Upright &amp; Electric Bass · Chicago</p>

      <nav class="link-stack" aria-label="Links">
        <nuxt-link class="link-button link-button--primary" to="/book-session">
          <i class="fa fa-headphones" aria-hidden="true"></i>
          Book a Recording Session
        </nuxt-link>
        <nuxt-link class="link-button" to="/book-live-gig">
          <i class="fa fa-guitar" aria-hidden="true"></i>
          Book a Live Gig
        </nuxt-link>
        <nuxt-link class="link-button" to="/portfolio">
          <i class="fa fa-video" aria-hidden="true"></i>
          Portfolio &amp; Music
        </nuxt-link>
        <nuxt-link class="link-button" to="/events">
          <i class="fa fa-calendar" aria-hidden="true"></i>
          Upcoming Shows
        </nuxt-link>
        <a
          class="link-button"
          href="https://www.instagram.com/chrispecmusic"
          target="_blank"
          rel="noopener"
        >
          <i class="fab fa-instagram" aria-hidden="true"></i>
          Instagram
        </a>
        <a
          class="link-button"
          href="https://www.youtube.com/@ChrisPecMusicOfficial"
          target="_blank"
          rel="noopener"
        >
          <i class="fab fa-youtube" aria-hidden="true"></i>
          YouTube
        </a>
        <nuxt-link class="link-button" to="/contact">
          <i class="fa fa-envelope" aria-hidden="true"></i>
          Get in Touch
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
// Reached from an Instagram or YouTube profile, where the whole job of the page
// is this stack of buttons. The site nav and footer would add a dozen competing
// exits to a page deliberately designed to offer seven.
definePageMeta({ layout: 'bare' });

// Kept out of search entirely. This page is reached from an Instagram or YouTube
// bio, never from a search result, so it gives up nothing by being noindexed —
// but to a crawler it looked like the profile page for the whole site: an <h1>
// of the name over a portrait, few words, and a brand-first title structurally
// identical to the homepage's. That made it a credible answer to a search for
// the name, which is a job the homepage should have. `follow` is kept so the
// links out of here still count. Also excluded from the sitemap.
useSeo({
  title: 'Links | Chris Pecoraro, Chicago Bassist',
  description: 'All of Chris Pecoraro\'s links in one place: book a remote bass session or a live gig, watch performances, and follow on Instagram and YouTube.',
  noindex: true,
});
</script>

<style scoped>
.links-page {
  padding-block: clamp(2.5rem, 1.5rem + 4vw, 5rem);
}

.links-page .container {
  max-width: 30rem;
}

.profile-image {
  width: 9rem;
  height: 9rem;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgba(var(--text-color-rgb), 0.25);
  box-shadow: var(--shadow-lg);
}

.profile-tagline {
  color: var(--text-muted-on-dark);
  font-size: 0.95rem;
  letter-spacing: 0.03em;
}

.link-stack {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.link-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(var(--text-color-rgb), 0.4);
  color: var(--text-color);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
}

.link-button:hover,
.link-button:focus-visible {
  background-color: rgba(var(--text-color-rgb), 0.12);
  border-color: var(--text-color);
  color: var(--text-color);
  transform: translateY(-2px);
}

.link-button--primary {
  background-color: var(--text-color);
  border-color: var(--text-color);
  color: var(--blue-deep);
  box-shadow: var(--shadow-md);
}

.link-button--primary:hover,
.link-button--primary:focus-visible {
  background-color: var(--white);
  border-color: var(--white);
  color: var(--blue-deep);
}
</style>
