const { merge } = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { baseConfig } = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'production',

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css'
    }),
  ]
});