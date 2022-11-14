let webpack = require('webpack')
let options = require('./webpack.config.js')

let complier = webpack(options)

complier.run(function (err, stats) {
  console.log(err)
  console.log(stats.toJson())
})
