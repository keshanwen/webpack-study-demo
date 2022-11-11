const path = require("path");
const CleanWebpackPlugin = require('./plugin/clean-webpack-plugin.js');

module.exports = {
    devtool: "none",
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "bundle")
    },
    plugins: [
        new CleanWebpackPlugin({
            name: "lnj"
        })
    ]
};