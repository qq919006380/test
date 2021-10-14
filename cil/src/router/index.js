import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "about" */ '../views/list.vue')
  },
  {
    path: '/card',
    name: 'card',
    component: () => import(  '../views/card.vue')
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import(  '../views/radio.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
