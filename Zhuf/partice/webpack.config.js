const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  // mode: 'development',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.less$/,
        use: [
          'style-loader', 'css-loader', 'postcss-loader', 'less-loader'
        ]
      },
      {
        test: /\.png$/,
        type: 'asset/resource'
      },
      {
        test: /\.ico$/,
        type: 'asset/inline'
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
      }

    ],
  },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 9000,
      proxy: {
          "/api": {
            target: 'http://localhost:3000',
            pathRewrite:{"^/api":""}
          }
      }
    }
  }