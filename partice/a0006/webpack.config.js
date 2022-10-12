const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		// 要是打包多个js文件怎么办呢？
		// 就是这样写,key。。。。。value
		// key可以认为是，将要打包出的文件名称
		// 要是只打包一个js文件，那么写的格式是  './src/index.js' ， 其实它是 main: './src/index.js'的缩写
		main: './src/index.js',
		sub: './src/index.js'
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
		// 前面写过，使用HtmlWebpackPlugin会自动生成html文件,而且自动引入js文件。
		// 但是要要是js文件不在本地，在cdn上,那引入的文件路径就会错误，应该在引入的路径上加入
		// http://cdn.com.cn这样的前缀。但是手动写又麻烦。
	    // publicPath 就是让在引入的js文件中自动加上前缀 
		publicPath: 'http://cdn.com.cn',
		// filename 是将要打包出的文件名称。[name]是占位符，就是entery的key
		// 要是没有设置filename那么打包出来的文件名称默认是main.js(前提是entery只打包一个js文件) 
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}