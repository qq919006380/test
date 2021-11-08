<template>
    <div class="app">
        <div class="app-content">
            <div class="refContainer"></div>
            <div class="mini-map-container" ref="miniMapContainerRef"></div>
        </div>
    </div>
</template>

<script>
import { Graph, Color } from '@antv/x6'
import './app.css'
export default {
    data() {
        return {
            graph: null,
            viewport: null
        }
    },
    mounted() {
        let appContent = document.querySelector('.app-content')
        function getScrollTop() {
            return appContent.scrollTop;
        }
        function getScrollLeft() {
            return appContent.scrollLeft;
        }
        // 滚动刷新viewport位置和大小
        appContent.onscroll = () => {
            var scrollWidth = getScrollLeft()
            var scrollHeight = getScrollTop()
            let height = appContent.clientHeight
            let width = appContent.clientWidth
            this.viewport.position(scrollWidth, scrollHeight)
            this.viewport.size(width, height)

        }

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
            // 开启小地图
            minimap: {
                enabled: true,
                container: this.$refs.miniMapContainerRef,
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

        window.onscroll = () => this.setWindowBBox()
        window.onresize = () => this.setWindowBBox()

        this.setWindowBBox()
        this.onChanged({
            count: 1000,//设置节点数量
            columns: 40,
            batch: 400,
            padding: 60,
            customViewport: true,//当前视窗
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
            window.windowBBox = this.windowBBox
        },

        onChanged(settgins) {
            console.time('perf-all')

            this.padding = settgins.padding//边距
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
                    width: 100,
                    height: 100,
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
            let appContent = document.querySelector('.app-content')
            let height = appContent.clientHeight
            let width = appContent.clientWidth
            this.viewport = this.graph.createNode({
                zIndex: -1,
                width: width - 20,
                height: height - 20,
                x: 0,
                y: 0,
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
            /**
             *  清空画布并添加用指定的节点/边。
             */
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

<style scoped>
.mini-map-container {
    position: fixed;
    z-index: 999;
    bottom: 20px;
    right: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>