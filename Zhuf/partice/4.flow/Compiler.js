const { SyncHook } = require('tapable');
const Compilation = require('./Compilation');
const fs = require('fs');
const path = require('path').posix;

class Compiler {
  constructor(options) {
    this.options = options
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook(),
      compilation: new SyncHook(['compilation', 'params'])
    }
  }

  run(callback) {
    this.hooks.run.call()
    const onCompiled = (err, stats, fileDependencies) => {
      for (let filename in stats.assets) {
        let filePath = path.join(this.options.output.path, filename)
        fs.writeFileSync(filePath, stats.assets[filename], 'utf-8')
      }
      callback(null, {
        toJson: () => stats
      })
      fileDependencies.forEach(fileDependency => {
        fs.watch(fileDependency, () => this.compile(onCompiled))
      })
    }
    this.compile(onCompiled)
    this.hooks.done.call()
  }

  compile(onCompiled) {
    let compilation = new Compilation(this.options)
    this.hooks.compilation.call(compilation)
    compilation.build(onCompiled)
  }
}

module.exports = Compiler