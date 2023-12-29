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

  run(callback) { }
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

module.exports = {
  webpack,
  WebpackRunPlugin,
  WebpackDonePlugin
}