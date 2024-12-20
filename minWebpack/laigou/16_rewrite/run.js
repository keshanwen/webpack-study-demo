let webpack = require('./lgPack')
let options = require('./webpack.config.js')


let compiler = webpack(options)

compiler.run( (err, stats) => {
    console.log(err)
    console.log(stats.toJson({
        entries: true,
        chunks: false,
        modules: false,
        assets: false
    }))
})