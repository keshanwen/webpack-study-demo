const path = require("path");

module.exports = {
    devtool: "none",
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "js/index.js",
        path: path.resolve(__dirname, "bundle")
    }
};