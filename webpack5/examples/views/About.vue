<template>
  <Card></Card>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const root = ref(null);

    return {
      root,
    };
  },
};
</script>