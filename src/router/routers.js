export default [
    {path: '/', redirect: 'list'},
    { path: '/list', name: 'list',  component: () => import('~/view/list.vue')},
    { path: '/week', name: 'week',  component: () => import('~/view/week.vue')}
]