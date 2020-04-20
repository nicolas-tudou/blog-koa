export default [
  {
    path: 'user',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'team'
    },
    component: () => import('@/pages/user')
  }
]
