<template>
  <div class="box" ref="div">xxx</div>
  <Button>232123</Button>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    var div = ref(null);
    onMounted(() => {
      console.log(div.value);
      watchDom();
    });

    function watchDom(dom) {
      return new Promise((res, rej) => {
        new ResizeObserver(() => {
          console.log(23);
          res()
        }).observe(div.value);
      });
    }

    return { div };
  },
  beforeCreate(){
    console.log(document.querySelector('.box'))
  }
};
</script>

<style>
.box {
  border: solid 1px;
}
</style>    