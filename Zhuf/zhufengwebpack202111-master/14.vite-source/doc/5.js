const dedent = require('dedent');
let appVue = `
<template>
 <h1>App</h1>
</template>
<script>
export default {
    name:'App'
}
</script>
`;

const defaultExportRegexp = /export default/;
const { parse, compileTemplate } = require('@vue/compiler-sfc');
let { descriptor } = parse(appVue);
let targetCode = '';
if (descriptor.script) {
    let scriptContent = descriptor.script.content;
    scriptContent = scriptContent.replace(defaultExportRegexp, 'const _sfc_main =');
    targetCode += scriptContent;
}
if (descriptor.template) {
    let templateContent = descriptor.template.content;
    let { code } = compileTemplate({ source: templateContent });
    targetCode += code;
}
targetCode += `_sfc_main.render = render;\n`;
targetCode += `export default _sfc_main;\n`;
console.log(targetCode);