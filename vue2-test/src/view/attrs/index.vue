<template>
  <div>
    <Box xxx='测试测试' v-on="$listeners"></Box>
  </div>
</template>

<script>
import Box from "./box";
export default {
  components: {
    Box
  }
};
</script>

<style>
</style>