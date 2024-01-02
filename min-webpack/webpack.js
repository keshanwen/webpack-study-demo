const { SyncHook } = require("tapable");
const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

//获取文件路径
 function tryExtensions(modulePath, extensions) {
   if (fs.existsSync(modulePath)) {
     return modulePath;
   }
   for (let i = 0; i < extensions?.length; i++) {
     let filePath = modulePath + extensions[i];
     if (fs.existsSync(filePath)) {
       return filePath;
     }
   }
   throw new Error(`无法找到${modulePath}`);
 }

// Webpack Plugin 其实就是一个普通的函数， 在改函数中需要我们定制一个 apply 方法
class WebpackRunPlugin {
  apply(complier) {
    complier.hooks.run.tap("WebpackRunPlugin", () => {
      console.log('开始编译')
    })
  }
}

class WebpackDonePlugin {
  apply(complier) {
    complier.hooks.done.tap("WebpackDonePlugin", () => {
      console.log('结束编译')
    })
  }
}

const loader1 = (source) => {
  return source + "//给你的代码加点注释：loader1";
};

const loader2 = (source) => {
  return source + "//给你的代码加点注释：loader2";
};


// Complier 其实是一个类， 它是编译过程的大管家， 而且是单例模式
class Compiler {
  constructor(webpackOptions) {
    this.options = webpackOptions // 存储配置信息
    // 它内部提供了很多钩子
    this.hooks = {
      run: new SyncHook(), // 会在编译开始的时候触发此 run 钩子
      done: new SyncHook() // 会在编译结束的时候触发此 done 钩子
    }

  }

  complie(callback) {
    /*
      虽然 webpack 只有一个 Complier， 但是它每次编译会产生一个新的 Compilation，这里主要是为了考虑到watch 模式， 它会在启动时先编译一次， 然后监听文件变化， 如果发生变化会重新开始编译。每次编译会产生一个新的Compliation 代表每次的编译结果
    */
    let compilation = new Compilation(this.options)
    compilation.build(callback) // 执行compilation的build 方法进行编译， 编译成功之后执行回调
  }

  // 第四步： 执行 Complier 对象的run方法开始执行编译
  run(callback) {
    this.hooks.run.call() // 在编译前触发 run 钩子执行，表示开始启动编译了
    const onCompiled = () => {
      this.hooks.done.call() // 当编译成功后触发 done 这个钩子执行
    }
    this.complie(onCompiled) // 开始编译，成功之后调用 onCompiled
  }
}


// 第一步： 搭建结构，读取配置参数， 这里接受的是 webpack.config.js 的参数
function webpack(webpackOptions) {
  // 第二步： 用配置参数对象 初始化 Complier 对象
  const complier = new Compiler(webpackOptions)
  // 第三步：挂载配置文件中的插件
  const { plugins } = webpackOptions
  for (let plugin of plugins) {
    plugin.apply(complier)
  }

  return complier
}

//将\替换成/
function toUnixPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

const baseDir = toUnixPath(process.cwd()); //获取工作目录，在哪里执行命令就获取哪里的目录，这里获取的也是跟操作系统有关系，要替换成/

class Compilation {
  constructor(webpackOptions) {
    this.options = webpackOptions
    this.modules = [] // 本次编译所有生成出来的模块
    this.chunks = [] // 本次编译产出的所有代码块，入口模块和依赖的模块打包在一起为代码块
    this.assets = {} // 本次编译产出的资源文件
    this.fileDependencies = [] // 本次打包涉及到的文件， 这里主要是为了实现 watch 模式下监听文件的变化， 文件发生变化后会重新进行编译
  }

