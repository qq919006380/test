<template>
  <div>
    <Emit @click="on"></Emit>
  </div>
  <div>
    {{ count }}
    <Emit2 v-model="count"></Emit2>
  </div>
</template>

<script>
import Emit from "./emit.vue";
import Emit2 from "./emit2.vue";
export default {
  components: {
    Emit,
    Emit2,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    on() {
      console.log(23);
    },
  },
};
</script>

<style>
</style>