<template>
  <div>
    <div>{{ content }}</div>
    <Button @click="on">抽奖</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "是是是",
    };
  },
  methods: {
    on() {
      //   new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       console.log(1);
      //       resolve("ok");
      //     }, 1000);
      //   })
      //     .then((value) => {
      //       return new Promise((resolve, reject) => {
      //         setTimeout(() => {
      //           console.log(2);
      //           resolve(value);
      //         }, 1000);
      //       });
      //     })
      //     .then((value) => {
      //       console.log(value);
      //     });
      this.$api.getList.getAllUser()
    //   this.$api.getAllUser();
    },
  },
};
</script>

<style>
</style>