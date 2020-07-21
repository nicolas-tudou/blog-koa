const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  configureWebpack: {
    plugins: [
      new StylelintWebpackPlugin({
        files: ['src/**/*.vue', 'src/assets/css/*.l?(e|c)ss']
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      new LodashModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin({ analyzerPort: 8888 }),
    ],
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js')
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minChunks: 2
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://admin.todo-fordream.club/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
