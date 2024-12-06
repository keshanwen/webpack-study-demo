const NormalModuleFactory = require('./NormalModuleFactory');
const { Tapable, SyncHook } = require("tapable");
const async = require('neo-async');
const Parser = require('./Parser');
const parser = new Parser();
const path = require('path');
let Chunk = require('./Chunk');

class Compilation {
    constructor(compiler) {
        this.compiler = compiler;
        this.options = compiler.options;
        this.context = compiler.context;
        this.inputFileSystem = compiler.inputFileSystem;
        this.outputFileSystem = compiler.outputFileSystem;
        this.entries = [];
        this.modules = [];
        this.chunks = [];
        this.hooks = {
            succeedModule: new SyncHook(["module"]),
            seal: new SyncHook([]),
            beforeChunks: new SyncHook([]),
            afterChunks: new SyncHook(["chunks"])
        }
    }
    seal(callback) {
        this.hooks.seal.call()
        this.hooks.beforeChunks.call(); // 生成代码块之前
        for (const module of this.entries) { // 循环入口模块
            const chunk = new Chunk(module) // 创建代码块
            this.chunks.push(chunk) // 把代码块添加到代码块数组中
            // 把代码块的模块添加到代码块中
            chunk.modules = this.modules.filter(module => module.name == chunk.name);
        }
    
        this.hooks.afterChunks.call(this.chunks);//生成代码块之后
        callback();//封装结束
    }
    //context ./src/index.js main callback(终级回调)
    addEntry(context, entry, name, callback) {
        this._addModuleChain(context, entry, name, (err, module) => {
            callback(err, module);
        });
    }
     //context ./src/index.js main callback(终级回调)
    _addModuleChain(context, entry, name, callback) {
       this.createModule({
            name, // 所属代码块的名称 main
            context: this.context, // 上下文
            rawRequest: entry, // ./src/index.js
            resource:path.posix.join(context,entry),//此模块entry的的绝对路径
            parser 
       },module => {
            this.entries.push(module)
       }, callback)
    }
    createModule(data, addEntry, callback) {
        // 先创建模块工厂
        const moduleFactory = new NormalModuleFactory()
        let module = moduleFactory.create(data)
        /*
            非常重要 模块的ID如何生成? 模块的ID是一个相当于根目录的相对路径
            index.js ./src/index.js   titlt.js  ./src/title.js
            relative 返回一个相对路径 从根目录到模块的绝对路径得到一个相对路径
        */ 
       module.moduleId = module.moduleId = '.' + path.posix.sep + path.posix.relative(this.context,module.resource);
       addEntry && addEntry(module)
       this.modules.push(module) // 把模块添加到完整的模块数组中 
       const afterBuild = (err, module) => {
         if (module.dependencies) { // 如果一个模块编译完成，发现它有依赖的模块，那么递归编译它的依赖模块
            this.processModuleDependencies(module, (err) => {
                // 当这个入口模块和它的依赖的模块都编译完成了，才会让调用入口模块的回调执行
                callback(err, module)
            })
         } else {
            callback(err, module)
         }
       }
       this.buildModule(module, afterBuild)
    }
    buildModule(module, afterBuild) {
        module.build(this, (err) => {
            this.hooks.succeedModule.call(module);
            return afterBuild(err, module);
        });
    }
    processModuleDependencies(module, callback) {
        let dependencies = module.dependencies
        // 因为我希望可以并行的同时开始编译依赖的模块， 然后等所有依赖的模块全部编译结束才结束
        async.forEach(dependencies, (dependency, done) => {
            let {name,context,rawRequest,resource,moduleId} = dependency;
            this.createModule({
                name,
                context,
                rawRequest,
                resource,
                moduleId,
                parser
            },null, done) 
        },callback)
    }
}



module.exports = Compilation;