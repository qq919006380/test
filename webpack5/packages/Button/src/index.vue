<template>
  <div id="btn" class="host" :class="{disabled:disabled}" @click="$emit('click',$event.target)">
    <slot></slot>s
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
  </div>
</template>

<script>
import {render ,watchDom,} from "../../_util/util.js";
export default {
  name: "Button",
  props: {
    elevation: { type: [Number, String], default: 0 },
    disabled: { type: Boolean, default: false },
    decoration: {
      type: Object,
      default() {
        return {
          stroke: "",
          fill: "",
          fillStyle: ""
        };
      },
      validator: function(value) {
        var user_value = []; //用户输入的属性
        var a = [
          "stroke",
          "fill",
          "fillStyle",
          "hachureAngle",
          "hachureGap",
          "fillWeight"
        ]; //需要验证的属性
        var result = true; //返回的值
        for (var x in value) {
          user_value.push(x);
        }
        // 检查属性
        user_value.forEach(e => {
          if (a.indexOf(e) === -1) {
            result = false;
          }
        });
        // 检查属性类型
        return result;
      }
    }
  },
  mounted() {
    watchDom(this.$el, () => {
      render(this.$el);
    });
  },
  methods: {
   
  }
};
</script>

<style scoped>
.host {
  display: inline-block;
  font-family: inherit;
  cursor: pointer;
  padding: 8px 13px;
  position: relative;
  text-align: center;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  display: inline-flex;
  outline: none;
}
.host:active >>> path {
  transform: scale(0.97) translate(0.5%, 0.5%);
}
.host.disabled {
  opacity: 0.6 !important;
  background: rgba(0, 0, 0, 0.07);
  cursor: default;
  pointer-events: none;
}

.host:focus >>> path {
  stroke-width: 1.5;
}
.overlay {
  z-index: -3;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
svg {
  /* overflow: visible; */
  display: block;
}
svg >>> path {
  stroke: currentColor;
  stroke-width: 0.7;
  fill: transparent;
  transition: transform 0.05s ease;
}
</style>

