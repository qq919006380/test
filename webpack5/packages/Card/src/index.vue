<template>
  <div class="host" ref="host">
    <div v-if="$slots.header || header" class="card__header">
      <slot name="header">{{ header }}</slot>
    </div>

    <div class="card_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { render } from "../../_util/util.js";
export default {
  name: "Card",
  props: {
    elevation: { type: [Number, String], default: 0 },
    header: String,
  },

  setup(props) {
    let hostMap = null;
    let data = reactive({
      host: "",
    });

    onMounted(() => {
      hostMap = reactive(new render(data.host));
      hostMap.appendSvg((rough) => {
        elevation(rough);
        line(rough);
      });

      hostMap.setDecoration(props.type);
    });
    function line(rough) {
      const rc = rough.svg(hostMap.svg);
      let headerDom = hostMap.$(".card__header").getBoundingClientRect();
      var line = rc.line(
        0,
        headerDom.height,
        headerDom.width,
        headerDom.height
      );
      hostMap.svg.appendChild(line);
    }
    function elevation(rough) {
      var elev = props.elevation;
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

    return { ...toRefs(data) };
  },
};
</script>



<style lang="less" scoped>
.host {
  width: 480px;
  font-family: inherit;
  position: relative;
  .card__header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card_content {
    padding: 20px;
  }
  & /deep/.overlay {
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
    }
  }
}
</style>

