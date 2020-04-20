import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './combineRouter'
Vue.use(VueRouter)

 const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  next()
})

router.afterEach((to) => {
  to.meta.title && (document.title = to.meta.title)
})

export default router
