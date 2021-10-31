<template>
  <div>
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import "@antv/x6-vue-shape";
import { ports } from './graph/methods'

import Count from "@/components/Count.vue";
import treeTable from './tree-table.vue';
import treeField from './tree-field.vue';
import { Graph, FunctionExt, Shape, Addon } from "@antv/x6";

export default {
  components: { treeTable, treeField },
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

    // 生成画布
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
      // 嵌套节点
      // embedding: {
      //   enabled: true,
      //   findParent({ node: childNode }) {
      //     const child = childNode.getBBox()
      //     const childData = childNode.getData()
      //     return this.getNodes().filter((node) => {
      //       const data = node.getData()
      //       if (data && data.parent && childData && childData.child) {
      //         const targetBBox = node.getBBox()
      //         return child.isIntersectWithRect(targetBBox)
      //       }
      //       return false
      //     })
      //   },
      // },
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
        },
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

    // cell 节点时才触发
    this.graph.on('node:added', ({ node }) => {
      const data = node.store.data

      if (data.type === 'taskNode') {
        const obj = {
          node
        }
        this.nodeData.push(obj)
      }
    })
    this.addNode();
    setTimeout(() => {
      this.graph.fromJSON(this.data);
    }, 0);
  },
  data() {
    return {
      activeName: 'table',
      graph: null,
      data: {
        nodes: [],
      },
      nodeData: []
    };
  },
  methods: {
    // 拖拽表进画布
    moveTable(data, e) {
      let node = this.graph.createNode({
        width: 200,
        height: 100,
        zIndex: 1,
        shape: 'vue-shape',
        attrs: {
          body: {
            stroke: "#2d8cf0",
          },
        },
        ports,
        data: {
          nodeInfo: { chnname: data.label, name: "xxx" }
        },
        component: 'table-node-component'
      })

      const dnd = new Addon.Dnd({ target: this.graph })
      dnd.start(node, e)
    },
    // 显示连线节点
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    addNode() {
      for (var i = 0; i < 2; i++) {
        this.data.nodes.push({
          zIndex: 1,
          shape: "vue-shape",
          attrs: {
            body: {
              stroke: "#2d8cf0",
            },
          },
          ports,
          data: {
            nodeInfo: { chnname: "可以通过两种方法进行树节点内容的自定义：render-content和 scoped slot", name: "sda" }
          },
          component: `table-node-component`,
        });
      }

    },
  },
};
</script>

<style scoped>
</style>
