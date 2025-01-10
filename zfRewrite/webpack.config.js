const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*  

    --mode用来设置模块内的process.env.NODE_ENV
        会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 mode 对应的值   
        可以在任意模块内通过 process.env.NODE_ENV 获取当前的环境变量
        但无法在node环境(webpack 配置文件中)下获取当前的环境变量

    cross-env用来设置node环境的process.env.NODE_ENV

    DefinePlugin用来设置模块内的全局变量
*/

console.log("NODE_ENV", process.env.NODE_ENV); // 在配置文件中获取不到环境变量

module.exports = {
  // mode: "development",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    // publicPath: "https://www.baidu.com/", //表示的是打包生成的index.html文件里面引用资源的前缀
  },

  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    // }),
  ],

  devServer: {
    static: path.resolve(__dirname, "public"),
    port: 8080,
    open: true,
  },
};
