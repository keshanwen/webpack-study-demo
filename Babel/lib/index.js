"use strict";

require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
const babel = require("@babel/core");
let name = 24;
[0, 1, 2, 3].map(item => {
  return item + 'key';
});
Promise.resolve().finally();

// npx babel src --out-dir lib