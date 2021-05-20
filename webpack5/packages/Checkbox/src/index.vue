<template>
  <div class="host" ref="host" :class="{ disabled: disabled }">
    <input
      @change="change"
      type="checkbox"
      v-model="currentValue"
    />
  </div>
  <slot></slot>
  {{ currentValue }}
</template>
<script>
import { render } from "../../_util/util.js";
import { ref, onMounted } from "vue";
import "../../_style/index.less";
export default {
  name: "Checkbox",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
    },
    disabled: { type: Boolean, default: false },
  },
  setup(props,ctx) {
    let currentValue = ref(props.modelValue);
    const host = ref(null);
    let hostMap = null;
    onMounted(() => {
      hostMap = new render(host.value);
      hostMap.on("watchDom", (rough) => {
        if (currentValue.value) addTick(rough);
      });
      hostMap.on("clickDom", (rough) => {
        if (currentValue.value) {
          hostMap.svg.removeChild(hostMap.svg.lastChild);
        } else {
          addTick(rough);
        }
      });
    });
    function change() {
      ctx.emit('update:modelValue', currentValue)
    }

    function addTick(rough) {
      const rc = rough.svg(hostMap.svg);
      var v = rc.linearPath(
        [
          [-3, 8],
          [10, 21],
          [32, -2],
        ],
        {
          strokeWidth: 2,
          bowing: 8,
        }
      );

      hostMap.svg.appendChild(v);
    }
    return { change, host, currentValue };
  },
};
</script>
<style lang="less" scoped>
.host {
  display: inline-block;
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
input[type="checkbox"] {
  outline: none;
  border: none;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  opacity: 0;
}
</style>
