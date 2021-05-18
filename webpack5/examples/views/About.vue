<template>
  <div ref="host"></div>

  <div class="overlay">
    <svg id="svg"></svg>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";

export default {
  setup() {
    let doms = reactive({
      host: null,
    });

    onMounted(() => {
     
    });
    return { ...toRefs(doms) };
  },
};
</script>