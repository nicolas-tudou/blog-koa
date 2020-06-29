const Koa = require('koa')
const app = new Koa()

const views = require('koa-views')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const cors = require('koa2-cors')
const path = require('path')


import { port } from './config'
import errCode from './config/errorCode'

import router from './router'
// error handler
onerror(app)

// middlewares
app
  .use(helmet())
  .use(bodyparser())
  .use(cors())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(require('koa-static')(__dirname + '/views'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}}
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx, next) => {
    next().catch(err => {
      ctx.throw(500)
    })
  })

router.get('/', async (ctx, next) => {
  await ctx.render('admin/index')
})
router.get('*', async (ctx, next) => {
  await ctx.render('admin/index')
})

app.on('error', function(err, ctx) {
  return
})

module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
