import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
import xui from '../packages'

const app = createApp(App)
app.use(xui)
app.use(router)
app.mount('#app')

