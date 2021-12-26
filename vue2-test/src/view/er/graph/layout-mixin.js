import { ForceLayout, GridLayout, ERLayout } from "@antv/layout";
export default {
    methods: {
        /**
        * 网格布局
        */
        layout() {
            const gridLayout = new GridLayout({
                begin: [0, 0],
                type: 'grid',
                preventOverlap: true,
                preventOverlapPadding: 80,//节点间距
            })
            let model = gridLayout.layout(this.data);//返回新数据带xy
            this.graph.fromJSON(model);

        },
        // 力导向聚类布局
        forceLayout() {
            const forceLayout = new ForceLayout({
                type: "force",
                preventOverlap: true,
                workerEnabled: true, //是否启用 web-worker 以防布局计算时间过长阻塞页面交互
                clustering: true, //是否按照聚类信息布局
                clusterNodeStrength: -5, //聚类节点作用力。负数代表斥力
                clusterEdgeDistance: 10, //聚类边长度
                clusterNodeSize: 120, //聚类节点大小 / 直径，直径越大，越分散
                clusterFociStrength: 1.2, //用于 foci 的力
                nodeSpacing: 30, //preventOverlap 为 true 时生效，防止重叠时节点边缘间距的最小值。
                onLayoutEnd: () => {
                    this.graph.fromJSON(this.data);
                }
            });
            forceLayout.layout(this.data);//改变源数据添加xy
        },
        // er布局
        async erLayout() {
            const erLayout = new ERLayout({
                type: "er",
            });
            await erLayout.layout(this.data);
            this.graph.fromJSON(this.data);
        }
    }
}