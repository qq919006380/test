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
import "../../_style/index.less";
export default {
  name: "Card",
  props: {
    elevation: { type: [Number, String], default: 0 },
    header: String,
  },

  setup(props, c) {
    let hostMap = null;
    let data = reactive({
      host: "",
    });

    onMounted(() => {
      hostMap = reactive(new render(data.host));
      hostMap.setSvgStyle({
        hachureGap: 1,
      });
      hostMap.on("watchDom", (rough) => {
        elevation(rough);
        (c.slots.header || props.header) && line(rough);
      });
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
      hostMap.svg.setAttributeNS(null, "width", hostMap.s.width + elev * 2);
      hostMap.svg.setAttributeNS(null, "height", hostMap.s.height + elev * 2);
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
  .card__header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card_content {
    padding: 20px;
  }
}
</style>

