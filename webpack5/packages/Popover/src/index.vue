<template>
  <teleport to="body">
    <div class="pencil_host pencil_Popover" ref="host" v-if="modalOpen">
      <slot name="content">
        I'm a teleported modal! (My parent is "body")
        <button @click="modalOpen = false">Close</button>
      </slot>
    </div>
  </teleport>

  <div @click="modalOpen = true">
    <slot></slot>
  </div>
</template>
<script>
import { render } from "../../_util/util.js";
import { ref, onMounted, watchEffect, nextTick } from "vue";
import "../../_style/index.less";
export default {
  props: {},
  name: "Popover",
  setup(props, ctx) {
    const host = ref(null);
    let hostMap = null;
    let modalOpen = ref(true);
    watchEffect(() => {
      if (modalOpen.value) {
        nextTick(() => {
          hostMap = new render(host.value, [
            [690, 130],
            [790, 140],
            [750, 240],
            [690, 220],
          ]);
        });
      }
    });
    onMounted(() => {});
    return { host, modalOpen };
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
