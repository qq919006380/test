<template>
    <button @click="content">居中</button>
    <button @click="download">导出</button>
    <button @click="addNode">添加节点</button>
    <button @click="addEdge">关联节点</button>
    <div id="container"></div>
</template>

<script>
import { Graph, DataUri, Shape } from '@antv/x6';

export default {
    mounted() {
        this.graph = new Graph({
            container: document.getElementById('container'),
            width: 800,
            height: 600,
            panning: {
                enabled: true,
                // modifiers: 'shift',//快捷键拖放
            },
            background: {
                color: '#fffbe6', // 设置画布背景颜色
            },
            grid: {
                size: 10,      // 网格大小 10px
                visible: true, // 渲染网格背景
            },
        });
        this.graph.enableMouseWheel()//启用鼠标滚轮缩放画布。

        var i = 2
        while (i) {
            i--
            this.data.nodes.push({
                id: 'node' + i, // String，可选，节点的唯一标识
                x: 40 + i,       // Number，必选，节点位置的 x 值
                y: 40 + i,       // Number，必选，节点位置的 y 值
                width: 80,   // Number，可选，节点大小的 width 值
                height: 40,  // Number，可选，节点大小的 height 值
                label: 'hello-' + i, // String，节点标签
            })
        }
        this.graph.fromJSON(this.data)
    },
    data() {
        return {
            graph: null,
            data: {
                // 节点
                nodes: [
                    {
                        id: 'node-a', // String，可选，节点的唯一标识
                        x: 40,       // Number，必选，节点位置的 x 值
                        y: 40,       // Number，必选，节点位置的 y 值
                        width: 80,   // Number，可选，节点大小的 width 值
                        height: 40,  // Number，可选，节点大小的 height 值
                        label: 'hello-a', // String，节点标签
                        ports: [
                            { id: 'port1' },
                            { id: 'port2' },
                        ],
                    },
                    {
                        id: 'node-b', // String，节点的唯一标识
                        x: 160,      // Number，必选，节点位置的 x 值
                        y: 180,      // Number，必选，节点位置的 y 值
                        width: 80,   // Number，可选，节点大小的 width 值
                        height: 40,  // Number，可选，节点大小的 height 值
                        label: 'world-b', // String，节点标签
                    },
                ],
                // 边
                edges: [
                    {
                        source: 'node-b', // String，必须，起始节点 id
                        target: 'node-a', // String，必须，目标节点 id
                    },
                ],
            }
        }
    },
    methods: {
        content() {
            this.graph.centerContent()
            this.graph.zoom(0.2)
        },
        download() {
            this.graph.toPNG((dataUri) => {
                // 下载
                DataUri.downloadDataUri(dataUri, 'chart.png')
            })
        },
        addNode() {
            const rect = new Shape.Rect({
                id: 'node-add',
                x: 0,
                y: 0,
                width: 80,
                height: 40,
                label: 'add-node',
                zIndex: 2,
            })
            this.graph.addNode(rect)
        },
        addEdge() {
            const edge = new Shape.Edge({
                id: 'edge1',
                source: 'node-add',
                target: 'node-b',
                zIndex: 1,

                router: {
                    name: 'manhattan',
                    args: {
                        startDirections: ['top'],
                        endDirections: ['bottom'],
                    },
                },
                connector: {
                    name: 'rounded',
                },
            })
            this.graph.addEdge(edge)

        }
    }
}
</script>

<style>
</style>
