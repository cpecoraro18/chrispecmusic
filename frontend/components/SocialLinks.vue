<template>
    <div>
        <a :href="`mailto:${CONTACT_EMAIL}`" rel="noopener" class="text-white mx-2" aria-label="Email">
            <AppIcon name="envelope" class="social-icon" />
        </a>
        <a href="https://www.instagram.com/chrispecmusic" target="_blank" rel="noopener" class="text-white mx-2" aria-label="Instagram">
            <AppIcon name="instagram" class="social-icon" />
        </a>
        <a href="https://www.youtube.com/@ChrisPecMusicOfficial" target="_blank" rel="noopener" class="text-white mx-2" aria-label="YouTube">
            <AppIcon name="youtube" class="social-icon" />
        </a>
    </div>
</template>

<script setup>
import { CONTACT_EMAIL } from '~/data/service';
</script>

<style scoped>
@media (max-width: 576px) {
  .social-icon {
    font-size: 2em;
  }
}
</style>