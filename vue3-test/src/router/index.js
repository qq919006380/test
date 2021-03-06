import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {path: '/',name: 'Home',component:  () => import('../views/Home.vue')},
  {path: '/about',name: 'About',component: () => import('../views/setup/setup.vue')},
  {path: '/event',name: 'event',component: () => import('../views/event/index.vue')},
  {path: '/todoList',name: 'todoList',component: () => import('../views/todoList/index.vue')},
  {path: '/v-model',name: 'v-model',component: () => import('../views/vModel/index.vue')},
  {path: '/promise',name: 'promise',component: () => import('../views/promise.vue')},
  {path: '/slot',name: 'slot',component: () => import('../views/slot/index.vue')},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export  {router,routes}
