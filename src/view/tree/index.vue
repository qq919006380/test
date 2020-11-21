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
      console.log(node.level);
      if (node.level == 0) {
        this.axios.get("http://localhost:3000").then(function (res) {
          console.log(res.data);
          return resolve(res.data);
        });
      }
      if (node.level == 1) {
        this.axios.get("http://localhost:3000").then(function (res) {
          console.log(res.data);
          return resolve(res.data);
        });
      }
      if (node.level == 2) {
        return resolve([]);
      }
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