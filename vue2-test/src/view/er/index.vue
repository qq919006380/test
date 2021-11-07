<template>
  <div>
    <el-button @click="layout">一键布局</el-button>
    <el-button @click="getData">获取画布数据</el-button>
    <el-button @click="downloadImg">导出图片</el-button>
    <el-container>
      <el-aside width="200px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="字段" name="col">
            <treeField></treeField>
          </el-tab-pane>
          <el-tab-pane label="表" name="table">
            <treeTable @mousedown="moveTable"></treeTable>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main>
        <div id="container" ref="containerRef"></div>
        <div class="mini-map-container" ref="miniMapContainerRef"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import "@antv/x6-vue-shape";
import { ports } from "./graph/methods";

import tableNode from "./components/table.vue";
import treeTable from "./tree-table.vue";
import treeField from "./tree-field.vue";
import { Graph, FunctionExt, Shape, Addon, DataUri } from "@antv/x6";
import { DagreLayout, GridLayout } from "@antv/layout";

let edgeAtr = {
  attrs: {
    line: {
      targetMarker: "classic", // 实心箭头
      strokeWidth: 1,
      stroke: "#000", // 指定 path 元素的填充色
      targetMarker: {
        name: 'classic',
        size: 8
      },
    },
  },
  connector: 'normal',
  router: {
    name: "manhattan",
  },
}
export default {
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
      width: 600,
      height: 600,

      panning: {
        enabled: true,
      },
      background: {
        color: "#fffbe6", // 设置画布背景颜色
      },

      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
      // 节点连接
      connecting: {
        anchor: "center",
        connectionPoint: "anchor",
        snap: true, // 自动吸附
        allowBlank: false, // 是否允许连接到画布空白位置的点
        allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
        createEdge() {
          return new Shape.Edge({
            ...edgeAtr,
            connector: "normal",
            zIndex: 0,
          });
        },
      },
      // 高亮
      highlighting: {
        magnetAvailable: {
          name: "stroke",
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: "#6a6c8a",
            },
          },
        },
      },
      // 开启小地图
      // minimap: {
      //   enabled: true,
      //   container: this.$refs.miniMapContainerRef,
      // }
      // Scroller 使画布具备滚动、平移、居中、缩放等能力
      // scroller: {
      //   enabled: true,
      //   pageVisible: true,
      //   pageBreak: true,
      //   pannable: true,
      // },
      // // 鼠标滚轮的默认行为是滚动页面
      // mousewheel: {
      //   enabled: true,
      //   modifiers: ['ctrl', 'meta'],
      // },


    });
    this.graph.enableMouseWheel(); //启用鼠标滚轮缩放画布。
    // 节点鼠标移入
    this.graph.on(
      "node:mouseenter",
      FunctionExt.debounce(({ node }) => {
        // 添加连接点
        const ports = containerRef.querySelectorAll(".x6-port-body");
        this.showPorts(ports, true);
      }),
      500
    );
    // 节点鼠标移出
    this.graph.on("node:mouseleave", ({ node }) => {
      // 添加连接点
      const ports = containerRef.querySelectorAll(".x6-port-body");
      this.showPorts(ports, false);
    });

    // 连接线鼠标移入
    this.graph.on("edge:mouseenter", ({ edge }) => {
      edge.addTools([
        "source-arrowhead",
        "target-arrowhead",
        {
          name: "button-remove",
          args: {
            distance: -30,
          },
        },
      ]);
    });
    // 连接线鼠标移出
    this.graph.on("edge:mouseleave", ({ edge }) => {
      edge.removeTools();
    });

    // cell 节点时才触发
    this.graph.on("node:added", ({ node }) => {
      const data = node.store.data;

      if (data.type === "taskNode") {
        const obj = {
          node,
        };
        this.nodeData.push(obj);
      }
    });

    // 对新创建的边进行插入数据库等持久化操作
    this.graph.on(
      "edge:connected",
      ({ isNew, edge, previousPort, currentPort }) => {
        let { source, target } = edge.store.data;
        if (isNew) {
          // 添加线
          this.data.edges.push({ source, target, ...edgeAtr });
        } else {
          // 修改线
          console.log("修改线");
        }
      }
    );

    this.addNode();
    this.layout()

  },
  data() {
    return {
      activeName: "table",
      graph: null,
      data: {
        nodes: [], //表节点
        edges: [], //线
      },
      nodeData: [],

    };
  },
  methods: {
    downloadImg() {
      this.graph.toPNG(
        (dataUri) => {
          DataUri.downloadDataUri(dataUri, "chart.png");
        },
        {
          // copyStyles: false,
          padding: {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50,
          },
        }
      );
    },
    /**
     * 一键智能布局
     */
    layout() {
      let nodeNum = this.data.nodes.length
      let sqrt = Math.floor(Math.sqrt(nodeNum))//平方根
      const dagreLayout = new DagreLayout({
        type: "dagre",
        rankdir: "LR",
        align: "UL",
        ranksep: 55,
        nodesep: 15,
        controlPoints: true,
        workerEnabled: true
      });
      const gridLayout = new GridLayout({
        type: 'grid',
        width: sqrt * 180,
        height: sqrt * 120,
        rows: sqrt,
        cols: sqrt,
      })
      let model

      // 大于5条线就层次布局，小于5跳线就网格布局
      if (this.data.edges.length > 5) {
        model = dagreLayout.layout(this.data);
      } else {
        model = gridLayout.layout(this.data);
      }
      this.graph.fromJSON(model);
      this.observeRouter()
    },

    // 监控节点移动使线主动避开
    observeRouter() {
      this.graph.getNodes().forEach(item => {
        item.on('change:position', () => {
          this.graph.getEdges().forEach(edge => {
            this.graph.findViewByCell(edge).update()
          })
        })
      })
    },



    getData() {
      console.log("graph", this.graph.toJSON());

      console.log("data", this.data);

      console.log("nodeData", this.nodeData);
    },
    // 拖拽表进画布
    moveTable(data, e) {
      let node = this.graph.createNode({
        width: 150,
        height: 50,
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

        component: "table-node-component",
      });

      const dnd = new Addon.Dnd({ target: this.graph });
      dnd.start(node, e);
    },
    // 显示连线节点
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? "visible" : "hidden";
      }
    },
    addNode() {
      for (var i = 0; i < 100; i++) {
        this.data.nodes.push({
          id: i + "",
          zIndex: 0,
          shape: "vue-shape",
          attrs: {
            body: {
              stroke: "#2d8cf0",
            },
          },
          ports,
          data: {
            nodeInfo: {
              chnname: "SIMS_TEACHER",
              name: "教师",
            },
            fieldTable: [
              { PK_field: "INSTRUCT_ID", normal_field: "授课号" },
              { PK_field: "CLASS_ID", normal_field: "班级ID" },
            ],
          },
          component: `table-node-component`,
        });
      }

      this.data.edges.push(
        ...[
          // 字段连接字段，cell是表id，port是字段id
          {
            source: { cell: "1", port: "1-INSTRUCT_ID-out" },
            target: { cell: "2", port: "2-INSTRUCT_ID-in" },
            ...edgeAtr,
          },
          {
            source: { cell: "1", port: "1-INSTRUCT_ID-out" },
            target: { cell: "3", port: "3-INSTRUCT_ID-in" },
            ...edgeAtr,
          },
          // 表连接表
          // {
          //   source: "1", //表id
          //   target: "2", //表id
          // },
        ]
      );
    },
  },
};
</script>

<style scoped>
.mini-map-container {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
