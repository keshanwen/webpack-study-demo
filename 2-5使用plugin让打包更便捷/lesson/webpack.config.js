const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
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
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}]
	},
	// 每次打包生成打包后的文件，都不会自动生成index.html。我们都要自己添加index.html然后再引入打包后的js
	// HtmlWebpackPlugin插件就是在打包后的文件中，自动生成index.html而且自动引入打包后的js文件。
	// 但是它生成的可能不是我们向要运行的index.html，它只是生成index.html，和引入打包后的js。
	// 这个时候可以配置html模板，让打包后的html向我们设置的html模板一样
	plugins: [new HtmlWebpackPlugin({
		// html模板设置
		template: 'src/index.html'
		// CleanWebpackPlugin插件会在每次打包后，将上回打包后的文件清除
	}), new CleanWebpackPlugin(['dist'])],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}