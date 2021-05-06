<template>
  <div id="app">
    <ul>
      <li>问题：</li>
      <li>
        data视图不会响应数据变化。
        原因是，我们先将data中的count取了出来，再合并到this.$data中
        但是一旦count被取出来，它就是一个单纯的简单类型数据，响应式就丢了————
        {{ count }}
      </li>
      <li>
        方案1：解构可能有风险，优先使用引用本身，而不是解构它————{{ count2 }}
      </li>
      <li>方案2：可以通过computed让解构变得安全————{{ count3 }}</li>
      <li>方案3：还可以通过toRefs让解构变得安全————{{ count4.count.value }}</li>
    </ul>

    <ul>
      <li>原则：</li>
      <li>时刻记住setup只会执行一次</li>
      <li>永远不要直接使用简单类型</li>
      <li>解构可能有风险，优先使用引用本身，而不是解构它</li>
      <li>可以通过一些手段让解构变得安全</li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, computed, toRefs } from "vue";

export default {
  setup() {
    const data = reactive({
      count: 0,
    });
    const count2 = ref(0);
    const count3 = computed(() => data.count);
    const count4 = toRefs(data);
    setInterval(() => {
      data.count += 1;
      count2.value += 1;
    }, 1000);
    return {
      count: data.count,
      count2,
      count3,
      count4,
    };
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>