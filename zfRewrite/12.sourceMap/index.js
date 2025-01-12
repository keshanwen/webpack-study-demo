/*
    1. sourcemap
        1.1 什么是sourceMap
            sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术
            webpack通过配置可以自动给我们source maps文件，map文件是一种对应编译文件和源文件的方法

         1.2 配置项
            配置项其实只是五个关键字eval、source-map、cheap、module和inline的组合
            source-map	产生.map文件
            eval	使用eval包裹模块代码
            cheap	不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap
            module	包含loader的sourcemap（比如jsx to js ，babel的sourcemap）,否则无法定义源文件
            inline	将.map作为DataURI嵌入，不单独生成.map文件    

*/

/*
    1.2.1 source-map
    src\index.js

    let a=1;
    let b=2;
    let c=3;
    dist\main.js

    ({
        "./src/index.js":
        (function (module, exports) {
            let a = 1;
            let b = 2;
            let c = 3;
        })
    });
    //# sourceMappingURL=main.js.map
*/

/*
   1.2.2 eval
    用eval执行代码
        whyeval
        ({
            "./src/index.js":
            (function (module, exports) {
                eval("let a=1;\r\nlet b=2;\r\nlet c=3;\n\n//# sourceURL=webpack:///./src/index.js?");
            })
        });
    eval-source-map就会带上源码的sourceMap
        加了eval的配置生成的sourceMap会作为DataURI嵌入，不单独生成.map文件
        官方比较推荐开发场景下使用eval的构建模式，因为它能cache sourceMap,从而rebuild的速度会比较快
        ({
            "./src/index.js":
            (function (module, exports) {
                eval("let a=1;\r\nlet b=2;\r\nlet c=3;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,In0=\n//# sourceURL=webpack-internal:///./src/index.js\n");
            })
        });
*/

/*
    1.2.3 inline
    inline就是将map作为DataURI嵌入，不单独生成.map文件
    inline-source-map
    ({
        "./src/index.js":
        (function (module, exports) {
            let a = 1;
            let b = 2;
            let c = 3;
        })
    });
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIj


*/

/*
    1.2.4 cheap(低开销)
    cheap(低开销)的sourcemap，因为它没有生成列映射(column mapping),只是映射行数
    开发时我们有行映射也够用了,开发时可以使用cheap
    cheap-source-map

*/

/*
    1.2.5 module
    Webpack会利用loader将所有非js模块转化为webpack可处理的js模块,而增加上面的cheap配置后也不会有loader模块之间对应的sourceMap
    什么是模块之间的sourceMap呢？比如jsx文件会经历loader处理成js文件再混淆压缩， 如果没有loader之间的sourceMap，那么在debug的时候定义到上图中的压缩前的js处，而不能追踪到jsx中
    所以为了映射到loader处理前的代码，我们一般也会加上module配置
    cheap-module-source-map

*/

/*

    .4 最佳实践
        1.4.1 开发环境
        我们在开发环境对sourceMap的要求是：快（eval），信息全（module），
        且由于此时代码未压缩，我们并不那么在意代码列信息(cheap),
        所以开发环境比较推荐配置：devtool: cheap-module-eval-source-map
        1.4.2 生产环境
        一般情况下，我们并不希望任何人都可以在浏览器直接看到我们未编译的源码，
        所以我们不应该直接提供sourceMap给浏览器。但我们又需要sourceMap来定位我们的错误信息，
        这时我们可以设置hidden-source-map
        一方面webpack会生成sourcemap文件以提供给错误收集工具比如sentry，另一方面又不会为 bundle 添加引用注释，以避免浏览器使用。
*/
