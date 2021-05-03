<template>
  <div>
    <Button @click="post">post自己写的触发接口</Button>
    <Button @click="get">get自己写的触发接口</Button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(process.env.NODE_ENV);
  },
  methods: {
    async post() {
      var { data } = await this.$api.blog.detail({
        title: "xxx",
        content: "内容1020",
      });
      console.log(data);
    },
    async get() {
      var { data } = await this.$api.blog.del({
        title: "标题",
        content: "内容1020",
      });
      console.log(data);
    },
  },
};
</script>

<style>
</style>