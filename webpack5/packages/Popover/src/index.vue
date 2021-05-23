<template>
  <teleport to="body">
    <div
      :class="'popover_position_' + position"
      class="pencil_host pencil_Popover"
      ref="host"
      v-if="modalOpen"
    >
      <slot name="content"></slot>
    </div>
  </teleport>

  <div class="popover_contentWrapper" ref="contentWrapper">
    <slot></slot>
  </div>
</template>
<script>
import { render } from "../../_util/util.js";
import {
  ref,
  onMounted,
  watchEffect,
  nextTick,
  computed,
  onUnmounted,
} from "vue";
import "../../_style/index.less";
export default {
  name: "Popover",
  props: {
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "left", "right"].indexOf(value) >= 0;
      },
    },
    trigger: {
      type: String,
      default: "click",
      validator(value) {
        return ["click", "hover"].indexOf(value) >= 0;
      },
    },
  },
  setup(props, ctx) {
    const host = ref(null);
    const contentWrapper = ref(null);
    let hostMap = null;
    let modalOpen = ref(false);

    watchEffect(() => {
      if (modalOpen.value) {
        nextTick(() => {
          hostMap = new render(host.value, csys());
          hostMap.setSvgStyle({
            bowing: 2,
          });
          positionContent();
          // 渲染svg坐标
          function csys() {
            const { width: w, height: h } = host.value.getBoundingClientRect();
            const { width } = contentWrapper.value.getBoundingClientRect();
            var offset = 0;
            let val = "";
            switch (props.position) {
              case "top":
                val = [
                  [2, 2],
                  [w - 2, 2],
                  [w - 2, h - offset],
                  [width / 2 + 8, h - offset],
                  [width / 2, h - offset + 8],
                  [width / 2 - 8, h - offset],
                  [0, h - offset],
                ];
                break;
              case "left":
                val = [
                  [2, 2],
                  [w - offset, 2],
                  [w - offset, h / 2 - 8],
                  [w - offset + 8, h / 2],
                  [w - offset, h / 2 + 8],
                  [w - offset, h],
                  [2, h - 2],
                ];
                break;
              case "right":
                val = [
                  [offset, 2],
                  [w - 2, 2],
                  [w - 2, h - 2],
                  [offset, h - 2],
                  [offset, h / 2 + 8],
                  [offset - 8, h / 2],
                  [offset, h / 2 - 8],
                ];

                break;
              default:
                val = [
                  [2, offset],
                  [0, h - 2],
                  [w - 2, h - 2],
                  [w - 2, offset],
                  [width / 2 + 8, offset],
                  [width / 2, offset - 8],
                  [width / 2 - 8, offset],
                ];
            }
            return val;
          }
          // 弹窗的位置
          function positionContent() {
            const {
              width,
              height,
              top,
              left,
            } = contentWrapper.value.getBoundingClientRect();

            const { height: height2 } = host.value.getBoundingClientRect();
            let positions = {
              top: {
                top: top + window.scrollY,
                left: left + window.scrollX,
              },
              bottom: {
                top: top + height + window.scrollY,
                left: left + window.scrollX,
              },
              left: {
                top: top + window.scrollY + (height - height2) / 2,
                left: left + window.scrollX,
              },
              right: {
                top: top + window.scrollY + (height - height2) / 2,
                left: left + window.scrollX + width,
              },
            };
            host.value.style.left = positions[props.position].left + "px";
            host.value.style.top = positions[props.position].top + "px";
          }
        });
      }
    });
    onMounted(() => {
      addPopoverListeners();
    });
    onUnmounted(() => {
      removePopoverListeners();
    });
    var onClick = () => {
      modalOpen.value = !modalOpen.value;
    };
    var open = () => {
      modalOpen.value = true;
    };
    var close = () => {
      modalOpen.value = false;
    };
    function addPopoverListeners() {
      if (props.trigger === "click") {
        window.el = contentWrapper.value;
        contentWrapper.value.addEventListener("click", onClick);
      } else {
        contentWrapper.value.addEventListener("mouseenter", open);
        contentWrapper.value.addEventListener("mouseleave", close);
      }
    }
    function removePopoverListeners() {
      if (props.trigger === "click") {
        contentWrapper.value.removeEventListener("click", onClick);
      } else {
        contentWrapper.value.removeEventListener("mouseenter", open);
        contentWrapper.value.removeEventListener("mouseleave", close);
      }
    }

    return { host, modalOpen, contentWrapper };
  },
};
</script>
<style lang="less">
.pencil_Popover {
  min-width: 1px;
  padding: 8px 13px;
  position: absolute;
  display: inline-block;

  &.popover_position_top {
    transform: translateY(-100%);
    margin-top: -10px;
  }
  &.popover_position_bottom {
    margin-top: 10px;
  }
  &.popover_position_left {
    transform: translateX(-100%);
    margin-left: -10px;
  }
  &.popover_position_right {
    margin-left: 10px;
  }
}
.popover_contentWrapper {
  display: inline-block;
}
</style>
