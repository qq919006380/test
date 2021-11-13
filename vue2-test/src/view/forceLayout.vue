<template>
  <div>
    <div id="xxxa" style="height: 500px"></div>
  </div>
</template>

<script>
import { Graph, Edge, Shape, NodeView } from "@antv/x6";
import { ForceLayout } from "@antv/layout";

import "@antv/x6-vue-shape";
export default {
  mounted() {
    this.graph = new Graph({
      container: document.getElementById("xxxa"),
      grid: true,
    });


    this.layout()



  },
  methods: {
    getModelFromOriginData(originData) {
      const model = {
        nodes: [],
        edges: [],
      };
      originData.nodes.forEach((item) => {
        model.nodes.push({
          id: item.id,
          shape: "circle",
          width: item.size,
          height: item.size,
          x: item.x,
          y: item.y,
          label: item.id,
          attrs: {
            body: {
              fill: "#855af2",
              stroke: "transparent",
            },
          },
        });
      });
      originData.edges.forEach((item) => {
        model.edges.push({
          source: item.source,
          target: item.target,
          attrs: {
            line: {
              stroke: "#ccc",
              strokeWidth: 1,
              targetMarker: null,
            },
          },
        });
      });
      return model;
    },
    layout() {
      const forceLayout = new ForceLayout({
        type: "force",
        center: [369, 180],
        preventOverlap: true,
        // 默认边长度
        linkDistance: (d) => {
          if (d.source.id === "node0") {
            return 100;
          }
          return 30;
        },
        // 节点作用力
        nodeStrength: (d) => {
          if (d.isLeaf) {
            return -50;
          }
          return -10;
        },
        /** 边的作用力, 默认为根据节点的入度出度自适应 */
        edgeStrength: (d) => {
          if (["node1","node2","node3"].includes(d.source.id)) {
            return 0.7;
          }
          return 0.1;
        },
        tick: () => {
          const model = this.getModelFromOriginData(this.originData);
          this.graph.fromJSON(model);
        },
      });
      forceLayout.layout(this.originData);
    }
  },
  data() {
    return {
      graph: null,
      originData: {
        nodes: [
          { id: "node0", size: 50, x: 0, y: 0 },
          { id: "node1", size: 30, x: 0, y: 0 },
          { id: "node2", size: 30, x: 0, y: 0 },
          { id: "node3", size: 30, x: 0, y: 0 },
          { id: "node4", size: 30, x: 0, y: 0 },
          { id: "node5", size: 30, x: 0, y: 0 },
          { id: "node6", size: 15, x: 0, y: 0 },
          { id: "node7", size: 15, x: 0, y: 0 },
          { id: "node8", size: 15, x: 0, y: 0 },
          { id: "node9", size: 15, x: 0, y: 0 },
          { id: "node10", size: 15, x: 0, y: 0 },
          { id: "node11", size: 15, x: 0, y: 0 },
          { id: "node12", size: 15, x: 0, y: 0 },
          { id: "node13", size: 15, x: 0, y: 0 },
          { id: "node14", size: 15, x: 0, y: 0 },
          { id: "node15", size: 15, x: 0, y: 0 },
          { id: "node16", size: 15, x: 0, y: 0 },

          { id: "node17", size: 80, x: 0, y: 0 },
          { id: "node18", size: 15, x: 0, y: 0 },
          { id: "node19", size: 15, x: 0, y: 0 },
          { id: "node20", size: 15, x: 0, y: 0 },
          { id: "node21", size: 15, x: 0, y: 0 },
          { id: "node22", size: 15, x: 0, y: 0 },
        ],
        edges: [
          { source: "node0", target: "node17" },
          { source: "node0", target: "node2" },
          { source: "node0", target: "node3" },
          { source: "node0", target: "node4" },
          { source: "node0", target: "node5" },
          { source: "node1", target: "node6" },
          { source: "node1", target: "node7" },
          { source: "node2", target: "node8" },
          { source: "node2", target: "node9" },
          { source: "node2", target: "node10" },
          { source: "node2", target: "node11" },
          { source: "node2", target: "node12" },
          { source: "node2", target: "node13" },
          { source: "node3", target: "node14" },
          { source: "node3", target: "node15" },
          { source: "node3", target: "node16" },
        ],
      }
    }
  }
};
</script>

<style>
</style>