const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
// import webpack from 'webpack'
module.exports = {
  configureWebpack: {
    plugins: [
      new StylelintWebpackPlugin({
        files: ['src/**/*.vue', 'src/assets/css/*.l?(e|c)ss']
      })
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
