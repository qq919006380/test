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
      nodeInfo: {
        chnname: "",
        name: "",
      },
      fieldTable: [],
      maxWidth: {
        totalWidth: 0,
      },
    };
  },
  mounted() {
    const node = this.getNode();
    const data = node.store.data.data;
    if (data) {
      this.nodeInfo = data.nodeInfo || {};
      this.fieldTable = data.fieldTable || [];
    }

    this.getFieldKey();
    this.$nextTick(() => {
      this.updateTableSize();
    });
  },
  methods: {
    // 获取字段长度计算css宽度
    getFieldKey() {
      if (this.fieldTable && this.fieldTable[0]) {
        for (var k in this.fieldTable[0]) {
          let w = Math.max(
            ...this.fieldTable.map((item) => this.getTextWidth(item[k]))
          );
          this.maxWidth[k] = w;
        }
      }
    },
    /**
     * 更新svg宽度
     */
    updateTableSize() {
      this.getFieldKey();
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
  min-width: 150px;
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