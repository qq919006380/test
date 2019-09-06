<template>
  <div>
    <cup>
      <p slot="top">top</p>
      <p slot="top">第二个top</p>
      <Button slot='top'>xxx</Button>
      <!-- <p>啊啊啊啊</p>
      <p slot="bottom">底部</p> -->
    </cup>
  </div>
</template>
<script>
import cup from "./slot.vue";
export default {
  components: {
    cup
  }
};
</script>