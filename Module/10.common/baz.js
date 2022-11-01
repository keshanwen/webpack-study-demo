/*

module.exports
但是Node中我们经常导出东西的时候，又是通过module.exports导出的：

module.exports和exports有什么关系或者区别呢？
我们追根溯源，通过维基百科中对CommonJS规范的解析：
CommonJS中是没有module.exports的概念的；
但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是
module；
所以在Node中真正用于导出的其实根本不是exports，而是module.exports；
因为module才是导出的真正实现者；
但是，为什么exports也可以导出呢？

这是因为module对象的exports属性是exports对象的一个引用；
也就是说 module.exports = exports；

*/ 

/*

原理：

node中的每一个文件都是一个模块，每个模块都有私有的module.export和exports变量和require函数

module.exports = {}
exports = module.exports

默认modules.exports和exports指向同一个引用地址，

但是实际上require(x)方法导出的时候，是找到匹配x的文件，导出当前文件中的modules.exports对象


function require(id) {
    return modules.exports;
}


*/ 
console.log(module.loaded)

const name = "why";
const age = 18;
const height = 1.88;

// 导出方式一
module.exports = {
    name,
    age,
    height
}

module.exports = {
    b: 'b'
}


exports.a = 'a'

/*
require 查找过程

情况一：X是一个Node核心模块，比如path、http

直接返回核心模块，并且停止查找


情况二：X是以 ./ 或 ../ 或 /（根目录）开头的

第一步：将X当做一个文件在对应的目录下查找；

1.如果有后缀名，按照后缀名的格式查找对应的文件
2.如果没有后缀名，会按照如下顺序：
1> 直接查找文件X
2> 查找X.js文件
3> 查找X.json文件
4> 查找X.node文件

第二步：没有找到对应的文件，将X作为一个目录

查找目录下面的index文件
1> 查找X/index.js文件
2> 查找X/index.json文件
3> 查找X/index.node文件
如果没有找到，那么报错：not found

情况三：直接是一个X（没有路径），并且X不是一个核心模块
/Users/coderwhy/Desktop/Node/TestCode/04_learn_node/05_javascript-module/02_commonjs/main.js中编写 require('why’)

会先在当前文件坐在目录下的node_modules目录下寻找，如果没有找到
在去上级目录下的node_modules目录下寻找，如果依然没找到
继续去上上级目录下的node_modules目录下寻找...
直至找到根目录，依然没有找到，则报错
如果上面的路径中都没有找到，那么报错：not found


*/ 


/*

模块的加载过程
结论一：模块在被第一次引入时，模块中的js代码会被运行一次
结论二：模块被多次引入时，会缓存，最终只加载（运行）一次

为什么只会加载运行一次呢？
这是因为每个模块对象module都有一个属性：loaded。
为false表示还没有加载，为true表示已经加载。

*/ 


/*
CommonJS规范缺点

CommonJS加载模块是同步的：

同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行；
这个在服务器不会有什么问题，因为服务器加载的js文件都是本地文件，加载速度非常快；
如果将它应用于浏览器呢？

浏览器加载js文件需要先从服务器将文件下载下来，之后再加载运行；
那么采用同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作；
所以在浏览器中，我们通常不使用CommonJS规范：

当然在webpack中使用CommonJS是另外一回事；
因为它会将我们的代码转成浏览器可以直接执行的代码；
在早期为了可以在浏览器中使用模块化，通常会采用AMD或CMD：

但是目前一方面现代的浏览器已经支持ES Modules，另一方面借助于webpack等工具可以实现对CommonJS或者ES Module代码的转换；
AMD和CMD已经使用非常少了，所以这里我们进行简单的演练；

*/ 