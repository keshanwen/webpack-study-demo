const path = require('path');

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
		},{
			test: /\.scss$/,
			// 处理css时的顺序是，先使用postcss-loader（会找到postccss.config.js可以在里面配置一些选项）
			// sass-loader处理sass文件转换为css文件，在是css-loader处理css文件
			// 最后style-loader将css文件挂载成style上
			// postss-loader  -----  sass-loader -------  css-loader -----   style-loader
			use: [
				'style-loader', 
				'css-loader', 
				'sass-loader',
				'postcss-loader'
			]
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}