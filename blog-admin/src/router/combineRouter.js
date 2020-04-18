import userRouter from './userRouter'
import categoryRouter from './categoryRouter'
import blogRouter from './blogRouter'
import commentRouter from './commentRouter'
import tagRouter from './tagRouter'

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/pages/root'),
    children: [
      ...userRouter,
      ...categoryRouter,
      ...blogRouter,
      ...commentRouter,
      ...tagRouter
    ]
  },
  {
    path: '*',
    component: () => import('@/pages/404')
  }
]
export default routes
