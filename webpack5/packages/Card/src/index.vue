<template>
  <div class="host" ref="root">
    <div v-if="$slots.header || header" class="card__header">
      <slot name="header">{{ header }}</slot>
    </div>

    <slot></slot>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { render } from "../../_util/util.js";
export default {
  name: "Card",
  props: {
    elevation: { type: [Number, String], default: 0 },
    header:String
  },

  setup(props) {
    const root = ref(null);
    let r = null;

    onMounted(() => {
      r = new render(root.value);
      r.appendSvg((rough) => {
        elevation(rough);
      });

      r.setDecoration(props.type);
    });

    function elevation(rough) {
      var elev = props.elevation;
      const rc = rough.svg(r.svg);
      for (var i = 0; i <= elev; i++) {
        if (elev === 0) return;
        var elevation = rc.linearPath(
          [
            [r.s.width + i * 2, 0 + i * 2],
            [r.s.width + i * 2, r.s.height + i * 2],
            [r.s.width + i * 2, r.s.height + i * 2],
            [0 + i * 2, r.s.height + i * 2],
          ],
          {
            bowing: 2, //弯曲
            stroke: r.decoration.stroke,
          }
        );
        elevation.style.opacity = 1 - i * 0.12;
        r.svg.appendChild(elevation);
      }
    }

    return { root };
  },
};
</script>



<style lang="less" scoped>
.host {
  width: 480px;
  font-family: inherit;
  padding: 20px;
  position: relative;
  .overlay {
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
</style>

