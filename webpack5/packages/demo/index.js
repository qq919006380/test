import Demo from './src/index.vue'

// 为组件提供 install 安装方法，供按需引入
Demo.install = function (Vue) {
  Vue.component(Demo.name, Demo)
}

// 导出组件
export default Demo