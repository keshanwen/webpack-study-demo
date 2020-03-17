const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
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
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		})
	],
	optimization: {
		// 代码分割
		splitChunks: {
			// 代码分割的条件 all 同步，异步都可以进行代码分割
			chunks: 'all',
			// 要是js文件大于minsize就会进行代码分割
			minSize: 30000,
			// 要是js文件数引用的次数大于minchunks就进行代码分割
			minChunks: 1,
			// 最多进行打包的文件数
      maxAsyncRequests: 5,
			maxInitialRequests: 3,
			// 自动在打包后的文件中间加上 '~'
      automaticNameDelimiter: '~',
			name: true,
			// 缓存组 （在走完chuanks后就走cacheGroups）
      cacheGroups: {
        vendors: {
					// 满足这个条件就会在打包分割后的Js代码的前面加上vendors的前缀
					test: /[\\/]node_modules[\\/]/,
					// 优先级 越大就先执行这个（和下面的default对比）
					priority: -10,
					// 要是不想在分割后的代码前面加上vendors前缀，那么设置filename就可以了
          // filename: 'vendors.js',
				},
				// 在不满足vendors后就会走default
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}