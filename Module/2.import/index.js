import { a, b, c, obj, fn1 } from './profile.js'
import { b as renameB } from './profile'

// import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
// 但是如果引入的是一个对象，那么修改起属性值是可以的。因为对象类型是地址引用。但是不建议修改其值。这样不好定位值得来源

// console.log(a)

// 报错
// a = 'i a, change a' 

// console.log(a)


console.log(obj, '111')

obj.name = 'i am editor name'

console.log(obj, '2222')