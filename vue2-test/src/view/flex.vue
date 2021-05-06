<template>
  <div>
    <h2>例子一:列数固定</h2>
    <div class="demo1">
        <div class="item" v-for="item in 35"></div>
    </div>

    <h2>例子二：子项宽度不固定</h2>
    <div class="demo2" >
      <div class="item" v-for="item in 35" :style="{width:item*8+'px'}">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.demo1 {
  background: pink;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 18%;
    height: 100px;
    background-color: skyblue;
    margin-top: 15px;
  }
  .item:not(:nth-child(5n)) {
    margin-right: calc(10% / 4);
    background: purple;
  }
}
.demo2{
  background: pink;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item{
    height: 100px;
    background: rebeccapurple;
    margin: 15px;
  }
  .item:last-child{
    margin-right: auto;
  }
}
</style>