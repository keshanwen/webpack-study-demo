

function serverPluginModuleRewrite() {
    function serverPluginServeStatic() {
        console.log('  进入serverPluginServeStatic');
        console.log('  离开serverPluginServeStatic');
    }
    console.log('进入serverPluginModuleRewrite');
    serverPluginServeStatic();
    console.log('离开serverPluginModuleRewrite');
}
serverPluginModuleRewrite();

function one();
function two()
one();
two();