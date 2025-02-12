<template>
  <div class="container mt-5 bg-dark text-white p-4 rounded">
    <h2 class="mb-4 text-center">Upcoming Events</h2>
    
    <!-- Loading Icon -->
    <div v-if="loading" class="text-center py-4">
      <i class="fa fa-spinner fa-spin fa-2x"></i> <!-- Add a spinner icon -->
    </div>
    
    <!-- Events List -->
    <div v-if="!loading && events.length" class="list-group">
      <div v-for="(event, index) in limitedEvents" :key="event.id" class="list-group-item list-group-item-dark mb-3">
        <div class="p-2">
          <h5 class="mb-1">{{ event.summary }}</h5>
          <small>{{ formatEvent(event.start.dateTime, event.end.dateTime) }}</small>
        </div>
        <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(event.location)" target="_blank" class="mb-1 text-info">{{ event.location }}</a>
        <p v-if="event.description" class="mt-2 mb-0">{{ event.description }}</p>
      </div>
      <div v-if="events.length > limit" class="text-center mt-3">
        <a href="/events" class="text-info">See all</a>
      </div>
    </div>

    <!-- No Events Message -->
    <p v-else-if="!loading" class="text-muted text-center">No upcoming events.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  limit: {
    type: Number,
    default: Infinity
  }
});

const events = ref([]);
const loading = ref(true); // Add loading state

async function getEvents() {
  const response = await $fetch('https://api.chrispecmusic.com/events');
  events.value = JSON.parse(response).items;
  loading.value = false; // Set loading to false once the events are loaded
}

function formatEvent(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = startDate.toLocaleDateString(undefined, options);
  const formattedStartTime = startDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const formattedEndTime = endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
}

const limitedEvents = computed(() => {
  return events.value.slice(0, props.limit);
});

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

/* Add some margin for the spinner */
.text-center i {
  margin-top: 50px;
}
</style>