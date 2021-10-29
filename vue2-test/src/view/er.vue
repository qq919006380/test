<template>
  <div id="container"></div>
</template>

<script>
import "@antv/x6-vue-shape";
import Count from "../components/Count.vue";
import { Graph } from "@antv/x6";

export default {
  mounted() {
    this.graph = new Graph({
      container: document.getElementById("container"),
      width: 600,
      height: 600,
      grid: true,
    });
    for (var i = 0; i < 2; i++) {
      this.addNode();
    }
    this.graph.fromJSON(this.data);
  },
  data() {
    return {
      graph: null,
      data: {
        nodes: [],
      },
    };
  },
  methods: {
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
        ports: {
          groups: {
            in: {
              position: "left", // 链接桩位置
              label: {
                position: "left", // 标签位置
              },
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#2d8cf0",
                  strokeWidth: 1,
                  fill: "#fff",
                },
              },
            },
            out: {
              position: "right", // 链接桩位置
              label: {
                position: "right", // 标签位置
              },
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#2d8cf0",
                  strokeWidth: 1,
                  fill: "#fff",
                },
              },
            },
          },
          items: [
            {
              id: "port1",
              group: "in",
            },
            {
              id: "port2",
              group: "out",
            },
          ],
        },
        component: {
          template: `<count :data="data" ></count>`,
          data() {
            return { data: { chnname: "xx", name: "sda" } };
          },
          components: {
            Count,
          },
        },
      });
    },
  },
};
</script>

<style>
</style>