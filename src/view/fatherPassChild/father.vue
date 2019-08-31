<template>
  <div class="container">
    <div class="box">
      <h2>方法一:props</h2>
      <div class="father">
        <Input v-model="PropsChildData" style="width:200px"></Input>
        <PropsChild :message="PropsChildData"></PropsChild>
      </div>
    </div>
    <div class="container">
      <div class="box">
        <h2>方法一:v-model</h2>
        <div class="father">
          <Input v-model="vModelChildData"></Input>
          <vModelChild v-model="vModelChildData"></vModelChild>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PropsChild from "./props-child";
import vModelChild from "./v-model-child";
export default {
  methods: {},

  data() {
    return {
      PropsChildData: "",
      vModelChildData: ""
    };
  },
  components: {
    PropsChild,
    vModelChild
  }
};
</script>

<style scoped lang='less'>
.container {
  display: flex;
  .father {
    border: solid 1px;
    position: relative;
    padding: 20px 0;
    width: 300px;
    height: 300px;
    margin: 0 10px;
    &::after {
      content: "父级";
      display: inline-block;
      position: absolute;
      background: #fff;
      top: -8px;
      left: 8px;
      padding: 0 10px;
    }
  }
}
</style>