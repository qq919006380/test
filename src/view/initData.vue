<template>
  <div>
    <div>
      a:
      <Input v-model="item.name"></Input>b:
      <Input v-model="item.age"></Input>c:
      <Input v-model="item.height"></Input>
    </div>
    <Button>reset</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        name: "zz"
      }
    };
  },
  created: function() {
    console.log(this.$options.data()); // => 'foo'
  }
};
</script>

<style>
</style>