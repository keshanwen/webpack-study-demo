let module1 = require("./module1");
let module2 = require("./module2");
let $ = require("jquery");
console.log(module1, module2, $);
import(/* webpackChunkName: "asyncModule1" */ "./asyncModule1");
