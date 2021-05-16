<template>
  <div ref="host">
    <div id="aaa" class="aaa">
      <div id="aaa" class="bbb"></div>
    </div>
  </div>
  {{ num }}
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";

export default {
  setup() {
    let doms = reactive({
      name: "jack",
      host: null,
    });
    let num = ref(123);
    onMounted(() => {
      console.log(doms.host.querySelector(".aaaa"))
    });
    return { ...toRefs(doms), num };
  },
};
</script>