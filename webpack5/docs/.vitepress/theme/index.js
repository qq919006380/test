import theme from 'vitepress/dist/client/theme-default'
import pencil from '../../../packages'
import home from './components/home.vue';
import demoBlock from './components/demo-block.vue';
export default {
  ...theme,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app }) {
    app.component("home", home)
    app.component('DemoBlock', demoBlock)
    app.use(pencil)
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  }
}