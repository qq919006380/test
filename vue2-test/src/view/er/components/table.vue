<template>
  <div class="er-template" ref="tp" @drop="onDragenter" @dragover.prevent>
    <div class="title">
      <span class="table_chnname" :title="nodeInfo.chnname">
        {{
          nodeInfo.chnname
        }}
      </span>(
      <span class="table_name">{{ nodeInfo.name }}</span>)
    </div>
    <div class="fileds_area" v-for="item in fieldTable">
      <div :style="{ width: maxWidth.ename + 'px' }">{{ item.ename }}</div>
      <div :style="{ width: maxWidth.cname + 'px' }">{{ item.cname }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodeInfo: {
        chnname: "",
        name: "",
      },
      fieldTable: [],
      maxWidth: {},
      height: 0,
      width: 0,
    };
  },
  mounted() {
    const data = this.getNode().store.data.data;

    //组件外部的data数据传进来
    if (data) {
      this.nodeInfo = data.nodeInfo || {}; //表头信息
      this.fieldTable = data.fieldTable || []; //字段信息
    }

    // 计算矩形的宽高
    this.updateTableSize();
    // 根据字段渲染连接桩
    this.initPorts();
  },
  methods: {
    // // 计算矩形的宽高
    updateTableSize() {
      let { width, height } = this.getNode().size()
      this.height = height
      this.width = width
      this.getNode().resize(this.width, this.height);
    },
    // 计算ports连接桩
    initPorts() {
      this.$nextTick(() => {
        this.fieldTable.map((val, i) => {
          const y = 37 + i * 19;
          this.getNode().addPorts([
            {
              id: `${this.getNode().id}-${val.ename}-in`,
              group: "in",
              args: { x: 0, y: y },
            },
            {
              id: `${this.getNode().id}-${val.ename}-out`,
              group: "out",
              args: { x: this.width, y: y },
            },
          ]);
        });
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
      return result + 2;
    },
    onDragenter(e) {
      let data = JSON.parse(e.dataTransfer.getData("data-info"));
      // 更新组件外部data数据
      this.$emit("update-data", {
        nodeId: this.getNode().id,
        fieldTable: data,
      });
      this.fieldTable.push(data);
      this.updateTableSize();
      this.$nextTick(() => {
        const y = 37 + (this.fieldTable.length - 1) * 19;
        this.getNode().addPorts([
          {
            id: `${this.getNode().id}-${data.ename}-in`,
            group: "in",
            args: { x: 0, y: y },
          },
          {
            id: `${this.getNode().id}-${data.ename}-out`,
            group: "out",
            args: { x: this.width, y: y },
          },
        ]);
        this.updatePortPosition()
      });


    },

    updatePortPosition() {
      this.fieldTable.forEach((item, i) => {
        const y = 37 + i * 19;
        this.getNode().setPortProp(`${this.getNode().id}-${item.ename}-in`, ['args'], { x: 0, y })
        this.getNode().setPortProp(`${this.getNode().id}-${item.ename}-out`, ['args'], { x: this.width, y })
      })
    }
  },
  inject: ["getGraph", "getNode"],
};
</script>
<style scoped lang="scss">
.er-template {
  display: inline-block;
  font-size: 12px;
  width: 100%;
  height: 100%;
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
    height: 16px;
    display: flex;
    margin: 3px 5px;
    & > div {
      margin-left: 8px;
      display: inline-block;
    }
  }
}
</style>