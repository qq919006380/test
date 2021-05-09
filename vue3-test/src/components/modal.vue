<template>
  <button @click="visibleModel = true">打开一个teleport弹窗</button>
  <teleport to=".asdasd">
    <div v-if="visibleModel">
      我是弹窗
      <button @click="visibleModel = false">关闭</button>
    </div>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      visibleModel: true,
    };
  },
};
</script>

<style>
</style>