import Vue from 'vue';
import App from './app.vue';
import routes from './router/routers.js';
import VueRouter from 'vue-router'
import iviewArea from 'iview-area';
import ElementUI from 'element-ui';
import axios from 'axios';


import 'element-ui/lib/theme-chalk/index.css';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueRouter)
Vue.use(iviewArea);
Vue.use(ElementUI);
Vue.prototype.axios=axios


const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
new Vue({
    el: "#app",
    router,
    render: (h) => h(App)
})