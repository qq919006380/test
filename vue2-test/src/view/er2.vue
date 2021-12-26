<template>
  <div id="container" style="height: 500px"></div>
</template>

<script >
import { Graph,  Shape } from "@antv/x6";

const LINE_HEIGHT = 24;
const NODE_WIDTH = 150;


const data1 = [
  {
    id: "1",
    shape: "er-rect",
    label: "学生",
    width: 150,
    height: 24,
    position: {
      x: 24,
      y: 150,
    },
    ports: [
      {
        id: "1-1",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "ID",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
      {
        id: "1-2",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "Name",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
      {
        id: "1-3",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "Class",
          },
          portTypeLabel: {
            text: "NUMBER",
          },
        },
      },
      {
        id: "1-4",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "Gender",
          },
          portTypeLabel: {
            text: "BOOLEAN",
          },
        },
      },
    ],
  },
  {
    id: "2",
    shape: "er-rect",
    label: "课程",
    width: 150,
    height: 24,
    position: {
      x: 250,
      y: 210,
    },
    ports: [
      {
        id: "2-1",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "ID",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
      {
        id: "2-2",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "Name",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
      {
        id: "2-3",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "StudentID",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
      {
        id: "2-4",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "TeacherID",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
      {
        id: "2-5",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "Description",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
    ],
  },
  {
    id: "3",
    shape: "er-rect",
    label: "老师",
    width: 150,
    height: 24,
    position: {
      x: 480,
      y: 350,
    },
    ports: [
      {
        id: "3-1",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "ID",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
      {
        id: "3-2",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "Name",
          },
          portTypeLabel: {
            text: "STRING",
          },
        },
      },
      {
        id: "3-3",
        group: "list",
        attrs: {
          portNameLabel: {
            text: "Age",
          },
          portTypeLabel: {
            text: "NUMBER",
          },
        },
      },
    ],
  },



  {
    id: "4-2",
    shape: "edge",
    source: {
      cell: "1",
      port: "1-3",
    },
    target: {
      cell: "2",
      port: "2-4",
    },
    attrs: {
      line: {
        stroke: "#A2B1C3",
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  },
  {
    id: "4",
    shape: "edge",
    source: {
      cell: "1",
      port: "1-1",
    },
    target: {
      cell: "2",
      port: "2-1",
    },
    attrs: {
      line: {
        stroke: "#A2B1C3",
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  },
  {
    id: "5",
    shape: "edge",
    source: {
      cell: "1",
      port: "1-1",
    },
    target: {
      cell: "2",
      port: "2-3",
    },
    attrs: {
      line: {
        stroke: "#A2B1C3",
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  },
  {
    id: "6",
    shape: "edge",
    source: {
      cell: "2",
      port: "2-3",
    },
    target: {
      cell: "3",
      port: "3-1",
    },
    attrs: {
      line: {
        stroke: "#A2B1C3",
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  },
];

export default {
  components: {
    // LabelTypeTree,
    // DataModelLibrarySide,
  },
  data() {
    return {};
  },
  methods: {
    init() {
      Graph.registerPortLayout(
        "erPortPosition",
        (portsPositionArgs) => {
          return portsPositionArgs.map((_, index) => {
            return {
              position: {
                x: 0,
                y: (index + 1) * LINE_HEIGHT,
              },
              angle: 0,
            };
          });
        },
        true
      );

      Graph.registerNode(
        "er-rect",
        {
          inherit: "rect",
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
          ],
          attrs: {
            rect: {
              strokeWidth: 1,
              stroke: "#5F95FF",
              fill: "#5F95FF",
            },
            label: {
              fontWeight: "bold",
              fill: "#ffffff",
              fontSize: 12,
            },
          },
          ports: {
            groups: {
              list: {
                markup: [
                  {
                    tagName: "rect",
                    selector: "portBody",
                  },
                  {
                    tagName: "text",
                    selector: "portNameLabel",
                  },
                  {
                    tagName: "text",
                    selector: "portTypeLabel",
                  },
                ],
                attrs: {
                  portBody: {
                    width: NODE_WIDTH,
                    height: LINE_HEIGHT,
                    strokeWidth: 1,
                    stroke: "#5F95FF",
                    fill: "#EFF4FF",
                    magnet: true,
                    event: "port:click",
                  },
                  portNameLabel: {
                    ref: "portBody",
                    refX: 6,
                    refY: 6,
                    fontSize: 10,

                  },
                  portTypeLabel: {
                    ref: "portBody",
                    refX: 95,
                    refY: 6,
                    fontSize: 10,
                  },
                },
                position: "erPortPosition",
              },
            },
          },
        },
        true
      );

      const graph = new Graph({
        container: document.getElementById("container"),
        interacting: function (cellView) {
          return { magnetConnectable: false };
        },
        connecting: {
          router: {
            name: "er",
            args: {
              offset: 25,
              direction: "H",
            },
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: "#A2B1C3",
                  strokeWidth: 2,
                },
              },
            });
          },
        },
      });


      graph.on("port:click", ({ e }) => {
        let newSelectId = e.target.parentElement.getAttribute('port')
        window.e = graph.getEdges()
        clearAllEdgesStyle()
        function recursion(source) {
          graph.getEdges().forEach(edge => {
            if (edge.source.port == source) {
              edge.attr(
                'line', {
                stroke: '#ff0000',
                strokeWidth: 2,
              });
              recursion(edge.target.port)
            }
          })
        }
        recursion(newSelectId)
      });

      // 清空所有线的样式
      function clearAllEdgesStyle() {
        graph.getEdges().forEach(edge => {
          edge.attr(
            'line', {
            stroke: '#A2B1C3',
            strokeWidth: 2,
          });
        })
      }



      const cells = [];
      data1.forEach((item) => {
        if (item.shape === "edge") {
          cells.push(graph.createEdge(item));
        } else {
          cells.push(graph.createNode(item));
        }
      });

      graph.resetCells(cells);
      graph.zoomToFit({ padding: 10, maxScale: 1 });

    },






  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
</style>
