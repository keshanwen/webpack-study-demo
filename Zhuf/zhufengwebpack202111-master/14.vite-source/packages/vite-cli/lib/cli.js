const Koa = require('koa');
const serverPluginServeStatic = require('./serverPluginServeStatic');
const serverPluginModuleRewrite = require('./serverPluginModuleRewrite');
const serverPluginModuleResolve = require('./serverPluginModuleResolve');
const serverPluginInjectProcess = require('./serverPluginInjectProcess');
const serverPluginVue = require('./serverPluginVue');
function createServer() {
    //获取app
    const app = new Koa();
    //获取当前的工作目录 packages\vite-project
    const root = process.cwd();
    //上下文对象
    const context = {
        app,
        root
    }
    const plugins = [
        serverPluginInjectProcess,
        serverPluginModuleRewrite,
        serverPluginModuleResolve,
        serverPluginVue,
        serverPluginServeStatic
    ]
    plugins.forEach(plugin => plugin(context));
    return app;
}
createServer().listen(5000, () => `vite server已经启动在5000端口上`);