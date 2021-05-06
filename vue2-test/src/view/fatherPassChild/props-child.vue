<template>
  <div>
    <div>props:{{message}}</div>
    <div>watch:{{xxx}}</div>
  </div>
</template>

<script>
export default {
  watch: {
    message(val) {
      this.xxx = val;
    }
  },
  props: {
    message: String
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