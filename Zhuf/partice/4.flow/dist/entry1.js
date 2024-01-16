
   (() => {
    var modules = {
      
        "./src/a.js": (module) => {
          module.exports = 'i am a'; //logger2//logger1
        },
      ,
        "./src/title.js": (module) => {
          const a = require("./src/a.js");
console.log(a, 'title a');
module.exports = 'title'; //logger2//logger1
        },
      ,
        "./src/title2.js": (module) => {
          const a = require("./src/a.js");
console.log(a, 'title2 a');
module.exports = 'i am title'; //logger2//logger1
        },
      
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
    let title = require("./src/title.js");
let title2 = require("./src/title2.js");
console.log(title, 'entry1');
console.log(title2, 'entry1 title2');
console.log('hello wrold'); //logger2//logger1
  })();
   