/*

    ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），
    那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。
    
*/ 


// import {bar} from './b.mjs';
// console.log('a.mjs');
// console.log(bar);
// export let foo = 'foo';

import {bar} from './b.mjs';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};