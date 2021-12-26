<template>
  <div>
    <div id="xxxa" style="height: 500px"></div>
    {{ this.originData }}
  </div>
</template>

<script>
import { Graph, Edge, Shape, NodeView } from "@antv/x6";
import { ForceLayout, ForceAtlas2Layout } from "@antv/layout";

import "@antv/x6-vue-shape";
export default {
  mounted() {
    this.graph = new Graph({
      container: document.getElementById("xxxa"),
      grid: true,
      panning: {
        enabled: true,
      },
      width:2000,
      height:2000,
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
    });
    for (let i = 0; i < 100; i++) {
      this.originData.nodes.push({ id: "node0x"+i, cluster: "clu1", size: 50, x: 0, y: 0 },)
    }
    this.layout()

  },
  methods: {
    getModelFromOriginData(originData) {
      let colorMap = {
        clu1: "#BDD2FD",
        clu2: "#BDEFDB",
        clu3: "#F6C3B7",
        clu4: "#FFD8B8",
        clu5: "#D3C6EA",
      };
      const model = {
        nodes: [],
        edges: [],
      };
      originData.nodes.forEach((item) => {
        model.nodes.push({
          id: item.id,
          cluster: item.cluster,
          shape: "rect",
          // width: item.size,
          // height: item.size,
          width:100,
          height:30,
          x: item.x,
          y: item.y,
          label: item.id,
          attrs: {
            body: {
              fill: colorMap[item.cluster] || "#D3C6EA",
              stroke: "#999",
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
        clustering: true,
        clusterNodeStrength: -5,
        clusterEdgeDistance: 3,
        clusterNodeSize: 50,
        clusterFociStrength: 1.2,
        nodeSpacing: 30,
        preventOverlap: true,

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
          { id: "node0", cluster: "clu1", size: 50, x: 0, y: 0 },
          { id: "node1", cluster: "clu1", size: 30, x: 0, y: 0 },
          { id: "node2", cluster: "clu1", size: 30, x: 0, y: 0 },
          { id: "node3", cluster: "clu2", size: 30, x: 0, y: 0 },
          { id: "node4", cluster: "clu2", size: 30, x: 0, y: 0 },
          { id: "node5", cluster: "clu2", size: 30, x: 0, y: 0 },
          { id: "node6", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node7", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node8", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node9", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node10", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node11", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node12", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node13", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node14", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node15", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node16", cluster: "clu2", size: 15, x: 0, y: 0 },

          { id: "node17", cluster: "clu3", size: 80, x: 0, y: 0 },
          { id: "node18", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node19", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node20", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node21", cluster: "clu2", size: 15, x: 0, y: 0 },
          { id: "node22", cluster: "clu2", size: 15, x: 0, y: 0 },
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