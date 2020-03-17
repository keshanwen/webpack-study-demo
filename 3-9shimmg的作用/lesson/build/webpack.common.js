const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}, {
				// 让模块中的this指向window
				loader: 'imports-loader?this=>window'
			}]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
		// 对于有些模块想用jquery但是没有引入import,怎么办可以利用webpack的内置插件
		// 可以利用webpack的内置插件提供，这样可以不用在具体的模块中，import
		// 当它发现当前模块中有$,它就会引入jquery
		new webpack.ProvidePlugin({
			$: 'jquery',
			_join: ['lodash', 'join']
		}),
	],
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
      chunks: 'all',
      cacheGroups: {
      	vendors: {
      		test: /[\\/]node_modules[\\/]/,
      		priority: -10,
      		name: 'vendors',
      	}
      }
    }
	},
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist')
	}
}