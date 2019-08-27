export default [
    { path: '/', redirect: 'list' },
    { path: '/list', name: 'list', component: () => import('~/view/list.vue') },
    { path: '/week', name: 'week', component: () => import('~/view/week.vue') },
    { path: '/pop', name: 'pop', component: () => import('~/view/pop.vue') },
    { path: '/initData', name: 'initData', component: () => import('~/view/initData.vue') },
    { path: '/orderTable', name: 'orderTable', component: () => import('~/view/orderTable/index.vue') },
]