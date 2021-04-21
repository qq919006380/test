<template>
  <div>
    <cp v-if="isVisibel" :data="arr"></cp>
  </div>
</template>

<script>
import cp from "./cp.vue";
export default {
  components: { cp },
  data() {
    return {
      arr: {},
      isVisibel: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isVisibel = true;//当v-if等于true的时候，组件内部还没渲染到watch就得到了this.obj的值，所以不会触发组件内部的watch。
        this.$set(this.arr, "a", "aaa");//因此要给这行套上$nextTick等组件渲染完成了，watch才会触发。
    }, 300);
  },
};
</script>
