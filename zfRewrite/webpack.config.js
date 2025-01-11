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
  },

  devServer: {
    static: path.resolve(__dirname, "public"),
    port: 8080,
    open: true,
  },
};
