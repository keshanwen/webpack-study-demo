/*
    缓存生成的webpack模块和chunk,来改善构建速度
    cache 会在开发模式被设置成 type: 'memory' 而且在 生产 模式 中被禁用
    在webpack5中默认开启，缓存默认是在内存里,但可以对cache进行设置
    当设置cache.type: "filesystem"的时候,webpack会在内部启用文件缓存和内存缓存，写入的时候会同时写入内存和文件，读取缓存的时候会先读内存，如果内存里没有才会读取文件
    每个缓存最大资源占用不超过500MB,当逼近或超过500MB时，会优先删除最老的缓存，并且缓存的有效期最长为2周
    FileMiddleware.js
    PackFileCacheStrategy.js:1036
    FileSystemInfo.js:1691
    默认情况下，webpack 假定 webpack 所在的 node_modules 目录只被包管理器修改。对 node_modules 来说，哈希值和时间戳会被跳过


*/
const path = require("path");
module.exports = {
  mode: "development",
  cache: {
    type: "filesystem", //  'memory' | 'filesystem'
    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), // 默认将缓存存储在 node_modules/.cache/webpack
  },
  watch: true,
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
