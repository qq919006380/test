<template>
  <Child v-model="title"></Child>
</template>
<script>
import Child from "./child";
export default {
  components: { Child },
  data() {
    return {
      title: "react",
    };
  },
};
</script>