export default [
  {
    path: 'blog',
    name: 'blog',
    component: () => import('@/pages/blog'),
    meta: {
      title: '博客管理',
      icon: 'file-markdown'
    },
  },
  {
    path: '/blog/detail',
    name: 'detail',
    meta: {
      title: '博客详情',
      icon: 'file-markdown'
    },
    hidden: true,
    component: () => import('@/pages/blog/detail')
  }
]
