const path = require("path");

module.exports = {
    devtool: "none",
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "bundle")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: path.resolve(__dirname, 'loader/ReplaceLoader.js')
                }]
            }
        ]
    }
};