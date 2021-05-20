<template>
    <div class="host" ref="host">x</div>
</template>
<script>
import { render } from "../../_util/util.js";
import { ref, onMounted } from "vue";
export default {
    name:"Checkbox",
    setup(props) {
      const host = ref(null);
      let hostMap = null;
      onMounted(() => {
        hostMap = new render(host.value);
      });
      return {host}
    }
}
</script>
<style lang="less" scoped>
.host {
  display: block;
  font-family: inherit;
  outline: none;
  display: inline-block;
  white-space: nowrap;
}
.host.disabled {
  opacity: 0.6 !important;
  cursor: default;
  pointer-events: none;
}.host.disabled svg {
  background: rgba(0, 0, 0, 0.07);
}
:host(:focus) /deep/ path {
  stroke-width: 1.5;
}
& /deep/ .overlay {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
}
& /deep/ svg {
  display: block;
}
& /deep/ svg /deep/ path {
  stroke: var(--wired-checkbox-icon-color, currentColor);
  stroke-width: 0.7;
}
</style>
