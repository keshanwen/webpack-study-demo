const {
  Tapable,
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require("tapable");
const Compilation = require("./Compilation");
const NormalModuleFactory = require("./NormalModuleFactory");
const Stats = require("./Stats");
const { mkdirp } = require("mkdirp");
const path = require("path");

/*
    代表整个编译对象，负责整个编译的过程，里面会保存所有的编译信息
    Compiler 类的实例全局唯一
*/
class Compiler {
  constructor(context) {
    this.options = {};
    this.context = context; //设置上下文路径
    this.hooks = {
      entryOption: new SyncBailHook(["context", "entry"]),
      beforeRun: new AsyncSeriesHook(["compiler"]),
      run: new AsyncSeriesHook(["compiler"]),
      beforeCompile: new AsyncSeriesHook(["params"]),
      compile: new SyncHook(["params"]),
      make: new AsyncParallelHook(["compilation"]),
      thisCompilation: new SyncHook(["compilation", "params"]),
      compilation: new SyncHook(["compilation", "params"]),
      afterCompile: new AsyncSeriesHook(["compilation"]),
      emit: new AsyncSeriesHook(["compilation"]),
      done: new AsyncSeriesHook(["stats"]),
    };
  }
  emitAssets(compilation, callback) {
    const emitFiles = (err) => {
      const assets = compilation.assets;
      let outputPath = this.options.output.path; //dist
      for (let file in assets) {
        let source = assets[file]; //得到文件名和文件内容
        let targetPath = path.posix.join(outputPath, file); //得到输出的路径 targetPath
        this.outputFileSystem.writeFileSync(targetPath, source, "utf8"); //NodeEnvironmentPlugin
      }
      callback();
    };
    this.hooks.emit.callAsync(compilation, (err) => {
      mkdirp(this.options.output.path).then(() => {
        emitFiles(err);
      });
      // mkdirp(this.options.output.path, emitFiles);
    });
  }
  run(finalCallback) {
    //编译完成后的回调
    const onCompiled = (err, compilation) => {
      this.emitAssets(compilation, (err) => {
        let stats = new Stats(compilation); //stats是一 个用来描述打包后结果的对象
        this.hooks.done.callAsync(stats, (err) => {
          //done表示整个流程结束了
          finalCallback(err, stats);
        });
      });
    };
    //准备运行编译
    this.hooks.beforeRun.callAsync(this, (err) => {
      //运行
      this.hooks.run.callAsync(this, (err) => {
        this.compile(onCompiled); //开始编译,编译完成后执行conCompiled回调
      });
    });
  }

  compile(onCompiled) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, (err) => {
      this.hooks.compile.call(params);
      const compilation = this.newCompilation(params);
      this.hooks.make.callAsync(compilation, (err) => {
        compilation.seal((err) => {
          this.hooks.afterCompile.callAsync(compilation, (err) => {
            return onCompiled(null, compilation);
          });
        });
      });
    });
  }
  newCompilationParams() {
    const params = {
      normalModuleFactory: new NormalModuleFactory(),
    };
    return params;
  }
  newCompilation(params) {
    const compilation = new Compilation(this);
    this.hooks.thisCompilation.call(compilation, params);
    this.hooks.compilation.call(compilation, params);
    return compilation;
  }
}

module.exports = Compiler;
