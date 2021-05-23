<template>
  <div class="pencil_host pencil_Popover" ref="host"></div>
  <Button><slot></slot></Button>
</template>
<script>
import { render } from "../../_util/util.js";
import { ref, onMounted } from "vue";
import "../../_style/index.less";
export default {
  props: {},
  name: "Popover",
  setup(props) {
    const host = ref(null);
    let hostMap = null;
    onMounted(() => {
      hostMap = new render(host.value);
    });
    return { host };
  },
};
</script>
<style lang="less">
.pencil_Popover {
  min-width: 1px;
  padding: 8px 13px;
  display: inline-block;
}
</style>
