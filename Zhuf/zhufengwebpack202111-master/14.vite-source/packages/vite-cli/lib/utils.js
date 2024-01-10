const { Readable } = require('stream');
const Module = require('module');
async function readBody(responseBody) {
    if (responseBody instanceof Readable) {
        return new Promise(resolve => {
            let buffers = [];
            responseBody.on('data', (chunk) => {
                buffers.push(chunk);
            }).on('end', () => {
                let body = Buffer.concat(buffers).toString();
                resolve(body);
            });
        });
    } else {
        return responseBody.toString();
    }
}

function resolveVue(root) {
    //创建一个自定义require方法。因为如果你在这里直接 使用require，它会在当前目录找文件
    let require = Module.createRequire(root);
    const resolvePath = (moduleName) => require.resolve(`@vue/${moduleName}/dist/${moduleName}.esm-bundler.js`);
    //返回一个映射对象 key是模块名 值是此模块在硬盘上绝对路径
    return {
        "vue": resolvePath('runtime-dom'),
        "@vue/shared": resolvePath('shared'),
        "@vue/reactivity": resolvePath('reactivity'),
        "@vue/runtime-core": resolvePath('runtime-core'),
    }
}

exports.readBody = readBody;
exports.resolveVue = resolveVue;