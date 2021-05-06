<template>
  <div>
    <div>props:{{value}}</div>
    <div>watch:{{xxx}}</div>
  </div>
</template>

<script>
export default {
  watch: {
    value(val) {
      this.xxx = val;
    }
  },
  props: {
    value: null
  },
  data() {
    return {
      xxx: ""
    };
  }
};
</script>

<style>
</style>