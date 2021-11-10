<template>
  <div>
    <el-button @click="layout">一键布局</el-button>
    <el-button @click="getData">获取画布数据</el-button>
    <el-button @click="downloadImg">导出图片</el-button>
    <el-button @click="twolayout">twolayout</el-button>
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
        <div class="app-content">
          <div id="container" ref="containerRef"></div>
        </div>
        <div class="mini-map-container" ref="miniMapContainerRef"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import "@antv/x6-vue-shape";
import { ports } from "./graph/methods";
const random = require('string-random');
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
      sorting: 'approx',
      async: true,
      frozen: true,
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
      // 鼠标滚轮的默认行为是滚动页面
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
        // minScale: 0.5,
        // maxScale: 2
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
      checkView: ({ view, unmounted }) => {
        const cell = view.cell
        if (cell.isNode()) {
          return this.shouldRenderNode(cell, unmounted)
        }

        if (cell.isEdge()) {
          return this.shouldRenderEdge(cell)
        }
        return false
      },
      // 开启小地图
      // minimap: {
      //   enabled: true,
      //   container: this.$refs.miniMapContainerRef,
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
    // 画布节点渲染完成
    this.graph.on('render:done', ({ stats }) => {
    })
    // 移动node节点
    this.graph.on('node:change:position', ({ node, edge }) => {
      this.draggedId.push(node.id)

      this.graph.getEdges().forEach(edge => {
        this.graph.findViewByCell(edge).update()
      })
    })

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



    // 滚动和缩放刷新视窗位置和大小
    let appContent = document.querySelector('.app-content')
    appContent.onscroll = () => this.setWindowBBox()
    this.graph.on('scale', ({ sx, sy, ox, oy }) => { this.setWindowBBox() })
    this.graph.on('resize', ({ width, height }) => { this.setWindowBBox() })
    this.graph.on('translate', ({ tx, ty }) => { this.setWindowBBox() })



    this.setWindowBBox()
    this.addNode();
    this.resetCells()

  },
  data() {
    return {
      activeName: "table",
      graph: null,
      padding: 60,
      keepRendered: false,//保持渲染
      keepDragged: false,//保持拖动
      draggedId: [],
      data: {
        nodes: [], //表节点
        edges: [], //线
      },
    };
  },
  methods: {
    //生成随机长度的字段
    randomField() {
      let data = [
        { PK_field: random(6), normal_field: "授课号" },
        { PK_field: random(6), normal_field: "授课号" },
      ]
      let num = Math.random() * 10
      for (let i = 0; i < num; i++) {
        data.push(
          { PK_field: random(100), normal_field: "授课号" },
        )
      }

      return data
    },
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
      let sqrt = Math.ceil(Math.sqrt(nodeNum))//平方根

      const gridLayout = new GridLayout({
        begin:[0,0],
        type: 'grid',
        width: sqrt * 200,
        height: sqrt * 120,
        rows: sqrt,
        cols: sqrt,
        preventOverlap: true
      })
      let model = gridLayout.layout(this.data);

      this.graph.resize(sqrt * 200 + 100, sqrt * 120 + 100)
      this.graph.fromJSON(model);

      setTimeout(() => {
        let xxx = gridLayout.layout(this.filterLayoutData(this.graph.toJSON()));
      this.graph.fromJSON(xxx);
      }, 0);
    },

    twolayout() {
      let nodeNum = this.data.nodes.length
      let sqrt = Math.ceil(Math.sqrt(nodeNum))//平方根

      const gridLayout = new GridLayout({
        type: 'grid',
        width: sqrt * 200,
        height: sqrt * 120,
        rows: sqrt,
        cols: sqrt,
        preventOverlap: true
      })
      let model = gridLayout.layout(this.filterLayoutData(this.graph.toJSON()));
      console.log(model)
      this.graph.resize(sqrt * 200 + 100, sqrt * 120 + 100)
      this.graph.fromJSON(model);
    },



    getData() {
      console.log("graph", this.graph.toJSON());

      console.log("data", this.data);

      console.log('filterLayoutData', this.filterLayoutData(this.graph.toJSON()))
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
      for (var i = 0; i < 40; i++) {
        this.data.nodes.push({
          id: i + "",
          zIndex: 0,
          shape: "vue-shape",
          size: [0, 0],
          attrs: {
            body: {
              stroke: "#2d8cf0",
            },
          },
          ports,
          data: {
            nodeInfo: {
              chnname: random(),
              name: "教师",
            },
            fieldTable: this.randomField(),
          },
          component: `table-node-component`,
        });
      }

      // this.data.edges.push(
      //   ...[
      //     // 字段连接字段，cell是表id，port是字段id
      //     {
      //       source: { cell: "1", port: "1-INSTRUCT_ID-out" },
      //       target: { cell: "2", port: "2-INSTRUCT_ID-in" },
      //       ...edgeAtr,
      //     },
      //     {
      //       source: { cell: "1", port: "1-INSTRUCT_ID-out" },
      //       target: { cell: "3", port: "3-INSTRUCT_ID-in" },
      //       ...edgeAtr,
      //     },

      //   ]
      // );
    },

    // 渲染节点
    shouldRenderNode(node, unmounted) {
      if (this.keepDragged && this.draggedId.includes(node.id)) {
        return true
      }

      if (this.keepRendered && unmounted) {
        return true
      }

      return this.windowBBox.isIntersectWithRect(
        // 返回容器渲染到画布后的包围盒
        node.getBBox().inflate(this.padding),
      )
    },
    // 渲染边
    shouldRenderEdge(edge) {
      const sourceNode = edge.getSourceNode()
      const targetNode = edge.getTargetNode()

      return (
        this.shouldRenderNode(sourceNode, false) ||
        this.shouldRenderNode(targetNode, false)
      )
    },

    setWindowBBox() {
      this.windowBBox = this.graph.pageToLocal(
        window.scrollX,
        window.scrollY,
        window.innerWidth,
        window.innerHeight,
      )
    },

    resetCells() {
      console.time('perf-all')
      const batch = 400 //每次异步进程中处理的节点和边视图的数量。
      console.time('perf-reset')
      this.graph.freeze()
      // 暂时使用节点总数的平方根等于画布的长宽
      this.layout()
      console.timeEnd('perf-reset')

      console.time('perf-dump')
      this.graph.unfreeze({
        batchSize: batch,
        progress: ({ done, current, total }) => {
          const progress = current / total
          console.log(`${Math.round(progress * 100)}%`)
          if (done) {
            console.timeEnd('perf-dump')
            console.timeEnd('perf-all')
            this.graph.unfreeze()
          }
        },
      })
    },

    filterLayoutData(data) {
      const model = {
        nodes: [],
        edges: []
      };
      let tmp;
      if (data.cells) {
        tmp = data.cells;
      } else if (data.nodes || data.edges) {
        tmp = [].concat(data.nodes, data.edges);
      }
      if (tmp) {
        tmp.forEach((item) => {
          if (item.shape !== "edge") {
            item.ports.items = []
            model.nodes.push(item);
          } else {
            console.log(item)
            let sourceId = item.source;
            let targetId = item.target;
            model.edges.push({
              source: sourceId,
              target: targetId
            });
          }
        });
      }
      return model;
    }
  },
};
</script>

<style scoped>
.app-content {
  flex: 1;
  height: 500px;
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
