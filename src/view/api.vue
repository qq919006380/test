<template>
  <div>
    <Button @click="api">触发接口</Button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(process.env.NODE_ENV);
  },
  methods: {
    async api() {
      var { data } = await this.$form.blog.detail({
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