<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
.wrap {
  color: #eee;
  .top {
    background: hsl(60, 50%, 50%);
  }
  .main {
    display: flex;
    .left {
      flex: 0 0 200px;
      background: hsl(120, 50%, 50%);
    }
    .middle {
      flex: 1 1 auto;
      background: hsl(180, 50%, 50%);
    }
    .right {
      flex: 0 0 200px;
      background: hsl(240, 50%, 50%);
    }
  }
  .bottom {
    background: hsl(300, 50%, 50%);
  }
}
</style>
<template>
  <div class="wrap cup">
    <div @click="on" class="top">
      <slot name="top">默认top数据</slot>
    </div>
    <div class="main">
      <div class="left">
        <slot name="left">默认left数据</slot>
      </div>
      <div class="middle">
        <slot>默认middle数据</slot>
      </div>
      <div class="right">
        <slot name="right">默认right数据</slot>
      </div>
    </div>
    <div class="bottom">
      <slot name="bottom">默认bottom数据</slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    on() {
      console.log("xxx");
    }
  }
};
</script>