<template>
  <div>
    <div>{{obj}}</div>
    <div>{{arr}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        a: "aa",
        b: "bb"
      },
      arr: ["a", "b"]
    };
  },
  mounted() {
    setTimeout(() => {
      /**obj error */
      // Vue 不能检测对象属性的添加或删除
      this.obj.c = "xxx";
      // this.$set(this.obj, "c", "xxx");
      /**arr error*/
      this.arr[0] = "我发生了变化";
      this.arr.length=0//除非用arr.splice(0)
    }, 800);
  }
};
</script>

<style>
</style>
