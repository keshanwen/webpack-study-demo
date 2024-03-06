const MagicString = require("magic-string");
const ms = new MagicString("var age = 10");
ms.overwrite(10, 12, "11");
console.log(ms.toString());
