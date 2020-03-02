const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	entry: {
		main: './src/index.js'
	},
	// webpack-dev-server
	devServer: {
		// 发在服务器上的内容
		// 你可能会好奇，咦,npm run start后打包的dist文件怎么不见了。
		// 不要担心它只是发在了，电脑的内存中去了，没有显示在文件中而已。
		contentBase: './dist',
		// 是否一开始自动打开一个页面
		open: true,
		// 服务的端口号
		port: 8080
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