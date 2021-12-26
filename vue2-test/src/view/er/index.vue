<template>
  <div>
    <el-button @click="getData">获取画布数据</el-button>
    <el-button @click="downloadImg">导出图片</el-button>
    <el-button @click="layout">网格布局</el-button>
    <el-button @click="forceLayout">力导向聚类布局</el-button>
    <el-button @click="erLayout">er布局</el-button>
    <el-container>
      <el-aside width="200px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="字段" name="col">
            <!-- <treeField></treeField> -->
          </el-tab-pane>
          <el-tab-pane label="表" name="table">
            <!-- <treeTable @mousedown="moveTable"></treeTable> -->
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main>
        <div class="app-content">
          <div id="container" ref="containerRef"></div>
        </div>
        <div class="mini-map-container" ref="miniMapContainerRef"></div>
      </el-main>
    </el-container>
    <div>{{ originData }}</div>
  </div>
</template>

<script>
import "@antv/x6-vue-shape";
import { ports, getFieldKey } from "./graph/methods";
import originData from "./graph/api";
const random = require("string-random");
import tableNode from "./components/table.vue";
import treeTable from "./tree-table.vue";
import treeField from "./tree-field.vue";
import { Graph, FunctionExt, Shape, Addon, DataUri, Path } from "@antv/x6";
import layoutMixin from "./graph/layout-mixin";

