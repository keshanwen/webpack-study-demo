const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	// 不将loadsh库打包进打包后的文件中去。
	// 那你做的组件库要用到loadsh怎么办,在你用到你组件库的地方再引入loadsh
	externals: 'lodash',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'library.js',
		// 将library挂入到全局中
		library: 'root',
		// 为了其他人能够以import或者require的方式引入你的组件
		libraryTarget: 'umd'
	}
}