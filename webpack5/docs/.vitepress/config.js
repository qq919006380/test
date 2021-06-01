module.exports = {
    title: 'pencil-vue',
    description: '一个手绘风格的UI框架',
    head: [["link", { rel: "icon", href: "/logo.jpg" }]],
    hmr: { overlay: false },
    themeConfig: {
        logo: "/logo.jpg",
        repo: "qq919006380/pencil-vue", // 添加 github 链接
        nav: [{ text: "Home", link: "/" }],
        sidebar: [
            {
                text: "入门",
                children: [
                    { link: "/install/", text: "Hello World" }
                ]
            },
            {
                text: "组件",
                children: [
                    { link: "/components/button", text: "button" },
                    { link: "/components/input", text: "input" },
                    { link: "/components/card", text: "card" },
                    { link: "/components/checkbox", text: "checkbox" },
                    { link: "/components/tabs", text: "tabs" },
                    { link: "/components/popover", text: "popover" },
                    { link: "/components/toast", text: "toast" }
                ]
            },
            {
                text: "例子",
                children: [
                    { link: "/demo/", text: "Demo" }
                ]
            }
        ]
    },
    markdown: {
        // options for markdown-it-anchor
        anchor: { permalink: false },

        // options for markdown-it-toc
        toc: { includeLevel: [1, 2] },

        // config: (md) => {
        //   // use more markdown-it plugins!
        //   md.use(require('markdown-it-xxx'))
        // }
    }
}