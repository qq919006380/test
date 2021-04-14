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
    async on() {
      var {data} = await this.$form.blog.detail('22');
      console.log(data)
      
    },
  },
};
</script>

<style>
</style>