<template>
  <div>
    <h2>例子一</h2>
    <div class="demo1">
        <div class="item" v-for="item in 7"></div>
    </div>

    <h2>例子二</h2>
    <div class="demo2"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.demo1 {
//   width: 300px;
  background: pink;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 24%;
    height: 100px;
    background-color: skyblue;
    margin-top: 15px;
  }
  .item:not(:nth-child(4n)) {
    margin-right: calc(4% / 3);
  }
}
</style>