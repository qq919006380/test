const { usePlus } = require('./plus');
module.exports = {
  title: "pencil-vue",
  description: "一个手绘风格的UI框架",
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],
  // dest:"public",
  themeConfig: {
    logo: "/logo.jpg",
    repo: "qq919006380/pencil-vue", // 添加 github 链接
    nav: [{ text: "Home", link: "/" }],
    sidebar: [
      {
        text: '入门',
        children: [
          { text: '安装', link: '/install/' },
        ],
      },
      {
        text: '组件',
        children: [
          { text: '按钮', link: '/components/button' },
          { text: '输入框', link: '/components/input' },
          { text: '卡片', link: '/components/card' },
        ],
      },
    ],
  },
  markdown: {
    lineNumbers: true,
    // options for markdown-it-anchor
     anchor: { permalink: false },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },

    config: usePlus,
  },

}
