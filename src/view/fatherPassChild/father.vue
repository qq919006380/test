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
          <li>响应式的,单向数据流</li>
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
          <li>响应式的,单向数据流，可实现同步父子数据（不推荐）</li>
          <li>子组件的props使用value就能激活v-model</li>
          <li>子组件的props虽然不能随便改，但是可以通过对象的方式修改，会直接影响父组件的值，可以实现一个伪双向绑定（不建议）</li>
        </ol>
      </div>
    </div>
    <div class="box">
      <h2>方法三:ref</h2>
      <div class="father">
        <div>
          <Input v-model="refsChildData" @input="clickParent"></Input>
          <refsChild ref="child1"></refsChild>
        </div>
        <ol class="ol">
          <li>事件驱动的，可同步父子数据</li>
        </ol>
      </div>
    </div>
    <div class="box">
      <h2>方法四:sync</h2>
      <div class="father">
        <div>
          data:
          <Input v-model="syncChildData" style="width:200px;"></Input>
          <syncChild :title="syncChildData" @update_title="syncChildData = $event"></syncChild>
          <!-- <syncChild :title.sync="syncChildData"></syncChild> -->
        </div>
        <ol class="ol">
          <li>props+$emit实现的伪双向绑定</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import PropsChild from "./props-child";
import vModelChild from "./v-model-child";
import refsChild from "./refs-child";
import syncChild from "./sync-child";
export default {
  mounted() {},
  methods: {
    clickParent(val) {
      this.$refs.child1.handleParentClick(val);
    }
  },
  data() {
    return {
      PropsChildData: "",
      vModelChildData: "",
      refsChildData: "",
      syncChildData: ""
    };
  },
  components: {
    PropsChild,
    vModelChild,
    refsChild,
    syncChild
  }
};
</script>

<style scoped lang='less'>
.container {
  display: flex;
  flex-wrap: wrap;
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