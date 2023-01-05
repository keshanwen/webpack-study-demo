const { merge } = require('webpack-merge');
const { baseConfig } = require('./webpack.common.js');
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

  target: 'web',

  devServer: {
    static: '../dist',
    hot: true,
    open: true,
    proxy: {
      "/api": {
        // 需要代理到的真实目标服务器，如/api/user会被代理到https://www.juejin.cn/api/user
        target: "https://www.juejin.cn",
        // 是否更改代理后请求的headers中host地址，某些安全级别较高的服务器会对此做校验
        changeOrigin: true,
        // 默认情况下不接受将请求转发到https的api服务器上，如果希望支持，可以设置为false
        secure: false,
        // 默认情况下/api也会写入到请求url中，通过这个配置可以将其删除,重写路径
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
  
  plugins: [
    new CopyWebpackPlugin({
      // from后的路径是相对于项目的根目录，to后的路径是相对于打包后的dist目录
      patterns: [{ from: "./public/lodash.min.js", to: "./public/lodash.min.js" }],
    }),
  ]
});