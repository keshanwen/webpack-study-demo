/*
    1. 代码分割
        对于大的Web应用来讲，将所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被用到。
        webpack有一个功能就是将你的代码库分割成chunks语块，当代码运行到需要它们的时候再进行加载
    2. 入口点分割
        Entry Points：入口文件设置的时候可以配置
            这种方法的问题
            如果入口 chunks 之间包含重复的模块(lodash)，那些重复模块都会被引入到各个 bundle 中
            不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码
        {
            entry: {
                page1: "./src/page1.js",
                page2: "./src/page2.js"
            }
        }
    3 动态导入和懒加载
        用户当前需要用什么功能就只加载这个功能对应的代码，也就是所谓的按需加载 在给单页应用做按需加载优化时
        一般采用以下原则：
            对网站功能进行划分，每一类一个chunk
            对于首次打开页面需要的功能直接加载，尽快展示给用户,某些依赖大量代码的功能点可以按需加载
            被分割出去的代码需要一个按需加载的时机      
            
       prefetch(预先拉取)
         prefetch 跟 preload 不同，它的作用是告诉浏览器未来可能会使用到的某个资源，浏览器就会在闲时去加载对应的资源，
         若能预测到用户的行为，比如懒加载，点击到其它页面等则相当于提前预加载了需要的资源    
         
      
      preload(预先加载)
        preload通常用于本页面要用到的关键资源，包括关键js、字体、css文件
        preload将会把资源得下载顺序权重提高，使得关键数据提前下载好,优化页面打开速度
        在资源上添加预先加载的注释，你指明该模块需要立即被使用
        一个资源的加载的优先级被分为五个级别,分别是
        Highest 最高
        High 高
        Medium 中等
        Low 低
        Lowest 最低
        异步/延迟/插入的脚本（无论在什么位置）在网络优先级中是 Low   

    preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源
    而 prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源
    所以建议：对于当前页面很有必要的资源使用 preload,对于可能在将来的页面中使用的资源使用 prefetch    
*/

button.addEventListener("click", () => {
  import(
    `./utils.js`
    /* webpackPrefetch: true */
    /* webpackChunkName: "utils" */
  ).then((result) => {
    result.default.log("hello");
  });
});

import(
  `./video.js`
  /* webpackPreload: true */
  /* webpackChunkName: "video" */
);

/*
4.提取公共代码
    怎么配置单页应用?怎么配置多页应用?

    4.1 为什么需要提取公共代码
        大网站有多个页面，每个页面由于采用相同技术栈和样式代码，会包含很多公共代码，如果都包含进来会有问题
        相同的资源被重复的加载，浪费用户的流量和服务器的成本；
        每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验。
        如果能把公共代码抽离成单独文件进行加载能进行优化，可以减少网络传输流量，降低服务器成本

    4.2 如何提取
        基础类库，方便长期缓存
        页面之间的公用代码
        各个页面单独生成文件    
     
    4.3 module chunk bundle
        module：就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码
        chunk: chunk是webpack根据功能拆分出来的，包含三种情况
            你的项目入口（entry）
            通过import()动态引入的代码
            通过splitChunks拆分出来的代码    
        bundle：bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。

    4.4 splitChunks
        将optimization.runtimeChunk设置为 true 或 'multiple'，会为每个入口添加一个只含有 runtime 的额外 chunk
        
        4.4.1 工作流程
            SplitChunksPlugi先尝试把minChunks规则的模块抽取到单独的Chunk中
            判断该Chunk是否满足maxInitialRequests配置项的要求
            判断体积是否满足minSize的大小，如果小于minSize则不分包，如果大于minSize判断是否超过maxSize,如果大于maxSize则继续拆分成更小的包
        4.4.1 webpack.config.js
            请求数是指加载一个Chunk时所需要加载的所有的分包数量,包括Initial Chunk，但不包括Async Chunk和runtimeChunk
            maxInitialRequest用于设置 Initial Chunk 最大并行请求数
            maxAsyncRequests用于设置 Async Chunk 最大并行请求数   

        打包后的结果
            //入口代码块
            page1.js
            page2.js
            page3.js
            //异步加载代码块
            src_asyncModule1_js.js
            //defaultVendors缓存组对应的代码块
            defaultVendors-node_modules_jquery_dist_jquery_js.js
            defaultVendors-node_modules_lodash_lodash_js.js
            //default代缓存组对应的代码块
            default-src_module1_js.js
            default-src_module2_js.js
*/

let page1Chunk = {
  name: "page1",
  modules: ["A", "B", "C", "lodash"],
};

let page2Chunk = {
  name: "page2",
  module: ["C", "D", "E", "lodash"],
};

let cacheGroups = {
  vendor: {
    test: /lodash/,
  },
  default: {
    minChunks: 2,
  },
};

let vendorChunk = {
  name: `vendor~node_modules_lodash_js`,
  modules: ["lodash"],
};
let defaultChunk = {
  name: `default~page1~page2`,
  modules: ["C"],
};
