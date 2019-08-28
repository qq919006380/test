export default [
    { path: '/', name: "默认", redirect: 'list' },
    { path: '/list', name: '列表', component: () => import('~/view/list.vue') },
    { path: '/week', name: '选择周', component: () => import('~/view/week.vue') },
    { path: '/props', name: 'props', component: () => import('~/view/pop.vue') },
    { path: '/initData', name: '初始化data', component: () => import('~/view/initData.vue') },
    { path: '/orderTable', name: '订单table', component: () => import('~/view/orderTable/index.vue') },
    { path: '/selectTable', name: '多选&单选table', component: () => import('~/view/selectTable.vue') },

]