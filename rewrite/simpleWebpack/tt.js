
const NormalModuleFactory = require('./NormalModuleFactory');
const async = require('neo-async');
const { Tapable, SyncHook } = require("tapable");
const Parser = require('./Parser');
const parser = new Parser();
const path = require('path');
+const Chunk = require('./Chunk');
+const ejs = require('ejs');
+const fs = require('fs');
+const mainTemplate = fs.readFileSync(path.join(__dirname,'template', 'main.ejs'), 'utf8');
+const mainRender = ejs.compile(mainTemplate);
class Compilation extends Tapable {
    constructor(compiler) {
        super();
        this.compiler = compiler;
        this.options = compiler.options;
        this.context = compiler.context;
        this.inputFileSystem = compiler.inputFileSystem;
        this.outputFileSystem = compiler.outputFileSystem;
        this.entries = [];
        this.modules = [];
        this.chunks = [];
+       this.files = [];  //生成的文件
+       this.assets = {}; //资源 
        this.hooks = {
            succeedModule: new SyncHook(["module"]),
            seal: new SyncHook([]),
            beforeChunks: new SyncHook([]),
            afterChunks: new SyncHook(["chunks"])
        }
    }
    seal(callback) {
        this.hooks.seal.call();
        this.hooks.beforeChunks.call();//生成代码块之前
        for (const module of this.entries) {//循环入口模块
            const chunk = new Chunk(module);//创建代码块
            this.chunks.push(chunk);//把代码块添加到代码块数组中
            //把代码块的模块添加到代码块中
            chunk.modules = this.modules.filter(module => module.name == chunk.name);
        }
        this.hooks.afterChunks.call(this.chunks);//生成代码块之后
+       this.createChunkAssets();
        callback();//封装结束
    }
+    createChunkAssets() {
+        for (let i = 0; i < this.chunks.length; i++) {
+            const chunk = this.chunks[i];
+            chunk.files = [];
+            const file = chunk.name + '.js';
+            const source = mainRender({ entryId: chunk.entryModule.moduleId, modules: chunk.modules });
+            chunk.files.push(file);
+            this.emitAsset(file, source);
+        }
+    }
+    emitAsset(file, source) {
+        this.assets[file] = source;
+        this.files.push(file);
+    }
    //context ./src/index.js main callback(终级回调)
    addEntry(context, entry, name, finalCallback) {
        this._addModuleChain(context, entry, name, (err, module) => {
        finalCallback(err, module);
        });
    }
    _addModuleChain(context, rawRequest, name, callback) {
        this.createModule({
        name,context,rawRequest,parser,
        resource:path.posix.join(context,rawRequest),
        moduleId:'./'+path.posix.relative(context,path.posix.join(context,rawRequest))
        },entryModule=>this.entries.push(entryModule),callback);
    }
    /**
    * 创建并编译一个模块
    * @param {*} data 要编译的模块信息
    * @param {*} addEntry  可选的增加入口的方法 如果这个模块是入口模块,如果不是的话,就什么不做
    * @param {*} callback 编译完成后可以调用callback回调
    */
    createModule(data, addEntry, callback) {
        //通过模块工厂创建一个模块
        let module = normalModuleFactory.create(data);
        addEntry&&addEntry(module);//如果是入口模块,则添加入口里去
        this.modules.push(module);//给普通模块数组添加一个模块
        const afterBuild = (err, module) => {
        //如果大于0,说明有依赖
        if (module.dependencies.length > 0) {
            this.processModuleDependencies(module, err => {
            callback(err, module);
            });
        } else {
            callback(err, module);
        }
        }
        this.buildModule(module, afterBuild);
    }
    /**
    * 处理编译模块依赖
    * @param {*} module ./src/index.js
    * @param {*} callback 
    */
    processModuleDependencies(module, callback) {
        //1.获取当前模块的依赖模块
        let dependencies = module.dependencies;
        //遍历依赖模块,全部开始编译,当所有的依赖模块全部编译完成后才调用callback
        async.forEach(dependencies, (dependency, done) => {
        let { name, context, rawRequest, resource, moduleId } = dependency;
        this.createModule({
            name,context,rawRequest,parser,
            resource,moduleId
        },null,done);
        }, callback);
    }
    buildModule(module,afterBuild){
        module.build(this,(err)=>{
            this.hooks.succeedModule.call(module)
            afterBuild(null,module);
        });
    }
}
module.exports = Compilation;


const { Tapable, SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require("tapable");
const Compilation = require('./Compilation');
const NormalModuleFactory = require('./NormalModuleFactory');
const Stats = require('./Stats');
+const mkdirp = require('mkdirp');
+const path = require('path');
class Compiler extends Tapable {
    constructor(context) {
        super();
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
            afterCompile:new AsyncSeriesHook(["compilation"]),
+            emit: new AsyncSeriesHook(["compilation"]),
            done: new AsyncSeriesHook(["stats"])
        };
    }
+    emitAssets(compilation, callback) {
+        const emitFiles = (err)=>{
+              const assets = compilation.assets;
+              let outputPath = this.options.output.path;//dist
+              for(let file in assets){
+                let source = assets[file];//得到文件名和文件内容 
+                let targetPath = path.posix.join(outputPath,file);//得到输出的路径 targetPath
+                this.outputFileSystem.writeFileSync(targetPath,source,'utf8');//NodeEnvironmentPlugin
+              }
+            callback();
+        }
+        this.hooks.emit.callAsync(compilation, err => {
+            mkdirp(this.options.output.path, emitFiles);
+        });
+    }
    run(finalCallback) {
        //编译完成后的回调
        const onCompiled = (err, compilation) => {
+            this.emitAssets(compilation,err=>{
+                 let stats = new Stats(compilation);//stats是一 个用来描述打包后结果的对象
+                  this.hooks.done.callAsync(stats,err=>{//done表示整个流程结束了
+                  callback(err,stats);
+                  });
+            });
        };
        //准备运行编译
        this.hooks.beforeRun.callAsync(this, err => {
            //运行
            this.hooks.run.callAsync(this, err => {
                this.compile(onCompiled); //开始编译,编译完成后执行conCompiled回调
            });
        });
    }
    compile(onCompiled) {
        const params = this.newCompilationParams();
        this.hooks.beforeCompile.callAsync(params, err => {
            this.hooks.compile.call(params);
            const compilation = this.newCompilation(params);
            this.hooks.make.callAsync(compilation, err => {
                compilation.seal(err => {
                    this.hooks.afterCompile.callAsync(compilation, err => {
                        return onCompiled(null, compilation);
                    });
                });
            });
        });
    }
    newCompilationParams() {
        const params = {
            normalModuleFactory: new NormalModuleFactory()
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
7.3 main.ejs
webpack\main.ejs

(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      module.l = true;
      return module.exports;
    }
    return __webpack_require__("<%-entryModuleId%>");
  })
    ({
      <%
        for(let module of modules)
        {%>
            "<%-module.moduleId%>":
            (function (module, exports, __webpack_require__) {
              <%-module._source%>
            }),
        <%}
      %> 
    });