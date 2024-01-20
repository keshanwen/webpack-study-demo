
const MagicString = require('magic-string');
const { parse } = require('es-module-lexer');
let str = `import { createApp } from 'vue';import { createApp } from 'react';`;

; (async function () {
    let magicString = new MagicString(str);
    let imports = await parse(str);
    if (imports && imports.length > 0 && imports[0] && imports[0].length) {
        for (let i = 0; i < imports[0].length; i++) {
            const { n, s, e } = imports[0][i];
            magicString.overwrite(s, e, `xxx`);
            console.log(magicString.toString());
        }
    }

})();