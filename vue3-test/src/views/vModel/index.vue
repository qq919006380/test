<template>
  外面的value：{{ value }}
  <Inputx v-model="value"></Inputx>
</template>

<script>
import Inputx from "./input.vue";
export default {
  components: {
    Inputx,
  },

  data() {
    return {
      value: "xx",
    };
  },
};
</script>

<style>
</style>