/*

    .mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，
    .js文件的加载取决于package.json里面type字段的设置。

    如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。

*/ 


import { a } from './lib.mjs'

console.log(a)