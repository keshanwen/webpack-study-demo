const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },

  cache: {
    type: "filesystem", //  'memory' | 'filesystem'
    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), // 默认将缓存存储在 node_modules/.cache/webpack
  },
  // watch: true, // 启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
};
