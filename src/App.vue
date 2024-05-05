<template>
  <div id="app">
    <SiteHeader></SiteHeader>
    <router-view>
    </router-view>
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>

<style>
:root {
  --primary: #1f2d43;
  --secondary: #a6b3c2;
  --bg-dark: #404040;
  --bg-dark-blue: #1f2d43;
  --bg-light-blue: #a6b3c2;
  --bg-light: #f0f0f0;
  --brown: #5c4033;
  --brown-dark: #2e1f1a;
  --orange: #d17934;
  
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: #1f2d43;
}

.vh-100 {
    height: 100vh;
  }
</style>