let edgeAtr = {
  attrs: {
    line: {
      targetMarker: "classic", // 实心箭头
      strokeWidth: 1,
      stroke: "#000", // 指定 path 元素的填充色
      targetMarker: {
        name: "classic",
        size: 8,
      },
    },
  },
  connector: "normal",
  router: {
    name: "manhattan",
    args: {
      offset: "center",
    },
  },
};
export default {
  mixins: [layoutMixin],
  components: { treeTable, treeField },
  mounted() {
    const containerRef = this.$refs.containerRef;
    let _this = this;

    // 注册vue组件
    Graph.registerVueComponent(
      "table-node-component",
      {
        template: `<table-node @update-data='updateData'></table-node>`,
        components: { tableNode },
        methods: {
          updateData({ nodeId, fieldTable }) {
            _this.data.nodes.forEach((item) => {
              if (item.id == nodeId) {
                item.data.fieldTable.push(fieldTable);
              }
            });
          },
        },
      },
      true
    );
    // 生成画布
    this.graph = new Graph({
      container: document.getElementById("container"),

      width: 2000,
      height: 2000,
      panning: {
        enabled: true,
      },
      background: {
        color: "#fffbe6", // 设置画布背景颜色
      },
      grid: true,



    });



    // for (let i = 0; i < 100; i++) {
    //   this.originData.nodes.push({
    //     id: "node-test" + i,
    //     x: 0,
    //     y: 0,
    //     fields: [
    //       { ename: "123", cname: "授课号123213333333333" },
    //       { ename: "1233", cname: "授课号" },
    //       { ename: "121323", cname: "授课号123213333333333" },
    //     ],
    //     cluster: "null",
    //   });
    // }

    this.layout();
    // 滚动和缩放刷新视窗位置和大小
    let appContent = document.querySelector(".app-content");
    appContent.onscroll = () => this.setWindowBBox();
    this.graph.on("scale", ({ sx, sy, ox, oy }) => {
      this.setWindowBBox();
    });
    this.graph.on("resize", ({ width, height }) => {
      this.setWindowBBox();
    });
    this.graph.on("translate", ({ tx, ty }) => {
      this.setWindowBBox();
    });

    for (let i = 0; i < 100; i++) {
      data.nodes.push({
        id: "node-test" + i,
        x: 0,
        y: 0,
        fields: [
          { ename: "123", cname: "授课号123213333333333" },
          { ename: "1233", cname: "授课号" },
          // { ename: "121323", cname: "授课号123213333333333" },
        ],
        cluster: "null",
      });
    }
    this.setWindowBBox();
    this.addNode(data);
    this.resetCells();
  },
  data() {
    return {
      activeName: "table",
      graph: null,
      originData: {
        nodes: [
          //   class0
          {
            id: "node0",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号123213333333333" },
              { ename: "1233", cname: "授课号" },
              { ename: "121323", cname: "授课号123213333333333" },
            ],
            cluster: "class0",
          },
          {
            id: "node4",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class0",
          },
          {
            id: "node5",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class0",
          },
          // class1

          {
            id: "node1",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class1",
          },
          {
            id: "node6",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class1",
          },
          {
            id: "node7",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class1",
          },

          // class2
          {
            id: "node2",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class2",
          },
          {
            id: "node8",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class2",
          },
          {
            id: "node9",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class2",
          },
          {
            id: "node10",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class2",
          },
          {
            id: "node11",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class2",
          },
          {
            id: "node12",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class2",
          },
          {
            id: "node13",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class2",
          },
          // class3
          {
            id: "node3",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class3",
          },
          {
            id: "node14",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class3",
          },
          {
            id: "node15",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class3",
          },
          {
            id: "node16",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class3",
          },
          // class4
          {
            id: "node17",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class4",
          },
          {
            id: "node18",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class4",
          },
          {
            id: "node19",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
          },
          {
            id: "node20",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class5",
          },
          {
            id: "node21",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class5",
          },
          {
            id: "node22",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class5",
          },
          {
            id: "node23",
            x: 0,
            y: 0,
            fields: [
              { ename: "123", cname: "授课号" },
              { ename: "1233", cname: "授课号" },
            ],
            cluster: "class5",
          },
        ],
        edges: [
          {
            source: { cell: "node0", port: "node0-123-out" },
            target: { cell: "node4", port: "node4-1233-in" },
          },
          {
            source: { cell: "node0", port: "node0-123-out" },
            target: { cell: "node5", port: "node5-1233-in" },
          },
          {
            source: { cell: "node1", port: "node1-123-out" },
            target: { cell: "node6", port: "node6-1233-in" },
          },
          {
            source: { cell: "node1", port: "node1-123-out" },
            target: { cell: "node7", port: "node7-1233-in" },
          },

          {
            source: { cell: "node2", port: "node2-123-out" },
            target: { cell: "node8", port: "node8-1233-in" },
          },
          {
            source: { cell: "node2", port: "node2-123-out" },
            target: { cell: "node9", port: "node9-1233-in" },
          },
          {
            source: { cell: "node2", port: "node2-123-out" },
            target: { cell: "node10", port: "node10-1233-in" },
          },
          {
            source: { cell: "node2", port: "node2-123-out" },
            target: { cell: "node11", port: "node11-1233-in" },
          },
          {
            source: { cell: "node2", port: "node2-123-out" },
            target: { cell: "node12", port: "node12-1233-in" },
          },
          {
            source: { cell: "node2", port: "node2-123-out" },
            target: { cell: "node13", port: "node13-1233-in" },
          },
          {
            source: { cell: "node3", port: "node3-123-out" },
            target: { cell: "node14", port: "node14-1233-in" },
          },
          {
            source: { cell: "node3", port: "node3-123-out" },
            target: { cell: "node15", port: "node15-1233-in" },
          },
          {
            source: { cell: "node3", port: "node3-123-out" },
            target: { cell: "node16", port: "node16-1233-in" },
          },
        ],
      }
    };
  },
  methods: {
    /**
     * 一键智能布局
     */
    layout() {
      const forceLayout = new ForceLayout({
        type: "force",
        center: [369, 180],
        clustering: true,
        clusterNodeStrength: -5,
        clusterEdgeDistance: 200,
        clusterNodeSize: 100,
        clusterFociStrength: 1.2,
        nodeSpacing: 50,
        preventOverlap: true,
        tick: () => {
          const model = this.getModelFromOriginData(this.originData);
          this.graph.fromJSON(model);
        }
      })
    },
    getData() {
      console.log("graph", this.graph.toJSON());

      console.log("data", this.data);

      console.log("filterLayoutData", this.filterLayoutData(this.graph.toJSON()));
    },
    // 拖拽表进画布
    moveTable(data, e) {
      let node = this.graph.createNode({
        width: 200,
        height: 150,
        zIndex: 0,
        shape: "vue-shape",
        attrs: {
          body: {
            stroke: "#2d8cf0",
          },
        },
        ports,
        data: {
          nodeInfo: { chnname: data.label, name: "xxx" },
        },
      });
      forceLayout.layout(this.originData);


    },
    getModelFromOriginData(originData) {
      let colorMap = {
        class0: "#D3C6EA",
        class1: "#BDD2FD",
        class2: "#BDEFDB",
        class3: "#F6C3B7",
        class4: "#FFD8B8",

      };
      const model = {
        nodes: [],
        edges: [],
      };
      originData.nodes.forEach((item, num) => {
        let { totalWidth } = getFieldKey(item.fields);
        model.nodes.push({
          size: [totalWidth + 80, item.fields.length * 20 + 30],
          width: totalWidth + 80,
          height: item.fields.length * 20 + 30,
          id: item.id,
          cluster: item.cluster,
          shape: "rect",
          width: 233,
          height: 23,
          x: item.x,
          y: item.y,
          label: item.id,
          attrs: {
            body: {
              stroke: colorMap[item.cluster] || "#dde5ff", //"#2d8cf0",
              fill: colorMap[item.cluster],
            },
          },
        });
      });

      originData.edges.forEach((item) => {
        model.edges.push({
          source: item.source,
          target: item.target,
          ...edgeAtr,
        });
      });
      return model
    },
  },
}
</script>

<style scoped>
.app-content {
  flex: 1;
  height: 600px;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
  overflow: auto;
}
.mini-map-container {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
