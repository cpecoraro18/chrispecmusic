import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js' // Add this line

const app = createApp(App);
    
app.use(router).mount('#app');

console.log(app)
