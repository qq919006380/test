import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import { router } from './router'
import pencil from 'pencil-vue';
var app = createApp(App)

app.use(pencil)
app.use(router)

app.mount('#app')


