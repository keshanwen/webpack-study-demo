const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { baseConfig } = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'production',
});