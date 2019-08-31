<template>
  <div>
    <div>
      <Input v-model="text" style="width:200px;"></Input>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    text(newValue) {
      this.$emit("update_title", newValue);
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