const HtmlWebPackPlugin = require('html-webpack-plugin'),
  { resolve } = require('path');

module.exports = {
  mode : 'development',
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolve(__dirname, 'src/index.html')
    })
  ],
  devServer: {
    open: true,
    static: './'
  }
}