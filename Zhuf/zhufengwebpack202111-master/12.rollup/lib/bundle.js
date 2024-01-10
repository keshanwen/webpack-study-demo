
const fs = require('fs');
const path = require('path');
const Module = require('./module');
const MagicString = require('magic-string')
const { keys, hasOwnProperty } = require('./utils')
const walk = require('./ast/walk');
class Bundle {
    constructor(options) {
        //这样写可以兼容没有添加.js后缀或者传递的路径是一个相对路径的情况
        this.entryPath = path.resolve(options.entry.replace(/\.js$/, '') + '.js');
    }
    build(filename) {
        let entryModule = this.fetchModule(this.entryPath);
        //获取入口模块所有的语句节点
        this.statements = entryModule.expandAllStatements();
        this.deConflict();
        //根据这些语句节点生成新成源代码
        const { code } = this.generate();
        //写入目标文件就可以
        fs.writeFileSync(filename, code);
    }
    deConflict() {
        const defines = {};//定义的变量
        const conflict = {};//变量我冲突的变量
        this.statements.forEach(statement => {
            keys(statement._defines).forEach(name => {
                if ((hasOwnProperty(defines, name))) {
                    conflict[name] = true;
                } else {
                    defines[name] = [];
                }
                defines[name].push(statement._module);
            });
        });
        keys(conflict).forEach(name => {
            const modules = defines[name];
            modules.pop();//弹出最后一个，最后一个模块不需要重命名
            //modules.shift();//弹出第一个，第一个模块不需要重命名
            modules.forEach((module, index) => {
                module.rename(name, `${name}$${modules.length - index}`);
            });
        });

    }
    /**
     * 获取模块
     * @param {*} importee 模块的路径，可能是绝对路径，也可能是相对路径 msg.js
     *  @param {*}importer 从哪个模块导入 main.js
     */
    fetchModule(importee, importer) {
        let route;
        //如果importer为空说明这是一个入口模块，没有引入它的父模块
        if (!importer) {
            route = importee;
        } else {
            if (path.isAbsolute(importee)) {
                route = importee;
            } else if (importee[0] === '.') {
                route = path.resolve(path.dirname(importer), importee.replace(/\.js$/, '') + '.js');
            }
        }
        if (route) {
            let code = fs.readFileSync(route, 'utf8');
            const module = new Module({
                code,//模块源代码
                path: route,//模块的绝对路径
                bundle: this//bundle全局只有一份
            });
            return module;
        }
    }
    generate() {
        let bundleString = new MagicString.Bundle();
        this.statements.forEach(statement => {
            let replacements = {};
            keys(statement._dependsOn)//用到的变量
                .concat(keys(statement._defines))//定义的变量
                .forEach(name => {
                    const canonicalName = statement._module.getCanonicalName(name);
                    if (name !== canonicalName) {
                        replacements[name] = canonicalName;
                    }
                });
            const source = statement._source.clone();
            if (/^Export/.test(statement.type)) {
                source.remove(statement.start, statement.declaration.start);
            }
            replaceIdentifiers(statement, source, replacements);
            //把每个astNode语法树节点代码添加到bundleString
            bundleString.addSource({
                content: source,
                separator: '\n'
            });
        });
        return { code: bundleString.toString() };
    }
}
function replaceIdentifiers(statement, source, replacements) {
    walk(statement, {
        enter(node) {
            if (node.type === 'Identifier') {
                if (node.name && hasOwnProperty(replacements, node.name)) {
                    //source = var age1 = age + '1';
                    //source = var age1 = age$1 + '1';
                    source.overwrite(node.start, node.end, replacements[node.name]);
                }
            }
        }
    });
}
module.exports = Bundle;