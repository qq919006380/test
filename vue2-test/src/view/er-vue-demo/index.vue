<template>
  <a-drawer
    placement="right"
    :closable="true"
    :visible="visible"
    width="100%"
    @close="onClose"
  >
    <div class="styles.erGraphDemo">
      <ERGraphDemo />
    </div>
  </a-drawer>
</template>

<script lang="js">
import styles from './index.less'
import ERGraphDemo from './ERGraphDemo'
export default {
  name: 'index',
  components: {
    ERGraphDemo
  },

  data () {
    return {
      visible: false,
      graph: '',
      styles: styles
    }
  },

  mounted () {
  },

  methods: {

    showDrawer () {
      // setTimeout(() => {
      //   this.initGraph()
      // }, 100)
      this.visible = true
    },

    onClose () {
      // this.graph.dispose()
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
