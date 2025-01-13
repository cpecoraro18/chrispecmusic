<template>
  <div class="container mt-5 bg-dark text-white p-4 rounded">
    <h2 class="mb-4 text-center">Upcoming Events</h2>
    <div v-if="events.length" class="list-group">
      <div v-for="event in events" :key="event.id" class="list-group-item list-group-item-dark mb-3">
        <div class="p-2">
          <h5 class="mb-1">{{ event.summary }}</h5>
          <small>{{ formatDate(event.start.dateTime) }} - {{ formatDate(event.end.dateTime) }}</small>
        </div>
        <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(event.location)" target="_blank" class="mb-1 text-info">{{ event.location }}</a>
        <p v-if="event.description" class="mt-2 mb-0">{{ event.description }}</p>
      </div>
    </div>
    <p v-else class="text-muted text-center">No upcoming events.</p>
  </div>
</template>

<script setup>

const events = ref([]);

async function getEvents() {
  const response = await $fetch('https://api.chrispecmusic.com/events');
  console.log(response);
  events.value = JSON.parse(response).items;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

onMounted(() => {
  getEvents();
});
</script>

<style scoped>
.container {
  max-width: 800px;
}

.list-group-item {
  background-color: #333;
  border-color: #444;
}

.list-group-item h5 {
  color: #f8f9fa;
}

.list-group-item small {
  color: #ccc;
}

.list-group-item p {
  color: #bbb;
}
</style>