<template>
  <div v-show="visible" class="pencil_host pencil_Toast" ref="host">
    <div>内容：{{message}}</div>
    <div @click.stop="close">关闭</div>
  </div>
</template>
<script>
import { render } from "../../_util/util.js";
import { ref, onMounted } from "vue";
import "../../_style/index.less";
export default {
  props: {
    message: {
      type: [String, Object],
      default: "",
    },
  },
  name: "Toast",
  setup(props) {
    const host = ref(null);
    let visible = ref(false);
    let hostMap = null;
    onMounted(() => {
      visible.value = true;
      hostMap = new render(host.value);
    });
    function close() {
      visible.value = false;
    }
    return { host, visible, close };
  },
};
</script>
<style lang="less">
</style>
