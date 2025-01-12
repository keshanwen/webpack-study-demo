const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
    vender: ["lodash"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  devServer: {
    hot: false,
  },
  module: {
    rules: [
      // {
      //   test: /\.js/,
      //   include: path.resolve(__dirname, "src"),
      //   use: [
      //     {
      //       loader: "thread-loader",
      //       options: {
      //         workers: 3,
      //       },
      //     },
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: ["@babel/preset-env", "@babel/preset-react"],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
  ],
};
