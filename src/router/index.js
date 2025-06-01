import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Menu from '../views/Menu.vue'
// import Welcome from '../views/Welcome.vue'

const routes = [
  // { path: '/', name: 'Home', component: Home },
  // { path: '/menu', name: 'Menu', component: Menu },
  // { path: '/welcome', name: 'Welcome', component: Welcome },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
