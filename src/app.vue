<template>
  <div>
    <div class="nav">
      <router-link to="/">index</router-link>
      <router-link to="/week">选择周</router-link>
      <router-link to="/pop">pop</router-link>
      <router-link to="/initData">初始化data</router-link>
      <router-link to="/orderTable">订单table</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {}
    };
  }
};
</script>

<style scoped lang='less'>
.nav {
  font-size: 16px;
  & > a {
    margin: 0 10px;
  }
}
</style>
