<template>
  <div class="host" ref="host" :class="{ disabled: disabled }">
    <input
      @change="$emit('update:modelValue', $event.target.checked)"
      type="checkbox"
      v-model="modelValue"
    />
  </div>
  <slot></slot>——{{modelValue}}
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
  setup(props, ctx) {
    const host = ref(null);
    let hostMap = null;

    onMounted(() => {
      hostMap = new render(host.value);
      // 发布-点击dom
      host.value.addEventListener(
        "click",
        () => {
          hostMap.emit("clickDom", hostMap.rough);
        },
        false
      );
      hostMap.on("watchDom", (rough) => {
        if (props.modelValue) addTick(rough);
      });
      hostMap.on("clickDom", (rough) => {
        if (props.modelValue) {
          hostMap.svg.removeChild(hostMap.svg.lastChild);
        } else {
          addTick(rough);
        }
      });
    });
    function change(e) {
      ctx.emit("update:modelValue", e.target.checked);
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
    return { change, host };
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
