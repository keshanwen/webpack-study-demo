const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: [
				// 对css文件进行打包，应该在生产环境中，因为在开发环境会影响调试
				MiniCssExtractPlugin.loader, 
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
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		// 对css文件进行压缩
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// 对于走enter中的主文件时
			filename: '[name].css',
			// 对于间接引入的css文件时走的
			chunkFilename: '[name].chunk.css'
		})
	]
}

module.exports = merge(commonConfig, prodConfig);