export default [
  {
    path: 'blog',
    name: 'blog',
    component: () => import('@/pages/blog'),
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/pages/blog/detail')
      }
    ]
  }
]
