<template>
  <footer class="footer bg-dark text-white text-center py-3 mt-auto">
    <div class="container d-flex justify-content-between align-items-center">
      <p class="mb-0">&copy; 2025 ChrisPecMusic</p>
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
}
</style>