

const { readBody } = require('./utils');
const MagicString = require('magic-string');
const { parse } = require('es-module-lexer');
async function rewriteImports(responseBody) {
    let magicString = new MagicString(responseBody);
    let imports = await parse(responseBody);
    if (imports && imports.length > 0 && imports[0] && imports[0].length) {
        for (let i = 0; i < imports[0].length; i++) {
            const { n, s, e } = imports[0][i];
            //如果引入模块名不是.也不是/开头的话，就要替换
            if (/^[^\/\.]/.test(n)) {
                magicString.overwrite(s, e, `/node_modules/.vite/${n}.js`);
            }
        }
    }
    return magicString.toString();
}
function serverPluginModuleRewrite({ app, root }) {
    app.use(async (ctx, next) => {
        //一上来就先向后执行下一个中间件
        await next();
        //执行完内嵌的中间件之后就会有响应体
        if (ctx.body && ctx.response.is('js')) {
            const responseBody = await readBody(ctx.body);
            const result = await rewriteImports(responseBody);
            ctx.body = result;
        }
    });
}

module.exports = serverPluginModuleRewrite;