  // 当编译模块的时候， name: 这个模块是属于哪个代码块 chunk的， modulePath 模块的绝对路径
  buildModule(name, modulePath) {
    // 6.2.1 读取模块内容， 获取源代码
    let sourceCode = fs.readFileSync(modulePath, 'utf-8')
    // buildModule 最终会返回一个 modules 模块对象， 每个模块都会有一个 id, id 是相对于根目录的相对路径
    let moduleId = "./" + path.posix.relative(baseDir, modulePath); //模块id:从根目录出发，找到与该模块的相对路径（./src/index.js）
    // 6.2.2 创建模块对象
    let module = {
      id: moduleId,
      names: [name], // names 设计成数组是因为代表的是此模块属于哪个代码块， 可能属于多个代码块
      dependencies: [], // 它依赖的模块
      _source: '', // 该模块的代码信息
    }

    // 6.2.3 找到对应的 loader 对源码进行翻译和替换
    let loaders = []
    let { rules = [] } = this.options.module
    rules.forEach((rule) => {
      let { test } = rule
      // 如果模块路径和正则匹配，就把此规则对应的 loader 添加到loaders 数组中
      if (modulePath.match(test)) {
        loaders.push(...rule.use)
      }
    })

    // 自右向左对模块进行编译
    sourceCode = loaders.reduceRight((code, loader) => {
      return loader(code)
    }, sourceCode)
    console.log(sourceCode)

    //通过loader翻译后的内容一定得是js内容，因为最后得走我们babel-parse，只有js才能成编译AST
    //第七步：找出此模块所依赖的模块，再对依赖模块进行编译
    //7.1：先把源代码编译成 [AST](https://astexplorer.net/)
    let ast = parser.parse(sourceCode, { sourceType: "module" });
    traverse(ast, {
       CallExpression: (nodePath) => {
         const { node } = nodePath;
         //7.2：在 `AST` 中查找 `require` 语句，找出依赖的模块名称和绝对路径
         if (node.callee.name === "require") {
           let depModuleName = node.arguments[0].value; //获取依赖的模块
           let dirname = path.posix.dirname(modulePath); //获取当前正在编译的模所在的目录
           let depModulePath = path.posix.join(dirname, depModuleName); //获取依赖模块的绝对路径
           let extensions = this.options.resolve?.extensions || [ ".js" ]; //获取配置中的extensions
           depModulePath = tryExtensions(depModulePath, extensions); //尝试添加后缀，找到一个真实在硬盘上存在的文件
           //7.3：将依赖模块的绝对路径 push 到 `this.fileDependencies` 中
           this.fileDependencies.push(depModulePath);
           //7.4：生成依赖模块的`模块 id`
           let depModuleId = "./" + path.posix.relative(baseDir, depModulePath);
          //7.5：修改语法结构，把依赖的模块改为依赖`模块 id` require("./name")=>require("./src/name.js")
           node.arguments = [types.stringLiteral(depModuleId)];
           //7.6：将依赖模块的信息 push 到该模块的 `dependencies` 属性中
           module.dependencies.push({ depModuleId, depModulePath });
         }
       },
    });

    //7.7：生成新代码，并把转译后的源代码放到 `module._source` 属性上
    let { code } = generator(ast);
    module._source = code;
    //7.8：对依赖模块进行编译（对 `module 对象`中的 `dependencies` 进行递归执行 `buildModule` ）
    module.dependencies.forEach(({ depModuleId, depModulePath }) => {
       //考虑到多入口打包 ：一个模块被多个其他模块引用，不需要重复打包
       let existModule = this.modules.find((item) => item.id === depModuleId);
       //如果modules里已经存在这个将要编译的依赖模块了，那么就不需要编译了，直接把此代码块的名称添加到对应模块的names字段里就可以
       if (existModule) {
         //names指的是它属于哪个代码块chunk+
         existModule.names.push(name);
      } else {
         //7.9：对依赖模块编译完成后得到依赖模块的 `module 对象`，push 到 `this.modules` 中
         let depModule = this.buildModule(name, depModulePath);
         this.modules.push(depModule);
       }
    });
     //7.10：等依赖模块全部编译完成后，返回入口模块的 `module` 对象
     return module;
  }

  build(callback) {
    // 第五步： 根据配置文件中的 entry 配置项找到所有的入口
    let entry = {}
    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }

    // 第六步： 从入口文件出发， 调用配置的 loader 规则， 对各模块进行编译
    for (let entryName in entry) {
      // entryName="main" entryName就是entry 的属性名， 也会将成为代码块的名称
      let entryFilePath = path.posix.join(baseDir, entry[entryName])
      // 6.1 把入口文件的绝对路径添加到依赖数组 （this.fileDependencies）中， 记录此次编译依赖的模块
      this.fileDependencies.push(entryFilePath)

      // 6.2 得到入口模块的 module 对象 （里面放着该模块的路径， 依赖模块， 源代码等）
      let entryModule = this.buildModule(entryName, entryFilePath)


      // 6. 3 将生成的入口文件 module 对象 push 进 this.modules 中
      this.modules.push(entryModule)
    }

    // 这里开始做编译工作， 编译成功执行callback
    callback()
  }
}

module.exports = {
  webpack,
  WebpackRunPlugin,
  WebpackDonePlugin,
  loader1,
  loader2
}