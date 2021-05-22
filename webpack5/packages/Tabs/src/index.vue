<template>
  <div class="host" ref="host">
    <div
      class="tab-title"
      :class="currentActive == item ? 'active' : ''"
      @click="active(item)"
      v-for="item in title"
    >
      {{ item }}
    </div>
    <component :is="c" v-for="c in defaults"></component>
  </div>
</template>
<script>
import Tab from "../../Tab";
import { render } from "../../_util/util.js";
import { ref, onMounted } from "vue";
import "../../_style/index.less";
export default {
  props: {},
  name: "Tabs",
  setup(props, ctx) {
    const host = ref(null);
    const defaults = ctx.slots.default();
    let hostMap = null;
    let currentActive = ref(null);
    defaults.forEach((val) => {
      if (val.type != Tab) {
        throw new Error("tabs 子标签必须是Tab");
      }
    });
    let title = defaults.map((val) => {
      return val.props.title;
    });

    onMounted(() => {
      hostMap = new render(host.value);
    });
    function active(item) {
      
      currentActive.value = item;
      
      console.log(item)
    }
    return { host, defaults, title, active, currentActive };
  },
};
</script>
<style lang="less" scoped>
.tab-title {
  display: inline-block;
  margin-right: 10px;
  padding: 8px;
}
.tab-title.active {
  background: pink;
}
</style>


