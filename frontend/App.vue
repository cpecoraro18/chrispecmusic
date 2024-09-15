<template>
  <div id="app">
    <SiteHeader></SiteHeader>
    <div class="content">
      <router-view>
      </router-view>
    </div>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'

export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteFooter
  },
  created() {
    const query = this.$route.query;

    if (query && query['/']) {
      const redirectPath = query['/'];

      this.$router.replace(redirectPath);
    }
  }
}
</script>

<style>
:root {
  --primary: #0066CC;
  --primary-rgb: 0, 102, 204;
  --secondary: #a6b3c2;
  --brown: #5c4033;
  --brown-dark: #2e1f1a;
  --orange: #d17934;
  --gray: #f0f0f0;
  --gray-rgb: 211, 211, 211;

  --text-color: #ffffff;
  --text-color-rgb: rgb(255,255,255);
  --text-color-dark: rgb(0,0,0, 0.7);

  --bg-dark: #404040;
  --bg-dark-blue: #1f2d43;
  --bg-light-blue: #a6b3c2;
  --bg-light: #f0f0f0;

  --bs-body-bg: var(--bg-dark-blue) !important;
  --bs-body-color: var(--text-color) !important;

  --bs-link-color: var(--text-color) !important;
  --bs-link-color-rgb: var(--text-color-rgb) !important;
  --bs-link-hover-color: var(--gray) !important;
  --bs-link-hover-color-rgb: var(--gray-rgb) !important;

  --bs-btn-bg: var(--primary) !important;

  
}
body {
  background-color: var(--bg-dark-blue);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: var(--bg-dark-blue)
}

.vh-100 {
    height: 100vh;
}

.content {
  margin-bottom: 5em;
}
</style>
