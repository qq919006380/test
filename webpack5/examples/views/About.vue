<template></template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";

export default {
  setup() {},
  mounted() {
    class PubSub {
      constructor() {
        this.handles = {}; // 事件处理函数集合
      }
      //订阅事件
      on(eventType, handle) {
        if (!this.handles.hasOwnProperty(eventType)) {
          this.handles[eventType] = [];
        }
        if (typeof handle == "function") {
          this.handles[eventType].push(handle);
        } else {
          throw new Error("缺少回调函数");
        }
        return this;
      }
      // 发布事件
      emit(eventType, ...args) {
        if (this.handles.hasOwnProperty(eventType)) {
          this.handles[eventType].forEach((item, key, arr) => {
            item.apply(null, args);
          });
        } else {
          throw new Error(`"${eventType}"事件未注册`);
        }
        return this;
      }
      // 删除事件
      off(eventType, handle) {
        if (!this.handles.hasOwnProperty(eventType)) {
          throw new Error(`"${eventType}"事件未注册`);
        } else if (typeof handle != "function") {
          throw new Error("缺少回调函数");
        } else {
          this.handles[eventType].forEach((item, key, arr) => {
            if (item == handle) {
              this.handles[eventType].splice(key, 1);
            }
          });
        }
        return this;
      }
    }

    // 看看怎么用
    let pubsub = new PubSub();
    function callback(text) {
      console.log(text);
    }
    // 订阅:如下在事件eventTypeName上添加了两个回调
    pubsub.on("eventTypeName", callback);

    // 发布：
    pubsub.emit("eventTypeName", "订阅成功"); //发布 依次执行 eventTypeName 事件中的 所以方法
    pubsub.off("eventTypeName", callback); // 删除只是删除 eventTypeName 事件的 callback 方法
    pubsub.emit("eventTypeName", "123");
  },
};
</script>