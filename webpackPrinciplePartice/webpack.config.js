// ./webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const RemoveCommentsPlugin = require('./remove-comments-plugin')
const path = require('path')

module.exports = {

  mode: 'none',

  devtool: 'eval', // source map 设置

  entry: './src/main.js',

  output: {

    filename: 'bundle.js'

  },

  module: {

    rules: [

      {

        test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader

         // 对同一个模块使用多个 loader，注意顺序
         use: [
          'style-loader',
          'css-loader'
        ]

      },

      {
        test: /\.md$/,
        use: [
          'html-loader',
          './markdown-loader.js'
        ]
      }

    ]

  },

  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      template: './src/index.html'
    }),
    // new CopyWebpackPlugin({
    //   patterns: ['public'] // 需要拷贝的目录或者路径通配符
    // }),
    new RemoveCommentsPlugin()
  ],

  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    // static: path.join(__dirname, "public"),
    port: 9000,
  }

}



