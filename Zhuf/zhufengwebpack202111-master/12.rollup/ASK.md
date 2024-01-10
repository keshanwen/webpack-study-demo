- amd/es6/iife/umd/cjs



 {"modules":false}
 模块的关键字 import export不要让babel进行转译，而是交给rollup进行处理

 

import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

rollup-plugin-babel 这是社区的
@rollup/plugin-commonjs 只有rollup官方才能发布


生成代码有两种思路

var a =1;
var b =2;
var c =3;
console.log(a,b);

1思路 
改变语法树
删除 var c =3;
重新生成源代码

2.思路 rollup
语法不动
要哪个取出来，拼在一起输出
var a =1;
var b =2;
console.log(a,b);


下来我们学习
scope hosting
tree shaking


经过tree shaking之后
1. export var age = 13; 未使用到的导出语句消失 了
2. import语句也消失 了
3. 用到的导出变量 export var name = 'zhufeng';里的export 也消失了


执行过程
1.expandStatement `console.log(age);`
depends=['age']
2.去msg模块中找定义age变量的语句
`var age = 13;`
在此处，result = ['var age = 13;']


解析main的时候，先展开console.log(age), 
main A阶段
---展开msg.js中的age
然后去msg。js,取到age，
age需要展开，
msg的A阶段为空 
msg的B阶段
展开的时候先把自己的语句添加结果里放入result, var age =13;
msg的C阶段
然后把age的修改操作放入result，
---结束展开msg.js中的age

main的B阶段
最后把console.log放入result,
main的C阶段没有
main。js没有age的修改操作，所以没有c阶段， 

//块里面的var变量会提供到全局
//块里面的let 和 const变量不会提供到全局