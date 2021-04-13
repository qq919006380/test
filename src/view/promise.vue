<template>
  <div>
    <div>{{ content }}</div>
    <Button @click="on">抽奖</Button>
    <Button @click="aaa">ajax.creat</Button>
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
      var a = this.$form.getList.getAllUser();
      console.log(a + "asd");
    },
    ajaxa() {
      var form = this.axios.create({
        baseURL: "http://localhost:8000/",
      });
      return form({
        url: "api/blog/list?id=22",
      });
    },
    async aaa() {
      var {data} = await this.ajaxa();
      console.log(data);
    },
  },
};
</script>

<style>
</style>