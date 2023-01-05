const { merge } = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { baseConfig } = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'production',

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css'
    }),
    new CopyWebpackPlugin({
      // from后的路径是相对于项目的根目录，to后的路径是相对于打包后的dist目录
      patterns: [{ from: "./public/lodash.min.js", to: "./public/lodash.min.js" }],
    }),
  ]
});