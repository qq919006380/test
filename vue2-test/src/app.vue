<template>
  <div>
    <div class="nav">
      <router-link v-for="item in Routers" :key="item.path"  :to="item.path">{{item.name}}</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Routers from "../src/router/routers.js";
export default {
  data() {
    return {
      Routers
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
