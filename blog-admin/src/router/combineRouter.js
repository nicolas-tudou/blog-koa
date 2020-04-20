import userRouter from './userRouter'
import categoryRouter from './categoryRouter'
import blogRouter from './blogRouter'
import commentRouter from './commentRouter'
import tagRouter from './tagRouter'

const routes = [
  {
    path: '/signIn',
    name: 'signIn',
    meta: {
      title: '登陆'
    },
    hidden: true,
    component: () => import('@/pages/user/signIn')
  },
  {
    path: '/',
    name: 'root',
    meta: {
      title: '博客管理',
      icon: 'home'
    },
    hidden: true,
    component: () => import('@/pages/root'),
    redirect: '/blog',
    children: [
      ...blogRouter,
      ...categoryRouter,
      ...commentRouter,
      ...tagRouter,
      ...userRouter
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: '/blog'
  }
]
export default routes
