// a.js
// 运行这个脚本，将执行下面这个匿名函数，这个函数会返回一个函数moduleFn
// module函数接收一个object对象，把a.js要导出的变量放在这个对象里面
(
    function(){
        console.log('a.js run~~~~')
      return function moduleFn(modules, exportss){
        // object.name = "I am a.js"
        // modules.exportss = () => {}
        exportss.name = 'kebi'
      }
    }
  )()

 
  