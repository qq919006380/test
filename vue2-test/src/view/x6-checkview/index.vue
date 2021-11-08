<template>
    <div class="app-content">
        <div class="refContainer"></div>
    </div>
</template>

<script>
import { Graph, Color } from '@antv/x6'
export default {
    data() {
        return {
            graph: null,
        }
    },
    mounted() {
        this.graph = new Graph({
            container: document.querySelector('.refContainer'),
            sorting: 'approx',
            async: true,
            frozen: true,
            grid: {
                size: 10, // 网格大小 10px
                visible: true, // 渲染网格背景
            },
            background: {
                color: "#fffbe6", // 设置画布背景颜色
            },
            //是否可拖动
            panning: {
                enabled: true,
            },
            // 鼠标滚轮的默认行为是滚动页面
            mousewheel: {
                enabled: true,
                modifiers: ['ctrl', 'meta'],
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
        })
        // 画布节点渲染完成
        this.graph.on('render:done', ({ stats }) => {
            console.table(stats)
        })

        this.graph.on('node:change:position', ({ node }) => {
            this.draggedId.push(node.id)
        })

        // 滚动和缩放刷新视窗位置和大小
        let appContent = document.querySelector('.app-content')
        appContent.onscroll = () => this.setWindowBBox()
        appContent.onresize = () => this.setWindowBBox()

        this.setWindowBBox()
        this.onChanged({
            count: 1000,//设置节点数量
            columns: 40,
            batch: 400,
            padding: 60,
            keepRendered: false,//保持渲染
            keepDragged: false,//保持拖动
        })
    },
    methods: {
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

        onChanged(settgins) {
            console.time('perf-all')
            this.padding = settgins.padding
            this.keepRendered = settgins.keepRendered
            this.keepDragged = settgins.keepDragged
            this.draggedId = []

            if (this.count === settgins.count && this.columns === settgins.columns) {
                return
            }

            this.count = settgins.count
            this.columns = settgins.columns

            const count = settgins.count
            const columns = settgins.columns
            const rows = Math.ceil(count / columns)

            const baseColor = Color.randomHex()
            const nodes = Array.from({ length: count }, (_, index) => {
                const row = Math.floor(index / columns)
                const column = index % columns
                const fill = Color.lighten(baseColor, ((row + column) % 8) * 10)
                return this.graph.createNode({
                    zIndex: 2,
                    width: 30,
                    height: 20,
                    x: column * 50 + 30,
                    y: row * 50 + 30,
                    attrs: {
                        body: { fill },
                        label: { text: index, fill: Color.invert(fill, true) },
                    },
                })
            })

            const edges = nodes.map((target, index) => {
                if (index === 0) {
                    return null
                }
                const source = nodes[index - 1]
                return this.graph.createEdge({
                    zIndex: 1,
                    source: { cell: source.id },
                    target: { cell: target.id },
                })
            })

            edges.shift()
            console.time('perf-reset')
            this.graph.freeze()
            this.graph.resize(columns * 50 + 30, rows * 50 + 30)
            /**
             *  清空画布并添加用指定的节点/边。
             */
            this.graph.model.resetCells([...nodes, ...edges])
            console.timeEnd('perf-reset')

            console.time('perf-dump')
            this.graph.unfreeze({
                batchSize: settgins.batch,
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
    }
}
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
</style>