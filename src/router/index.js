import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RestaurantMenu from '../components/RestaurantMenu.vue'
import SavatPage from '../views/SavatPage.vue'
import CheckoutDelivery from '../views/CheckoutDelivery.vue'
// import TestMenu from '../components/TestMenu.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/savat', name: 'SavatPage', component: SavatPage },
  { path: '/checkout-delivery', name: 'CheckoutDelivery', component: CheckoutDelivery },
  { path: '/restaurant/:id', name: 'RestaurantMenu', component: RestaurantMenu },
  // { path: '/test', name: 'Test', component: Test },
  // { path: '/welcome', name: 'Welcome', component: Welcome },
]

export default createRouter({
  history: createWebHistory(),
  routes
});

