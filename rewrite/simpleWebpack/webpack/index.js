const NodeEnvironmentPlugin = require("./plugins/NodeEnvironmentPlugin");
const Compiler = require("./Compiler");
const path = require('path')

function webpack(options) {
    options.context = options.context || path.resolve(process.cwd())
    // 创建 compiler
    let compiler = new Compiler(options.context)
    // 给 compiler 指定 options
    compiler.options = Object.assign(compiler.options, options)
    // 插件设置读写文件的 API
    new NodeEnvironmentPlugin().apply(compiler)
    // 调用配置文件里配置的插件并依次调用
    if (options.plugins && Array.isArray(options.plugins)) {
        for (const plugin of options.plugins) {
            plugin.apply(compiler)
        }
    }

    return compiler
}

module.exports = webpack