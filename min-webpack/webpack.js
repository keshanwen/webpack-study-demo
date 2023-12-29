const { SyncHook } = require("tapable");
const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;


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

class Compilation {
  constructor(webpackOptions) {
    this.options = webpackOptions
    this.modules = {} // 本次编译所有生成出来的模块
    this.chunks = [] // 本次编译产出的所有代码块，入口模块和依赖的模块打包在一起为代码块
    this.assets = {} // 本次编译产出的资源文件
    this.fileDependencies = [] // 本次打包涉及到的文件， 这里主要是为了实现 watch 模式下监听文件的变化， 文件发生变化后会重新进行编译
  }

  build(callback) {
    // 第五步： 根据配置文件中的 entry 配置项找到所有的入口
    let entry = {}
    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }
    // 这里开始做编译工作， 编译成功执行callback
    callback()
  }
}

module.exports = {
  webpack,
  WebpackRunPlugin,
  WebpackDonePlugin
}