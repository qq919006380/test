<template>
  <div>
    <div>{{ num }}</div>
    <button @click="click()">add</button>
  </div>
</template>

<script>
export default ({
  name: 'Count',
  props: {
    num: Number
  },
  inject: ['getGraph', 'getNode'],
  methods: {
    click() {
      this.$emit('add')
      this.getNode().attr('body/strokeWidth', this.num + 1)
    }
  }
});
</script>