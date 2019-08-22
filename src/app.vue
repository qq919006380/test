<template>
  <div>
    <div>
      key:{{key}}
      <router-link to="/week">Go to Foo</router-link>
      <router-link to="/pop">Go to Pop</router-link>
    </div>
    <div>
      <router-view :key="key"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {},
      key:$route.path
    };
  }
};
</script>

<style>
</style>
