
const path = require('path');
const types = require('babel-types');
const generate = require('babel-generator').default;
const traverse = require('babel-traverse').default;

class NormalModule {
    constructor({ name, context, rawRequest, resource, parser, moduleId }) {
        this.name = name;
        this.context = context;
        this.rawRequest = rawRequest;
        this.resource = resource;
        this.moduleId = moduleId||('./'+path.posix.relative(context,resource));
        this.parser = parser;
        this._source = null;
        this._ast = null;
        this.dependencies = [];
    }
    //解析依赖
    build(compilation, callback) {
        this.doBuild(compilation, err => {
            let originalSource = this.getSource(this.resource, compilation);
            // 将 当前模块 的内容转换成 AST
            const ast = this.parser.parse(originalSource);
            traverse(ast, {
                // 如果当前节点是一个函数调用时
                CallExpression: (nodePath) => {
                    let node = nodePath.node
                    // 当前节点是 require 时
                    if (node.callee.name === 'require') {
                        // 修改 require 为 __webpack_require__
                        node.callee.name = '__webpack_require__';
                        //获取要加载的模块ID
                        let moduleName = node.arguments[0].value;
                        //获取扩展名
                        let extension = moduleName.split(path.posix.sep).pop().indexOf('.') == -1 ? '.js' : '';
                        //获取依赖模块的绝对路径
                        let dependencyResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extension);
                        //获取依赖模块的模块ID
                        let dependencyModuleId = '.' + path.posix.sep + path.posix.relative(this.context, dependencyResource);
                        //添加依赖
                        this.dependencies.push({
                            name: this.name, context: this.context, rawRequest: moduleName,
                            moduleId: dependencyModuleId, resource: dependencyResource
                        });
                        node.arguments = [types.stringLiteral(dependencyModuleId)];
                    }
                }
            })
            let { code } = generate(ast)
            this._source = code
            this._ast = ast
            callback();
        });
    }
    //获取模块代码
    doBuild(compilation, callback) {
        let originalSource = this.getSource(this.resource, compilation);
        this._source = originalSource;
        callback();
    }
    getSource(resource, compilation) {
        let originalSource = compilation.inputFileSystem.readFileSync(resource, 'utf8');
        return originalSource;
    }
}

module.exports = NormalModule;