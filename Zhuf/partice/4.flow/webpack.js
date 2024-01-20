const Compiler = require('./Compiler')

function webpack(options) {
  const argv = process.argv.slice(2) // ['--mode=development']
  const shellOptions = argv.reduce((shellOptions, option) => {
    let [key, value] = option.split('=')
    shellOptions[key.slice(2)] = value
    return shellOptions
  }, {})
  const finalOptions = { ...options, ...shellOptions }
  let compiler = new Compiler(finalOptions)
  finalOptions.plugins.forEach(plugin => plugin.apply(compiler))
  return compiler
}

module.exports = webpack