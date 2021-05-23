<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Tab",
};
</script>
<style lang="less" scoped>
.content {
  padding: 20px;
}
</style>
