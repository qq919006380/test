<template>
  <div class="container">
    <div class="box">
      <h2>方法一:props</h2>
      <div class="father">
        <div>
          <Input v-model="PropsChildData" style="width:200px"></Input>
          <PropsChild :message="PropsChildData"></PropsChild>
        </div>
        <ol class="ol">
          <li></li>
        </ol>
      </div>
    </div>
    <div class="box">
      <h2>方法二:v-model</h2>
      <div class="father">
        <div>
          <Input v-model="vModelChildData"></Input>
          <vModelChild v-model="vModelChildData"></vModelChild>
        </div>
        <ol class="ol">
          <li>子组件的props使用value就能激活v-model</li>
          <li>子组件的props虽然不能随便改，但是可以通过对象的方式修改，会直接影响父组件的值，可以实现一个伪双向绑定（不建议）</li>
        </ol>
      </div>
    </div>
    <div class="box">
      <h2>方法三:ref</h2>
      <div class="father">
        <div>
          <Input v-model="refsChildData" @input="clickParent(refsChildData)"></Input>
          <refsChild ref="child1"></refsChild>
        </div>
        <ol class="ol">
          <li></li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import PropsChild from "./props-child";
import vModelChild from "./v-model-child";
import refsChild from "./refs-child";
export default {
  methods: {
    clickParent(val) {
      this.$refs.child1.handleParentClick(val);
    }
  },

  data() {
    return {
      PropsChildData: "",
      vModelChildData: "",
      refsChildData: ""
    };
  },
  components: {
    PropsChild,
    vModelChild,
    refsChild
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &::after {
      content: "父级";
      display: inline-block;
      position: absolute;
      background: #fff;
      top: -8px;
      left: 8px;
      padding: 0 10px;
    }
    .ol {
      width: 300px;
      display: inline-block;
      padding: 0 15px;
    }
  }
}
</style>