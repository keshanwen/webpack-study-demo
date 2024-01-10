const static = require('koa-static');
function serverPluginServeStatic({ app, root }) {
    //给koa添加一个静态文件中间件，以root，也就是当前命令所有的根目录为静态文件根目录
    app.use(static(root));
}
module.exports = serverPluginServeStatic;