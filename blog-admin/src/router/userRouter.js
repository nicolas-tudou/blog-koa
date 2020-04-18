export default [
  {
    path: 'signIn',
    name: 'signIn',
    component: () => import('@/pages/user/signIn')
  },
  {
    path: 'signUp',
    name: 'signUp',
    component: () => import('@/pages/user/signUp')
  },
  {
    path: 'user',
    name: 'user',
    component: () => import('@/pages/user')
  }
]
