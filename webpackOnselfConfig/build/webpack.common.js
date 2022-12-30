const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar') // 打包进度条插件
const envConfig = require('./webpack.env.config.js'); // 自定义常量
const { getHtmlTiltle } = require('./util.js')

const baseConfig = {
  entry: {
    app: path.join(__dirname,'../src/index.js'),
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title: getHtmlTiltle(),
    }),
    new WebpackBar(),
    // 将自定义常量注入到业务代码中
    new webpack.DefinePlugin({
      'CUSTOMCONSTANTS': JSON.stringify({
        ...envConfig
      })
    }),
  ],

}


module.exports = {
  baseConfig
};