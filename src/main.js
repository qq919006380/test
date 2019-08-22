import Vue from 'vue';
import App from './app.vue';
import routes from './router/routers.js';
import VueRouter from 'vue-router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueRouter)

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
new Vue({
    el: "#app",
    router,
    render: (h) => h(App)
})