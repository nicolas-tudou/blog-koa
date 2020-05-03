const Router = require('koa-router')

import common from './common'
import blog from './blog'
import admin from './admin'

const router = new Router()

common(router)
blog(router)
admin(router)

export default router