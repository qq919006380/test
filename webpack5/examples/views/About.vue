<template>
  <div ref="host">说</div>
  <input type="text" v-model="position" />
  points：{{ points }}
</template>
<script>
import { computed, onMounted, ref } from "vue";
export default {
  setup(props) {
    var host = ref(null);
    let position = ref(null);
    let points = ref(null);
    onMounted(() => {
      host = host;
      console.log(host.value.getBoundingClientRect());
    });
    points = computed(() => {
      var a = "";
      switch (position.value) {
        case "top":
          a = "top_2231";
          break;
        case "left":
          a = "left_222";
          break;
        default:
          a = "default";
      }
      return a;
    });
    return { host, points, position };
  },
};
</script>