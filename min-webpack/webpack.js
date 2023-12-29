const { SyncHook } = require("tapable");
const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

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

  return complier
}

exports.webpack = webpack