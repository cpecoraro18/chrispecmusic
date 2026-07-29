<template>
  <!-- The skip link has been styled in main.css for a while but was never
       rendered, so keyboard users had no way past the nav. -->
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" class="main-content">
    <slot />
  </main>
  <SiteFooter />
</template>
