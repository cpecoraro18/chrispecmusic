<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Services</h1>
    <div class="text-center mb-3">
      <p class="lead">Explore live gig and studio session bass services</p>
    </div> 
    <service-cards></service-cards>
  </div>

</template>

<script setup>

useHead({
  title: 'Services - Chris Pecoraro',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Learn more about the services Chris Pecoraro offers, including studio sessions and live performances.'
    }
  ]
});

</script>
<style scoped>
</style>