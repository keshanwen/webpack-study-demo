const path = require('path');

module.exports = {
	mode: 'development', // 打包模式
	entry: {
		main: './src/index.js' // 人口文件
	},
	module: {
		rules: [{
			test: /\.jpg$/, // 遇到jpg结尾的文件时
			use: {
				loader: 'file-loader' // 使用file-loader去处理.jpg结尾的文件
			} 
		}]
	},
	output: {
		filename: 'bundle.js', // 输出的文件名称
		path: path.resolve(__dirname, 'dist') // 输出文件的路径
	}
}