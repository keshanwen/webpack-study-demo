const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	entry: {
		main: './src/index.js'
	},
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
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
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin()
	],
	// tree-shaking 代码在打包时可能有些代码不需要，所以这个时候就用到了treeshaking
	// mode: 'develop' 时要设置下面的
	// 打包后的js文件中，会将引入但是没有直接调用的文件打包进去，但是有说明用了哪些文件，（不是说不打包
	// 没有用的文件吗？这样是为了更好的查看代码在那一行出错误了，因为如果省了没用代码，那么就会造成代码行数
	// 改变）
	// 问题来了，有些文件引入了css文件但是没有直接调用，那么要在package.js的sideEffects: []中设置，以免
	// 将css文件给去掉了，因为它有用到，只是没有直接调用。
	optimization: {
		usedExports: true
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}