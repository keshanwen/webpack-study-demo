// ./src/main.js
/*
    Tree-shaking 实现的前提是 ES Modules，也就是说：最终交给 Webpack 打包的代码，必须是使用 ES Modules 的方式来组织的模块化。
*/

import { Button } from './components.js'

document.body.appendChild(Button())
