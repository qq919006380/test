<template>
  <div>
    <ul>
      <li>
        <router-link to="/">index</router-link>
      </li>
      <li>
        <router-link to="/week">week</router-link>
      </li>
      <li>
        <router-link to="/pop">pop</router-link>
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
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

<style>
</style>
