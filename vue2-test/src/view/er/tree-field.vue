<template>
  <div>
    <el-tree default-expand-all :data="data" :props="defaultProps">
      <span slot-scope="{ node, data }">
        <!-- @mousedown="node.isLeaf ? handleNodeMove(data, node, $event) : null" -->
        <span
          draggable="true"
          @dragstart="onDragstart($event, data)"
          :class="{ move: node.isLeaf }"
          >{{ node.label }}</span
        >
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
          normal_field: "一级 1",
          children: [
            { normal_field: "二级 1-1" },
            { normal_field: "三级 1-1-1" },
            { normal_field: "三级 1-1-1" },
            { normal_field: "三级 1-1-1" },
          ],
        },
        {
          normal_field: "一级 2",
          children: [
            { normal_field: "二级 1-1" },
            { normal_field: "三级 1-1-1" },
            { normal_field: "三级 1-1-1" },
            { normal_field: "三级 1-1-1" },
          ],
        },
        {
          normal_field: "一级 3",
          children: [
            { normal_field: "二级 1-1" },
            { normal_field: "三级 1-1-1" },
            { normal_field: "三级 1-1-1" },
            { normal_field: "三级 1-1-1" },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "normal_field",
      },
    };
  },
  methods: {
    handleNodeMove(data, node, e) {
      this.$emit("mousedown", data, e);
    },
    onDragstart(e, data) {
      data.PK_field = "xxx";
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