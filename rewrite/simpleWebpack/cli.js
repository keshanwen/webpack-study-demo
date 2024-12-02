// const webpack = require('webpack')
const webpack = require("./webpack");
const webpackOptions = require('./webpack.config.js')

const compiler = webpack(webpackOptions)


compiler.run( (err, stats) => {
    console.log(err, 'err')
    console.log(
        stats.toJson({
            entries: true,
            chunks: true,
            modules: true,
            assets: true
        })
    )
})