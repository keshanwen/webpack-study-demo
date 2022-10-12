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
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						// 如果在index.js中引入了index.css,在index.css中又引入了其他css文件。理论上
						// 那其他的css文件是不走'sass-loader' 'postcss-loader'的。
						// importLoaders: 2 的作用就是让其他的css文件走'sass-loader' 'postcss-loader' 
						importLoaders: 2,
						// 样式模块化 
						modules: true
					}
				},
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