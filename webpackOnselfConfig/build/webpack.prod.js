const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      PUBLIC_PATH: JSON.stringify(process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : 'production~~~~~~~~')
    }),
  ]
});