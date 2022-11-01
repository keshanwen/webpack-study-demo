const fs = require('fs')
 
/*
 var exports = {}  // 准备一个空对象用来保存a.js导出的变量
 eval(fs.readFileSync('./a.js').toString())(exports)
 */




/*
 function myRequire(modulePath){
    var exports = {}
    eval(fs.readFileSync(modulePath).toString())(exports)
    return exports
  }
  

let txt = myRequire('./a.js')


console.log(txt)
*/


/*
    var cahches = {}  // 保存加载过的模块
    function myRequire(modulePath){
    if(cahches[modulePath]) return cahches[modulePath]
    var modules = {
        path: modulePath,  // 模块路径
        exports: {},  // 保存模块导出的变量
    }
    cahches[modulePath] = module
    eval(fs.readFileSync(modulePath).toString())(modules.exports)
    
    return modules.exports
    }

    let txt = myRequire('./a.js')
    myRequire('./a.js')
    myRequire('./a.js')
    myRequire('./a.js')
*/

var cache = {}
function mRequire(modulePath){
  if(cache[modulePath]) return cache[modulePath]
  var module = {
    path: modulePath,
    exports: {},
  }
  cache[modulePath] = module
  /*----- 把module也传给a.js -----*/
  eval(fs.readFileSync(modulePath).toString())(module,module.exports)

  return module.exports
}

const txt = mRequire('./a.js')


console.log(txt)


 
