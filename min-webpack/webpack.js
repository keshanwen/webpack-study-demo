class Compiler {
  constructor() { }

  run(callback) { }
}


// 第一步： 搭建结构，读取配置参数， 这里接受的是 webpack.config.js 的参数
function webpack(webpackOptions) {
  const complier = new Compiler()

  return complier
}

exports.webpack = webpack