const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log(process.env.NAME_W, 'env')

module.exports = {

    mode: 'none', 

    devtool: 'inline-source-map',
  
    entry: './src/index.js',
  
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
  
    plugins: [
      new HtmlWebpackPlugin({
          title: 'Output Management'
      }),
      new CleanWebpackPlugin(),
    ],
  
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
  
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
};