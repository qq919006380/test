<template>
  <div>
    <div>data:{{title}}</div>
    <div>
      <input v-model="text" />
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    text(newValue) {
      this.$emit("update:title", newValue);
    }
  },
  props: {
    title: String
  },
  data() {
    return {
      text: ""
    };
  }
};
</script>

<style>
</style>