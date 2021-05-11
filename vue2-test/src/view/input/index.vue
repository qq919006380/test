<template>
  <div>
    <div>value:{{ value }}</div>
    <Input v-model="value"></Input>
  </div>
</template>

<script>
import Input from './input';
export default {
  data() {
    return {
      value: "xx",
    };
  },
  components: {
    Input,
  },
};
</script>

<style>
</style>