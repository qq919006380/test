export default [
    { path: '/', name: "默认", redirect: 'list' },
    { path: '/list', name: '列表', component: () => import('@/view/list.vue') },
    { path: '/week', name: '选择周', component: () => import('@/view/week.vue') },
    { path: '/props', name: 'props', component: () => import('@/view/pop.vue') },
    { path: '/initData', name: '初始化data', component: () => import('@/view/initData.vue') },
    { path: '/orderTable', name: '订单table', component: () => import('@/view/orderTable/index.vue') },
    { path: '/selectTable', name: '多选&单选table', component: () => import('@/view/selectTable.vue') },
    { path: '/fatherPassChild', name: '父组件传数据给子组件', component: () => import('@/view/fatherPassChild/father.vue') },
    { path: '/slot', name: '按钮状态管理', component: () => import('@/view/slot/demo.vue') },
    { path: '/multipleSelect ', name: '全选下拉框', component: () => import('@/view/multipleSelect.vue') },
    { path: '/area ', name: 'area', component: () => import('@/view/area.vue') },
    { path: '/attrs ', name: 'attrs组件穿透', component: () => import('@/view/attrs/index.vue') },
    { path: '/flex', name: 'flex布局最后一行左对齐', component: () => import('@/view/flex.vue') },
    { path: '/tree', name: 'tree', component: () => import('@/view/tree/index.vue') },
    { path: '/click', name: '子组件点击事件', component: () => import('@/view/clickEvent/index.vue') },
    { path: '/uploadPic', name: '图片上传组件（未完善）', component: () => import('@/view/uploadPic/index.vue') },
    { path: '/modalProps', name: '弹窗组件之间的数据传输', component: () => import('@/view/modalProps/index.vue') },
    { path: '/pencil', name: '手绘', component: () => import('@/view/pencil.vue') },
    { path: '/pencil2', name: '手绘2', component: () => import('@/view/pencil2.vue') },
    { path: '/promise', name: 'promise', component: () => import('@/view/promise.vue') },
    { path: '/父子组件异步请求watch不触发问题', name: 'watch', component: () => import('@/view/watch/index.vue') },
    { path: '/api', name: 'api', component: () => import('@/view/api.vue') },
    { path: '/vue的render函数', name: 'render', component: () => import('@/view/render.vue') },
    
]
// 高级通讯
// $attrs 和 $listeners
// 中央事件总线 EventBus
// provide 和 inject
// $parent 和 $children
// $boradcast 和 $dispatch
// Vuex 状态管理
// findComponents 