<template>
  <div>
    <el-tree :data="data" :props="props" :load="loadNode" lazy show-checkbox>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      data: [],
    };
  },
  mounted() {},
  methods: {
    loadNode(node, resolve) {
      this.axios
        .get("http://localhost:3000")
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getTree(callback) {
      this.axios
        .get("http://localhost:3000")
        .then(function (res) {
          callback(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>