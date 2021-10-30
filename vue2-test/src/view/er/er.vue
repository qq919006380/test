<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="字段" name="col">
            <treeCol></treeCol>
          </el-tab-pane>
          <el-tab-pane label="表" name="table">
            <treeTable></treeTable>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main>
        <dl @mousedown="startDragToGraph('startNode', $event)">
          <dt class="circle start"></dt>
          <dd>开始节点</dd>
        </dl>
        <div id="container" ref="containerRef"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import "@antv/x6-vue-shape";
import { ports } from './graph/methods'

import Count from "@/components/Count.vue";
import treeTable from './tree-table.vue';
import treeCol from './tree-col.vue';
import addCol from "@/components/addCol.vue";
import addTable from "@/components/addTable.vue";
import { Graph, FunctionExt, Shape, Addon } from "@antv/x6";

export default {
  components: { treeTable ,treeCol},
  mounted() {
    const containerRef = this.$refs.containerRef
    // 注册vue组件 
    Graph.registerVueComponent('table-node-component', {
      template: `<count :data="data" ></count>`,
      data() {
        return { data: { chnname: "xx", name: "sda" } };
      },
      components: { Count }
    }, true)

    this.graph = new Graph({
      container: document.getElementById("container"),
      width: 600,
      height: 600,
      grid: true,
      // 节点连接
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        snap: true, // 自动吸附
        allowBlank: false, // 是否允许连接到画布空白位置的点
        allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#1890ff',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8
                },
                strokeDasharray: 0, //虚线
                style: {
                  animation: 'ant-line 30s infinite linear'
                }
              }
            },
            label: {
              text: ''
            },
            connector: 'normal',
            router: {
              name: 'manhattan'
            },
            zIndex: 0
          })
        }
      },
      // 高亮
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: '#6a6c8a'
            }
          }
        }
      }
    });

    // 节点鼠标移入
    this.graph.on('node:mouseenter', FunctionExt.debounce(({ node }) => {
      // 添加连接点
      const ports = containerRef.querySelectorAll('.x6-port-body')
      this.showPorts(ports, true)
    }),
      500
    )
    // 节点鼠标移出
    this.graph.on('node:mouseleave', ({ node }) => {
      // 添加连接点
      const ports = containerRef.querySelectorAll('.x6-port-body')
      this.showPorts(ports, false)
    })

    // 连接线鼠标移入
    this.graph.on('edge:mouseenter', ({ edge }) => {
      console.log(3)
      edge.addTools([
        'source-arrowhead',
        'target-arrowhead',
        {
          name: 'button-remove',
          args: {
            distance: -30,
          }
        }
      ])
    })
    // 连接线鼠标移出
    this.graph.on('edge:mouseleave', ({ edge }) => {
      console.log(4)
      edge.removeTools()
    })


    for (var i = 0; i < 2; i++) {
      this.addNode();
    }
    this.graph.fromJSON(this.data);
  },
  data() {
    return {
      activeName: 'table',
      graph: null,
      data: {
        nodes: [],
      },
    };
  },
  methods: {
    // 拖拽节点新增
    startDragToGraph(type, e) {
      const graph = this.graph
      let node = null
      this.showRight = false
      this.nodeId = ''

      // 验证 startNode endNode 是否已存在，只能添加一个
      if (['startNode', 'endNode'].includes(type)) {
        const graphData = this.graph.toJSON()
        const posIndex = graphData.cells.findIndex((item) => item.type === type)

        if (posIndex >= 0) return
      }

      node = graph.createNode({
        type: 'taskNode',
        shape: 'vue-shape',
        x: 300,
        y: 300,
        width: 150,
        height: 200,
        attrs: {
          body: {
            stroke: "#2d8cf0",
          },
        },
        ports,
        data: {
          data: { chnname: "新增的", name: "sda" }
        },
        component: 'table-node-component'
      })

      const dnd = new Addon.Dnd({ target: graph })
      dnd.start(node, e)
    },
    // 显示连线节点
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    addNode() {
      this.data.nodes.push({
        shape: "vue-shape",
        width: 150,
        height: 200,
        x: 100,
        y: 100,
        attrs: {
          body: {
            stroke: "#2d8cf0",
          },
        },
        ports,
        component: `table-node-component`,
      });
    },
  },
};
</script>

<style>
</style>
