<template>
  <div>
    <div>data:{{xxx}}</div>
  </div>
</template>

<script>
export default {
  methods: {
    handleParentClick(e) {
      this.xxx = e;
    }
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