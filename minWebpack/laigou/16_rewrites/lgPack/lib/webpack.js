const { WebpackOptionsApply } = require('webpack')
const Compiler = require('./Compiler')
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')

const webpack = function(options) {
  // 01 实例化 complier 对象
  let complier = new Compiler(options.context)
  complier.options = options

  // 02 初始化 NodeEnvironmentPlugin （让 complier 具有文件读写能力）
  new NodeEnvironmentPlugin().apply(complier)

  // 03 挂载所有 plugins 插件至 complier 对象上
  if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      plugin.apply(complier)
    }
  }

  // 04 挂载所有 webpack 内置的插件 （入口）
  // complier.options = new WebpackOptionsApply().process(options, complier); 

  // 05 返回 compiler 对象
  return complier
}

module.exports = webpack