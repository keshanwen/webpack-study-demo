/*
    更强大的 tree shaking
    webpack4 本身的 tree shaking 比较简单，主要是找一个 import 进来的变量是否在这个模块内出现过，非常简单粗暴

    原理
        webpack从入口遍历所有模块的形成依赖图,webpack知道那些导出被使用
        遍历所有的作用域并将其进行分析，消除未使用的范围和模块的方法

    开发环境
    
    const path = require('path');

    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        mode: 'development',
        optimization: {
        usedExports: true,
        },
    };

    生产环境 
        "sideEffects": false,意思就是对所有的模块都进行Tree Shaking
        也就是将没有引入的方法等不进行打包到打包输出文件中

        {"sideEffects": ["@babel/polyfill"]}
        {"sideEffects": ["*.css"]}

        
*/
