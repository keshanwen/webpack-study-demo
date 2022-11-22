import path from "path";
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'


const config: webpack.Configuration  ={
    mode: 'development',

    entry: path.resolve(__dirname,'src/index.ts'),

    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[hash:8].js'
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname,'./src')
        },
        extensions: [".ts", ".vue", ".js", ".json"]
    },

    devServer: {
        port: '6789',
        hot: true,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.[jt]s$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')]
                            }
                        }
                    }
                ]
            }
        ],
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            title: 'webpack-vues-ts'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}


export default config