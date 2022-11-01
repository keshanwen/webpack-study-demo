/*
    exports和module.exports可以负责对模块中的内容进行导出；
    require函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容

*/ 
// const { name, age, height } = require('./foo')

// console.log(name, age, height)

/*
    意味着bar变量等于exports对象；
    也就是通过require通过各种查找方式，最终找到了 exports 这个对象
    并且将 exports 对象赋值给了bar变量
    bar 变量就是exports对象了

*/ 
const bar = require('./baz.js')

require('./baz.js')
require('./baz.js')
require('./baz.js')
require('./baz.js')
require('./baz.js')
require('./baz.js')
require('./baz.js')
require('./baz.js')
require('./baz.js')

console.log(bar)