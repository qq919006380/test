<template>
  {{ modelValue }}
  <div class="host" ref="host">
    <div
      v-for="(title, index) in titles"
      :ref="
        (el) => {
          if (modelValue === title) selectedItem = el;
        }
      "
      @click="active(title)"
      class="tab-title"
      :class="modelValue == title ? 'active' : ''"
      :key="index"
    >
      {{ title }}
    </div>
    <div>阿萨德</div>
    <!-- <component :is="c" v-for="c in defaults"></component> -->
  </div>
</template>
<script>
import Tab from "../../Tab";
import { render } from "../../_util/util.js";
import { ref, onMounted, watchEffect } from "vue";
import "../../_style/index.less";
export default {
  name: "Tabs",
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, ctx) {
    const host = ref(null);
    const defaults = ctx.slots.default();
    let hostMap = null;
    let selectedItem = ref(null);
    defaults.forEach((val) => {
      if (val.type != Tab) {
        throw new Error("tabs 子标签必须是Tab");
      }
    });
    let titles = defaults.map((val) => {
      return val.props.title;
    });

    onMounted(() => {
      hostMap = new render(host.value);
      hostMap.on("watchDom", (rough) => {
        line(rough);
        activeLine(rough);
      });

      watchEffect(
        () => {
          //1.删除最后一个activeLine
          hostMap.svg.lastChild &&
            hostMap.svg.removeChild(hostMap.svg.lastChild);
          // 2添加activeLine
          activeLine(hostMap.rough);

          // 移动
          let { left, width } = selectedItem.value.getBoundingClientRect();
          var line = hostMap.$(".activeLine");
          line.setAttribute("transform", `translate(${left},0)`);
          
          
        },
        {
          flush: "post",
        }
      );
    });
    // 选中下划线
    function activeLine(rough) {
      var itemLine = selectedItem.value.getBoundingClientRect();
      const rc = rough.svg(hostMap.svg);
      var line = rc.line(
        0,
        itemLine.height + 18,
        itemLine.width,
        itemLine.height + 18,
        {
          stroke: "#0087D2",
          strokeWidth: 2,
        }
      );
      line.setAttributeNS(null, "class", "activeLine");
      hostMap.svg.appendChild(line);
    }
    // 默认线
    function line(rough) {
      const rc = rough.svg(hostMap.svg);
      let headerDom = hostMap.host.getBoundingClientRect();
      var line = rc.line(
        20,
        headerDom.height - 40,
        headerDom.width - 20,
        headerDom.height - 40,
        {
          stroke: "#999",
        }
      );
      hostMap.svg.appendChild(line);
    }
    function active(title) {
      ctx.emit("update:modelValue", title);
    }

    return { host, defaults, titles, active, selectedItem };
  },
};
</script>
<style lang="less" scoped>
.host {
  padding: 20px;
  max-width: 800px;
}
.tab-title {
  display: inline-block;
  margin-right: 10px;
  padding: 8px;
  cursor: pointer;
}

& /deep/ g.activeLine {
  transition: all 250ms;
}
.tab-title.active {
  // background: pink;
}
</style>



