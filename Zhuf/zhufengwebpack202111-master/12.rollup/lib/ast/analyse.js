const Scope = require('./scope');
const walk = require('./walk');
const { hasOwnProperty } = require('../utils');
/**
 * 对当前的语法进行解析
 * @param {*} ast 语法树
 * @param {*} code 源代码
 * @param {*} module 模块
 */
function analyse(ast, magicString, module) {
    let currentScope = new Scope({ name: '全局作用域' });//相当于模块内的顶级作用域，也就是最外层的作用域
    //遍历所有的语法一级语句或者说顶级语句
    ast.body.forEach(statement => {
        //把变量添加到当前的作用域内
        function addToScope(name, isBlockDeclaration) {
            let added = currentScope.add(name, isBlockDeclaration);
            debugger
            //判断当前scope是不是顶级作用域，如果是顶级的话就往 statement挂一个变量，表示它声明一个顶级变量
            if (!currentScope.parent || !added) {
                //在当前的语句中添加一个定义的变量
                statement._defines[name] = true;
            }
        }
        //给statement语法树节点添加属性
        Object.defineProperties(statement, {
            _module: { value: module },
            //_source 就是这个语法树的节点在源码中对应那一部分节点源代码
            _source: { value: magicString.snip(statement.start, statement.end) },
            //当前节点是否已经 被 包含在结果中了
            _include: { value: false, writable: true },
            //当前statement节点声明了哪些变量
            _defines: { value: {} },
            //当前statement节点依赖读取了哪些变量
            _dependsOn: { value: {} },
            //这是存放着当前statement对应的修改语句， 这条语句修改了什么变量
            _modifies: { value: {} },
        });
        walk(statement, {
            enter(node) {
                let newScope;
                switch (node.type) {
                    //如果当前的节点是函数声明的话
                    case 'FunctionDeclaration':
                        //把函数的名称添加到当前的作用域，也就是全局作用域里
                        addToScope(node.id.name, false);
                        let names = node.params.map(param => param.name);
                        newScope = new Scope({ name: node.id.name, parent: currentScope, names, block: false });
                        break;
                    case 'VariableDeclaration':
                        node.declarations.forEach(declaration => {
                            if (node.kind === 'let' || node.kind === 'const') {
                                addToScope(declaration.id.name, true);//这是一个块级声明 const let
                            } else {
                                addToScope(declaration.id.name, false);//var
                            }
                        });
                        break;
                    case 'BlockStatement':
                        newScope = new Scope({
                            parent: currentScope,
                            block: true
                        });
                        break;
                }
                //如果有值说明当前的节点创建了新的作用域
                if (newScope) {
                    Object.defineProperty(node, '_scope', { value: newScope });
                    currentScope = newScope;
                }
            },
            leave(node) {
                if (hasOwnProperty(node, '_scope')) {
                    currentScope = currentScope.parent;
                }
            }
        });
    });
    //在构建完作用域链之后，找到当前模块内声明的哪些变量之后
    //还需要找出当前模块内使用到了哪些变量 
    ast.body.forEach(statement => {
        function checkForReads(node) {
            if (node.type === 'Identifier') {
                statement._dependsOn[node.name] = true;
            }
        }
        function checkForWrites(node) {
            function addNode(node) {//TODO
                if (node.type === 'Identifier') {
                    statement._modifies[node.name] = true;
                }
            }
            if (node.type === 'AssignmentExpression') {
                addNode(node.left);
            } else if (node.type === 'UpdateExpression') {
                addNode(node.argument);
            }
        }
        walk(statement, {
            enter(node) {
                checkForReads(node);//检查当前节点读取了哪些变量
                checkForWrites(node);//检查当前节点修改了哪些变量
            }
        });
    });
}
module.exports = analyse;