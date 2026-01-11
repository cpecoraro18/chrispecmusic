<template>
  <div id="app">
    <NuxtLayout>
        <SiteHeader/>
        <NuxtPage/>
        <SiteFooter/>
    </NuxtLayout>
  </div>
</template>

<script>
</script>

<style>

:root {
  --primary: #9E3B32;
  --primary-rgb: 158, 59, 50;

  --secondary: #8A8588;

  --brown: #5C4033;
  --brown-dark: #2E1F1A;
  --orange: #D17934;

  --gray: #F0F0F0;
  --gray-rgb: 240, 240, 240;

  --text-color: #F4F1EE;
  --text-color-rgb: 244, 241, 238;
  --text-color-dark: rgba(0, 0, 0, 0.7);

  --bg-dark: #2E2E2E;
  --bg-dark-blue: #4A5A75;
  --bg-grey: #D0D0D0;
  --bg-light-blue: #F4F1EE;
  --bg-light: #F0F0F0;
  --bg-black: #1A1A1A;

  --bs-body-bg: var(--bg-dark-blue) !important;
  --bs-body-color: var(--text-color) !important;

  --bs-secondary-color: var(--secondary) !important;

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
  background-color: var(--bg-dark-blue);
}

.vh-100 {
    height: 100vh;
}

.vh-75 {
    height: 75vh;
}

.content {
  margin-bottom: 5em;
}

.bg-light-blue {
  background-color: var(--bg-light-blue);
}

.btn-primary {
  background-color: var(--primary);
  border-color: var(--primary);
}

.btn-primary:hover {
    background-color: #4f2627;
    border-color: #4f2627;
}

.bg-dark {
  background-color: var(--bg-dark) !important;
}

.text-info {
  color: var(--secondary) !important;
}

.text-primary {
  color: var(--white) !important;
}


</style>