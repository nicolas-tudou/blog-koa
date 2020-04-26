const Router = require('koa-router')

import common from './common'
import blog from './blog'
import admin from './blog'

const router = new Router({
  prefix: '/api'
})

common(router)
blog(router)
admin(router)

export default router