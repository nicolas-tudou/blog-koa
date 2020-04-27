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

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - $ms`)
// })

router.get('/admin', async (ctx, next) => {
  await ctx.render('admin/index')
})
router.get('/blog', async (ctx, next) => {
  await ctx.render('blog/index')
})

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
