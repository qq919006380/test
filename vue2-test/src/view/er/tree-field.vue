<template>
  <div>
    <el-tree default-expand-all :data="data" :props="defaultProps">
      <span slot-scope="{ node, data }">
        <span
          draggable="true"
          @dragstart="onDragstart($event, data)"
          :class="{ move: node.isLeaf }"
        >{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          cname: "一级 1",
          children: [
            { cname: "二级 1-1" },
            { cname: "三级 1-1-1-2-3-1-4-a" },
            { cname: "三级 1-1-1" },
            { cname: "三级 1-1-1" },
          ],
        },
        {
          cname: "一级 2",
          children: [
            { cname: "二级 1-1" },
            { cname: "三级 1-1-1" },
            { cname: "三级 1-1-1" },
            { cname: "三级 1-1-1" },
          ],
        },
        {
          cname: "一级 3",
          children: [
            { cname: "二级 1-1" },
            { cname: "三级 1-1-1" },
            { cname: "三级 1-1-1" },
            { cname: "三级 1-1-1" },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "cname",
      },
    };
  },
  methods: {
    handleNodeMove(data, node, e) {
      this.$emit("mousedown", data, e);
    },
    onDragstart(e, data) {
      data.ename = Math.floor(Math.random() * 900);
      let dataStr = JSON.stringify(data);
      e.dataTransfer.setData("data-info", dataStr);
    },
  },
};
</script>

<style scoped>
.move {
  cursor: move;
}
</style>