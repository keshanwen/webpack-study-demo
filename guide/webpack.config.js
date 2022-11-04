const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: 'development',

    devtool: 'inline-source-map',

    entry: {
        polyfills: './src/polyfills.js',
        index: './src/index.js'
    },
    
    output: {
        filename: '[name].[chunkhash].js',
       // chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Caching'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // })
        new webpack.ProvidePlugin({
            // _: 'lodash'
            join: ['lodash', 'join']
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ],

     optimization: {
        // 模块只导出被使用的成员
        usedExports: true,
        // 压缩输出结果
        minimize: true,
        // 尽可能合并每一个模块到一个函数中
        concatenateModules: true,
    },

    devServer: {
       static: './dist',
       hot: true
    },

}