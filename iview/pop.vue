<template>
  <div>{{message}}</div>
</template>

<script>
export default {
  watch: {
    message: {
      handler(val) {
        console.log(val);
      },
      deep: true
    }
  },
  props: {
    message: Object
  }
};
</script>

<style>
</style>
