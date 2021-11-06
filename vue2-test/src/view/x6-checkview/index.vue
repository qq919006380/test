<template>
    <div class="app">
        <div class="app-content">
            <div class="refContainer"></div>
        </div>
    </div>
</template>

<script>
import { Graph, Cell, Node, Edge, Color, Rectangle } from '@antv/x6'
import './app.css'
export default {
    data() {
        return {
            graph: null,
            container: null
        }
    },
    mounted() {
        let appContent = document.querySelector('.app-content')
        appContent.onscroll = function () {
            // 浏览器可见区域高度为：
            var viewHeight = getViewHeight(),
                // 窗口滚动条高度
                scrollHeight = getScrollTop(),
                // 文档内容实际高度：
                contentHeight = getContentHeight(),
                // 滚动条距离底部的高度
                scrolllBtmHeight = contentHeight - scrollHeight - viewHeight;
            console.log('浏览器可见区域高度为：' + viewHeight + ' 文档内容实际高度：' + contentHeight + ' 滚动条距离顶部的高度为：' + scrollHeight + ' 滚动条距离底部的高度为：' + scrolllBtmHeight);
        }

        this.graph = new Graph({
            container: document.querySelector('.refContainer'),
            sorting: 'approx',
            async: true,
            frozen: true,
            grid: {
                size: 1,
                visible: true,
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
        this.graph.on('render:done', ({ stats }) => {
            console.table(stats)
        })

        this.graph.on('node:change:position', ({ node }) => {
            this.draggedId.push(node.id)
        })

        window.onscroll = () => this.setWindowBBox()
        window.onresize = () => this.setWindowBBox()

        this.setWindowBBox()
        this.onChanged({
            count: 1000,
            columns: 40,
            batch: 400,
            padding: 60,
            customViewport: true,
            keepRendered: false,
            keepDragged: false,
        })
    },
    methods: {
        shouldRenderNode(node, unmounted) {
            if (this.keepDragged && this.draggedId.includes(node.id)) {
                return true
            }

            if (this.keepRendered && unmounted) {
                return true
            }

            if (this.customViewport) {
                const viewportBBox = this.viewport.getBBox()
                return viewportBBox.isIntersectWithRect(
                    node.getBBox().inflate(this.padding),
                )
            }

            if (node === this.viewport) {
                return false
            }

            return this.windowBBox.isIntersectWithRect(
                node.getBBox().inflate(this.padding),
            )
        },
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
            this.customViewport = settgins.customViewport
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

            this.viewport = this.graph.createNode({
                zIndex: 3,
                width: 200,
                height: 200,
                x: 100,
                y: 100,
                label: 'Drag me',
                attrs: {
                    body: {
                        fill: 'rgba(255,0,0,0.6)',
                        stroke: 'rgba(255,0,0,0.8)',
                        strokeWidth: 8,
                    },
                    label: {
                        text: 'Drag me!!',
                        fill: '#fff',
                    },
                },
            })

            console.time('perf-reset')
            this.graph.freeze()
            this.graph.resize(columns * 50 + 30, rows * 50 + 30)
            this.graph.model.resetCells([...nodes, ...edges, this.viewport])
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

<style>
</style>