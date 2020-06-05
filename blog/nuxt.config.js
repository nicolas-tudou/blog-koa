const path = require('path')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/common.less'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    { src: '@/plugins/components', ssr: true }
  ],
  router: {
    // middleware: 'router',
    extendRoutes (routes, resolve) {
      routes.splice(0, routes.length)
      routes.push({
        path: '/',
        name: 'root',
        redirect: '/blog',
        component: resolve(__dirname, 'pages/index'),
        children: [
          {
            path: '/blog',
            name: 'blog',
            component: resolve(__dirname, 'pages/blog')
          },
          {
            path: '/blog/detail',
            name: 'detail',
            component: resolve(__dirname, 'pages/blogDetail')
          }
        ]
      },
      {
        path: '*',
        redirect: '/blog'
      })
    }
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.forEach(rule => {
        if (rule.test.toString().indexOf('svg') > -1) {
          rule.exclude = [path.resolve(__dirname, './svg')]
        }
      })
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, './svg')],
        options: {
          symbolId: 'icon-[name]'
        }
      })
    }
  }
}
