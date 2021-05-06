<template>
  <div class="child">
    <div>
      <div>
        text:
        <Input v-model="text" style="width:200px;"></Input>
      </div>
      <div>title:{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    text(newValue) {
      this.$emit("update_title", newValue);
    }
    // title(val) {
    //   this.text = val;
    // }
  },
  props: {
    title: String
  },
  data() {
    return {
      text: ""
    };
  }
};
</script>

<style scoped lang='less'>
.child {
  border: solid 1px;
  margin: 10px;
}
</style>