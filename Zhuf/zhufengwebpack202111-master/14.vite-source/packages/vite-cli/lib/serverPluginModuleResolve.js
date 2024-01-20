const fs = require('fs').promises;
const moduleRegex = /\/node_modules\/\.vite\/(.+?)\.js/;
const { resolveVue } = require('./utils');
async function serverPluginModuleResolve({ app, root }) {
    app.use(async (ctx, next) => {
        let result = ctx.path.match(moduleRegex);
        //如果不是第三方模块，则直接向后执行
        if (!result) {
            return await next();
        }
        //如果是第三方模块，继续解析处理
        let moduleName = result[1];//vue
        
        let vueResolved = resolveVue(root);
        ctx.type = 'js';
        const responseBody = await fs.readFile(vueResolved[moduleName], 'utf8');
        ctx.body = responseBody;

    });
}
module.exports = serverPluginModuleResolve;