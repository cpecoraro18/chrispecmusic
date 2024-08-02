import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'
import ServicesPage from './components/ServicesPage.vue'
import ContactPage from './components/ContactPage.vue'
import PortfolioPage from './components/PortfolioPage.vue'

export default createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  mode: 'hash',
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/services', component: ServicesPage },
    { path: '/contact', component: ContactPage },
    { path: '/portfolio', component: PortfolioPage }
  ]
})