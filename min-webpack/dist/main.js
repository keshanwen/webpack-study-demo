
    (() => {
     var modules = {
       
         "./src/name.js": (module) => {
           module.exports = "不要秃头啊";
//给你的代码加点注释：loader2//给你的代码加点注释：loader1
         }
       ,
         "./src/age.js": (module) => {
           module.exports = "99";
//给你的代码加点注释：loader2//给你的代码加点注释：loader1
         }
       ,
         "./src/index.js": (module) => {
           const name = require("./src/name.js");
const age = require("./src/age.js");
console.log("entry文件打印作者信息", name, age);
console.log('hello wrold i am kebi');
//给你的代码加点注释：loader2//给你的代码加点注释：loader1
         }
       
     };
     var cache = {};
     function require(moduleId) {
       var cachedModule = cache[moduleId];
       if (cachedModule !== undefined) {
         return cachedModule.exports;
       }
       var module = (cache[moduleId] = {
         exports: {},
       });
       modules[moduleId](module, module.exports, require);
       return module.exports;
     }
     var exports ={};
     const name = require("./src/name.js");
const age = require("./src/age.js");
console.log("entry文件打印作者信息", name, age);
console.log('hello wrold i am kebi');
//给你的代码加点注释：loader2//给你的代码加点注释：loader1
   })();
    