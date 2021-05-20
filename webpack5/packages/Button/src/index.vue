<template>
  <div
    class="host"
    ref="host"
    :class="{ disabled: disabled }"
    @click="$emit('click', $event.target)"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { render } from "../../_util/util.js";
export default {
  name: "Button",
  props: {
    elevation: { type: [Number, String], default: 0 },
    disabled: { type: Boolean, default: false },
    type: {
      type: String,
      default: "default",
      validator: (val) => {
        return [
          "default",
          "primary",
          "info",
          "success",
          "warning",
          "error",
        ].includes(val);
      },
    },
  },

  setup(props) {
    const host = ref(null);
    let hostMap = null;
    var assignObj = {
      default: {},
      primary: {
        fill: "#2d8cf0",
      },
      info: {
        fill: "#2db7f5",
      },
      success: {
        fill: "#19be6b",
      },
      warning: {
        fill: "#ff9900",
      },
      error: {
        fill: "#ed4014",
      },
    };
    onMounted(() => {
      let type = props.type || "default";
      hostMap = new render(host.value);
      hostMap.setSvgStyle(assignObj[type]);
      hostMap.on("watchDom", (rough) => {
        elevation(rough);
      });
    });
    function elevation(rough) {
      var elev = props.elevation;
      hostMap.svg.setAttributeNS(null, "width", hostMap.s.width + elev * 2);
      hostMap.svg.setAttributeNS(null, "height", hostMap.s.height + elev * 2);

      const rc = rough.svg(hostMap.svg);
      for (var i = 0; i <= elev; i++) {
        if (elev === 0) return;
        var elevation = rc.linearPath(
          [
            [hostMap.s.width + i * 2, 0 + i * 2],
            [hostMap.s.width + i * 2, hostMap.s.height + i * 2],
            [hostMap.s.width + i * 2, hostMap.s.height + i * 2],
            [0 + i * 2, hostMap.s.height + i * 2],
          ],
          {
            bowing: 2, //弯曲
            stroke: hostMap.decoration.stroke,
          }
        );
        elevation.style.opacity = 1 - i * 0.12;
        hostMap.svg.appendChild(elevation);
      }
    }

    return { host };
  },
};
</script>



<style lang="less" scoped>
.host {
  min-width: 1px;
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
  outline: none;
  & /deep/ .overlay {
    z-index: -3;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    & /deep/ svg {
      overflow: visible;
      display: block;
    }
    & /deep/ svg /deep/ path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
      transition: transform 0.05s ease;
    }
  }
}
.host:active /deep/ path {
  transform: scale(0.97) translate(0.5%, 0.5%);
}

.host:focus /deep/ path {
  stroke-width: 1.5;
}

.host.disabled {
  opacity: 0.6 !important;
  background: rgba(0, 0, 0, 0.07);
  cursor: default;
  pointer-events: none;
}
</style>

