<template>
  <div ref="host">说 </div>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
  setup(props) {
    var host = ref(null);
    onMounted(() => {
      host = host;
      console.log(host.value.getBoundingClientRect())
    });
    return { host };
  },
};
</script>