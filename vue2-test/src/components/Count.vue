<template>
  <div class="er-template" ref="tp" @drop="onDragenter" @dragover.prevent>
    <p class="title">
      <span class="table_chnname" :title="nodeInfo.chnname">{{
        nodeInfo.chnname
      }}</span
      >( <span class="table_name">{{ nodeInfo.name }}</span
      >)
    </p>
    <div class="fileds_area" v-for="item in fieldTable">
      <div :style="{ width: maxWidth.PK_field + 'px' }">
        {{ item.PK_field }}
      </div>
      <div :style="{ width: maxWidth.normal_field + 'px' }">
        {{ item.normal_field }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      nodeInfo: { chnname: "", name: "" },
      fieldTable: [
        { PK_field: "INSTRUCT_ID", normal_field: "授课号" },
        { PK_field: "CLASS_ID", normal_field: "班级ID" },
        { PK_field: "LESSON_ID", normal_field: "课程号" },
        { PK_field: "TEACHER_ID", normal_field: "教师ID" },
        { PK_field: "TENANT_ID", normal_field: "租户号" },
        { PK_field: "REVISION", normal_field: "乐观锁" },
        { PK_field: "CREATED_BY", normal_field: "创建人" },
        { PK_field: "CREATED_TIME", normal_field: "创建时间" },
        { PK_field: "UPDATED_BY", normal_field: "更新人" },
      ],
      maxWidth: {
        totalWidth: 0,
      },
    };
  },
  mounted() {
    const node = this.getNode();
    const data = node.store.data.data;
    if (data) {
      this.nodeInfo = data.nodeInfo;
    }

    for (var k in this.fieldTable[0]) {
      let w = Math.max(
        ...this.fieldTable.map((item) => this.getTextWidth(item[k]))
      );
      this.maxWidth[k] = w;
    }
    
    this.$nextTick(() => {
      this.updateTableSize();
    });
  },
  methods: {
    updateTableSize() {
      for (var k in this.fieldTable[0]) {
        let w = Math.max(
          ...this.fieldTable.map((item) => this.getTextWidth(item[k]))
        );
        this.maxWidth[k] = w;
      }

      this.$nextTick(() => {
        let height = this.$refs.tp.clientHeight;
        let width = this.$refs.tp.clientWidth;
        this.getNode().resize(width, height);
      });
    },
    /**
     * 根据字符串长度计算出元素的px像素宽度
     */
    getTextWidth(str, fontSize = 12) {
      let result;
      let ele = document.createElement("span");
      ele.innerText = str;
      ele.style.fontSize = fontSize + "px";
      document.documentElement.append(ele);
      result = ele.offsetWidth;
      document.documentElement.removeChild(ele);
      return result;
    },
    onDragenter(e) {
      let data = JSON.parse(e.dataTransfer.getData("data-info"));
      console.log(data);
      this.fieldTable.push(data);
      this.updateTableSize();
    },
  },
  inject: ["getGraph", "getNode"],
};
</script>
<style lang="scss" scoped>
.er-template {
  display: inline-block;
  min-width: 100%;
  min-height: 50px;
  background: #fff;
  .title {
    padding: 4px 0 4px 0;
    font-weight: bold;
    white-space: nowrap;
    text-align: center;
    background: #dde5ff;
    border-bottom: 1px solid #dfe3eb;
    white-space: inherit;
    hyphens: auto;
  }
  .fileds_area {
    display: flex;
    margin: 3px 5px;
    & > div {
      margin-left: 8px;
      display: inline-block;
    }
  }
}
</style>