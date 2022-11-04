const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { env } = require('process');

module.exports = env => {

    console.log('NODE_ENV: ', env) // 'local'
    console.log('Production: ', env) // true

  return {
    mode: 'none', 

    devtool: 'inline-source-map',
  
    entry: './src/index.ts',
  
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
  }
};