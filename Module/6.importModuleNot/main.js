/*

    CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
    CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

*/ 

/*
var mod = require('./lib')

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
*/

/*

lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。
这是因为mod.counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

*/ 

/*
    import { counter, incCounter } from './lib.js';
    console.log(counter); // 3
    incCounter();
    console.log(counter); // 4
*/
import './x.js';
import './y.js';