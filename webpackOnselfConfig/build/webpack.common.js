const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar') // 打包进度条插件
const envConfig = require('./webpack.env.config.js'); // 自定义常量
const { getHtmlTiltle } = require('./util.js')
const { isProduction } = require('./util.js')

const baseConfig = {
  entry: {
    app: path.join(__dirname,'../src/index.ts'),
  },

  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          "postcss-loader", 
          "sass-loader"
        ]
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset",
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(eot|svg|ttf|woff2?|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]-[hash][ext]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: getHtmlTiltle(),
      template: path.join(__dirname,'../public/index.html')
    }),
    new VueLoaderPlugin(),
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