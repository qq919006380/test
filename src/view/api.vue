<template>
  <div>
    <Button @click="api">自己写的触发接口</Button>
    <Button @click="fetch">fetch</Button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(process.env.NODE_ENV);
  },
  methods: {
    async api() {
      var { data } = await this.$form.blog.new({
        // title: "标题",
        // content: "内容1020",
      });
      console.log(data);
    },
    fetch() {
      fetch("/api/blog/detail")
        .then((res) => res.json)
        .then((data) => {
          console.log(data);
        });
    },
  },
};
</script>

<style>
</style>