const path = require('path');
const rollup = require('./lib/rollup');
//入口模块的绝对路径
let entry = path.resolve(__dirname, 'src/main.js');
debugger
rollup(entry, 'bundle.js');

