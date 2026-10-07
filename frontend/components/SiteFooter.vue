<template>
  <footer class="footer surface-charcoal on-dark text-center py-3 mt-auto">
    <div class="container d-flex justify-content-between align-items-center">
      <p class="mb-0">&copy; 2026 ChrisPecMusic</p>
      <div>
        <social-links></social-links>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
}
</script>

<style scoped>
.footer {
  bottom: 0;
  width: 100%;
  /* Charcoal like the header, and like the closing CTA band that usually sits
     right above it, so a hairline keeps the two from running together. */
  border-top: 1px solid rgba(var(--fg-rgb), 0.12);
}
</style>