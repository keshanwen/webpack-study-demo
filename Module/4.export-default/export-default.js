// 使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。
// 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

export default function () {
    console.log('foo')
}

/*
export default function foo() {
    console.log('foo');
  }
  
  // 或者写成
  
  function foo() {
    console.log('foo');
  }
  
  export default foo;

*/

/*

// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入

*/ 

/*

export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，
因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

*/ 

/*
本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';


*/ 

// 正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句
/*

// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;

*/ 

// 因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。
/*
// 正确
export default 42;

// 报错
export 42;

*/ 

/*
import _, { each, forEach } from 'lodash';

对应上面代码的export语句如下

export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };


*/ 