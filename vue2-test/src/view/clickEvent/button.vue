<template>
  <div>
    <button @click="event">测试按钮</button>
  </div>
</template>

<script>
export default {
  methods: {
    event() {
      console.log("测试按钮");
      document.body.style.overflow = 'hidden';
    },
    aaa(){
      console.log('还是测试按钮')
    }
  },
};
</script>

<style>
</style>