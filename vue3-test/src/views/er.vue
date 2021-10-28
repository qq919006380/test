<template>
    <button @click="content">居中</button>
    <button @click="download">导出</button>
    <button @click="addNode">添加节点</button>
    <button @click="addEdge">关联节点</button>
    <div id="container"></div>
</template>

<script>
import { Graph, DataUri, Shape } from "@antv/x6";
import "@antv/x6-vue-shape";
import Count from "../components/count.vue";

export default {
    mounted() {
        //   渲染画布
        this.graph = new Graph({
            container: document.getElementById("container"),
            width: 800,
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
        });
        this.graph.enableMouseWheel(); //启用鼠标滚轮缩放画布。




        // 渲染data
        this.graph.fromJSON(this.data);
    },
    data() {
        return {
            num: 0,
            graph: null,
            data: {
                // 节点
                nodes: [
                    {
                        id: "node-a", // String，可选，节点的唯一标识
                        x: 40, // Number，必选，节点位置的 x 值
                        y: 40, // Number，必选，节点位置的 y 值
                        width: 80, // Number，可选，节点大小的 width 值
                        height: 40, // Number，可选，节点大小的 height 值
                        label: "hello-a", // String，节点标签
                        ports: [
                            {
                                id: "port1",
                                attrs: {
                                    circle: {
                                        r: 6,
                                        magnet: true,
                                        stroke: "#31d0c6",
                                    },
                                },
                            },
                            { id: "port2" },
                        ],
                    },
                    {
                        id: "node-b", // String，节点的唯一标识
                        x: 160, // Number，必选，节点位置的 x 值
                        y: 180, // Number，必选，节点位置的 y 值
                        width: 80, // Number，可选，节点大小的 width 值
                        height: 40, // Number，可选，节点大小的 height 值
                        label: "world-b", // String，节点标签
                    },
                ],
                // 边
                edges: [
                    {
                        source: "node-b", // String，必须，起始节点 id
                        target: "node-a", // String，必须，目标节点 id
                        router: {
                            name: "manhattan",
                            args: {
                                startDirections: ["top"],
                                endDirections: ["bottom"],
                            },
                        },
                        connector: {
                            name: "rounded",
                        },
                    },
                ],
            },
        };
    },
    methods: {

        content() {
            this.graph.centerContent();
            this.graph.zoom(0.2);
        },
        download() {
            this.graph.toPNG((dataUri) => {
                // 下载
                DataUri.downloadDataUri(dataUri, "chart.png");
            });
        },
        addNode() {
            // const rect = {
            //     id: "node-add",
            //     x: 0,
            //     y: 0,
            //     width: 80,
            //     height: 40,
            //     label: "add-node",
            //     zIndex: 2,
            // };
            // this.graph.addNode(rect);

            this.graph.addNode({
                shape: 'vue-shape',
                width: 200,
                height: 200,
                x: 100,
                y: 100,
                attrs: {
                    body: {
                        width: 200,
                        height: 200,
                        stroke: 'red',
                    }
                },
                component: function () {
                    return {
                        template: `<Count :num="num" @add="add()"></Count>`,
                        data() {
                            return { num: 0 }
                        },
                        methods: {
                            add: () => {
                                this.data.num += 1
                            }
                        },
                        components: { Count }
                    }
                }
            });
        },

        addEdge() {
            const edge = new Shape.Edge({
                id: "edge1",
                source: "node-add",
                target: "node-b",
                zIndex: 1,

                router: {
                    name: "manhattan",
                    args: {
                        startDirections: ["top"],
                        endDirections: ["bottom"],
                    },
                },
                connector: {
                    name: "rounded",
                },
            });
            this.graph.addEdge(edge);
        },
    },
};
</script>

<style>
</style>
