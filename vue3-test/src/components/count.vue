<template>
  <div>
    asd
    <div>{{ num }}</div>
    <button @click="click">add</button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
export default defineComponent ({
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