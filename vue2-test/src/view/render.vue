<template>
  <div>
    data: <input type="text" v-model="data" />
    <input-r v-model="data"></input-r>
  </div>
</template>

<script>
import Vue from "vue";
Vue.component("input-r", {
  render: function (createElement) {
    console.log("重新渲染");
    return createElement("div", {
      domProps: {
        value: this.value,
      },
      on: {
        input: (event) => {
          this.$emit("input", event.target.value);
        },
      },
    });
  },
  props: ["value"],
});
export default {
  data() {
    return {
      data: "",
    };
  },
};
</script>

<style>
</style>