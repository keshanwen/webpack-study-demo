const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar') // 打包进度条插件

module.exports = {
  entry: {
    app: path.join(__dirname,'../src/index.js'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
    new WebpackBar() 
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
};