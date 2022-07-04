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
					// name 文件名称  hash 哈希值 ext文件后缀 -------这些统称为占位符
					name: '[name]_[hash].[ext]',
					// 输出的文件路径
					outputPath: 'images/',
					// url-loader 与file-loader的区别 
					// url-loader多了一个limit项 要是打包的文件大于limit的值那么url-loader将文件打包在 outpath设置的文件中
					// 与file-loader一样的。要是打包的文件小于limit那么url-loader将文件打包在js文件中去，不会生成另外的一个文件夹
					limit: 10240
				}
			} 
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}