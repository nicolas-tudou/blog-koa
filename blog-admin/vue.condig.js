import StylelintWebpackPlugin from 'stylelint-webpack-plugin'

module.exports = {
  configureWebpack: {
    plugins: [
      new StylelintWebpackPlugin({
        files: ['src/**/*.vue', 'src/assets/css/*.l?(e|c)ss']
      })
    ]
  }
}
