import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import webpack from 'webpack'
module.exports = {
  outputDir: '../server/views',
  configureWebpack: {
    plugins: [
      new StylelintWebpackPlugin({
        files: ['src/**/*.vue', 'src/assets/css/*.l?(e|c)ss']
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Editormd: 'editor.md/editormd.js'
      })
    ]
  }
}
