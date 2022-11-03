 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');
 const webpack = require('webpack');

 module.exports = merge(common, {
   mode: 'production',
   plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // })
   ]
 })