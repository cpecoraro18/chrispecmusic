<template>
  <!--
    Chrome-free layout for standalone landing pages.

    /links is a link-in-bio destination reached from an Instagram or YouTube
    profile: its whole job is the stack of buttons. Wrapping it in the site nav
    and footer gave visitors a dozen competing exits from a page designed to
    have seven.
  -->
  <main id="main" class="main-content">
    <slot />
  </main>
</template>
