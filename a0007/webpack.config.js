const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	// development devtool: 'cheap-module-eval-source-map', 一般在开发中使用这种方式打包
	// production devtool: 'cheap-module-source-map', 一般在生成中使用这中方式打包
	devtool: 'cheap-module-eval-source-map',
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
	plugins: [new HtmlWebpackPlugin({
		template: 'src/index.html'
	}), new CleanWebpackPlugin(['dist'])],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}

// 什么是sourcemap
// 如果你打包后的文件中有什么地方出错了，那怎么知道是那个地方错了呢？
// 一般只会报打包后的文件那里出错了，不会报源代码那里出错了。
// devtool配置就是，告诉源代码那里出错误了
// source-map文件就是会在打包后的文件中生成.map文件
// inline 就是不会生成.map文件,它会生在打包后的js文件中
// cheap 是告诉源代码中的错误是在那一行
// 没有cheap就是告诉源代码中的错误是在那一行，那一列
// module 是不但指出自己的代码那里出错误，而且指出第三方模块那里的代码出错误
// eval是一种最快的打包模式