const {
  Tapable,
  SyncHook,
  SyncBailHook,
  AsyncSeriesHook,
  AsyncParallelHook
} = require('tapable')

const NormalModuleFactory = require('./NormalModuleFactory')
const Compilation = require('./Compilation')

class Compiler extends Tapable {
  constructor(context) {
    super()
    this.context = context
    this.hooks = {
      done: new AsyncSeriesHook(["stats"]),
      entryOption: new SyncBailHook(["context", "entry"]),
      beforeRun: new AsyncSeriesHook(["compiler"]),
      run: new AsyncSeriesHook(["compiler"]),
      thisCompilation: new SyncHook(["compilation", "params"]),
      compilation: new SyncHook(["compilation", "params"]),
      beforeCompilation: new AsyncSeriesHook(["params"]),
      compile: new SyncHook(["params"]),
      make: new AsyncParallelHook(["compilation"]),
      afterCompile: new AsyncSeriesHook(["compilation"])
    }
  }
  run(callback) {
    console.log("run 方法执行了~~~~~~~~~~~~~~~~~~~~~")

    const finalCallback = function(err, stats) {
      callback(err, stats)
    }

    const onCompiled = function(err, compilation) {
      console.log('onCompiled~~~~~~~~~~~~~')

      finalCallback(err, {
        toJson() {
          return {
            entries: [],  // 当前次打包的入口信息
            chunks: [],  // 当前次打包的 chunk 信息
            modules: [],  // 模块信息
            assets: [], // 当前次打包最终生成的资源
          }
        }
      })
    }

    this.hooks.beforeRun.callAsync(this, (err) => {
      this.hooks.run.callAsync(this, (err) => {
        this.compile(onCompiled)
      })
    })
   
  }

  compile(callback) {
    const params = this.newCompilationParams()

    this.hooks.beforeRun.callAsync(params, (err) => {
      this.hooks.compile.call(params)
      const compilation = this.newCompilation(params)

      this.hooks.make.callAsync(compilation, (err) => {
        console.log('make钩子监听触发了~~~~~')
        callback()
      })
    })
  }

  newCompilationParams() {
    const params = {
      NormalModuleFactory: new NormalModuleFactory()
    }

    return params
  }

  newCompilation(params) {
    const compilation = this.createCompilation()
  }

  createCompilation() {
    return new Compilation(this)
  }
}

module.exports = Compiler
