import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component:  () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/setup/setup.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export  {router,routes}
