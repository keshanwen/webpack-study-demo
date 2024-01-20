
const path = require('path');
const fs = require('fs').promises;
const { parse, compileTemplate } = require('@vue/compiler-sfc');
const exportDefaultRegexp = /export default/;
function serverPluginVue({ root, app }) {
    app.use(async (ctx, next) => {
        if (!ctx.path.endsWith('.vue')) {
            return await next();
        }
        //获取vue组件文件的绝对路径 C:\vite-project\src\App.vue
        const vueSFCPath = path.join(root, ctx.path);
        const content = await fs.readFile(vueSFCPath, 'utf8');
        const { descriptor } = parse(content);
        const { script, template } = descriptor;
        let targetCode = '';
        if (script) {
            let scriptContent = script.content;
            scriptContent = scriptContent.replace(exportDefaultRegexp, 'const _sfc_main=');
            targetCode += scriptContent;
        }
        if (template) {
            let templateContent = template.content;
            const { code } = compileTemplate({ source: templateContent });
            targetCode += code;
        }
        targetCode += `\n_sfc_main.render = render`;
        targetCode += `\nexport default _sfc_main`;
        ctx.type = 'js';
        ctx.body = targetCode;
    });
}
module.exports = serverPluginVue;