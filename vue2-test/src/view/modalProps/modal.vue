<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>dialogVisible</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
//   props: ["value"],
  props: {
      value:Object
  },
  watch: {
    // "value.show": {
    //   handler(val) {
    //     this.dialogVisible = val;
    //   },
    //   deep: true,
    // },
    "value": {
      handler(val) {
        this.dialogVisible = val.show;
      },
      deep: true,
    },
    dialogVisible(val) {
      this.value.show = val;
      this.value.id = '';
      this.$emit("input", this.value);
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
</style>
