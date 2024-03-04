const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack  = require('webpack')

// console.log(process.env.NODE_ENV, '配置文件中~~~~~~~~~~~~~~')
console.log('process.env.NODE_ENV  配置文件中~~~~~~~~~~~~~~',process.env.NODE_ENV);// undefined
// clear

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
        use: ['style-loader', 'css-loader']
      }
    ]
  },


  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

   new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
   })
  ]
}