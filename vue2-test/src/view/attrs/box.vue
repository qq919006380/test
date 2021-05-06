<template>
  <div>
      <div class="box"></div>
  </div>
</template>

<script>
export default {
created(){
    // $attrs是获取父元素的属性(除了class和style)
     console.info(this.$attrs, );
}
}
</script>

<style scoped lang='less'>
.box{
    width: 100px;
    height: 100px;
    border:solid 1px
}
</style>