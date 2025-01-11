const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const bootstrap = path.resolve(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css')

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    // publicPath: "https://www.baidu.com/", //表示的是打包生成的index.html文件里面引用资源的前缀
  },

  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.png$/,
        type: "asset/resource",
      },
      {
        test: /\.ico$/,
        type: "asset/inline",
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.jpg$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],

  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      // bootstrap
    },
    modules: [path.resolve(__dirname, "node_modules")], // 如果可以确定项目内所有的第三方依赖模块都是在项目根目录下的 node_modules 中的话
    // 对于直接声明依赖名的模块（如 react ），webpack 会类似 Node.js 一样进行路径搜索，搜索node_modules目录。会不断的往上找，直到找到 node_modules
  },

  devServer: {
    static: path.resolve(__dirname, "public"),
    port: 8080,
    open: true,
  },
};
