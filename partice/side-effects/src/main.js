import { Button } from './components'
import './extend.js'


/*
    对全局有影响的副作用代码不能移除，而只是对模块有影响的副作用代码就可以移除。
    
*/

document.body.appendChild(Button())

console.log((8).pad(3))