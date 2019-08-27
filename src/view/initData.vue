<template>
  <div>
    <div>
      a:
      <Input v-model="item.name"></Input>b:
      <Input v-model="item.age"></Input>c:
      <Input v-model="item.height"></Input>
    </div>
    <Button @click="reset">reset</Button>
  </div>
</template>

<script>
export default {
  methods: {
    reset() {
      // this.$data 这个是当前实例中的data
      Object.assign(this.$data.item, this.$options.data().item)

    }
  },
  data() {
    return {
      item: {
        name: "zz",
        age:16,
        height:20
      }
    };
  }
};
</script>

<style>
</style>