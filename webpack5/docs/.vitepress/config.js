module.exports = {
  title: "pencil-vue",
  description: "一个手绘风格的UI框架",
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],
  themeConfig: {
    logo: "/logo.jpg",
    repo: "qq919006380/pencil-vue", // 添加 github 链接
    nav: [{ text: "Home", link: "/index" }],
    sidebar: {
      '/': [
        {
          text: '入门',
          children: [
            { text: '安装', link: '/install/index' },
            { text: '安装', link: '/install/readem' },
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
  }
}
