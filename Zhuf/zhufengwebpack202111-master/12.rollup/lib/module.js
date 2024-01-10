const MagicString = require('magic-string');
const { parse } = require('acorn');
const analyse = require('./ast/analyse');
const { hasOwnProperty } = require('./utils');
const SYSTEMS = ['console', 'log'];
class Module {
    constructor({ code, path, bundle }) {
        this.code = new MagicString(code, { filename: path });//源代码
        this.path = path;//当前模块的绝对路径
        this.bundle = bundle;//当前的bundle
        this.ast = parse(code, { ecmaVersion: 8, sourceType: 'module' });//把源代码转成抽象语法树
        this.imports = {};//记录当前模块从哪些模块导入了哪些变量
        this.exports = {};//记录当前模块向外导出了哪些变量
        this.definitions = {};//记录变量是在哪个语句节点中定义的
        this.modifications = {};//记录修改变量的语句
        this.canonicalNames = {};//这里放置着所有的变量名重命名后的结果
        this.analyse();//开始进行语法树的分析
    }
    rename(name, replacement) {
        //name是原来的变量名 replacement替换后的变量名
        this.canonicalNames[name] = replacement;
    }
    getCanonicalName(name) {
        if (!hasOwnProperty(this.canonicalNames, name)) {
            this.canonicalNames[name] = name;
        }
        return this.canonicalNames[name];
    }
    analyse() {
        this.ast.body.forEach(statement => {
            //找出this.imports
            if (statement.type === 'ImportDeclaration') {
                let source = statement.source.value;// ./msg
                let specifiers = statement.specifiers;
                specifiers.forEach(specifier => {
                    let importName = specifier.imported.name;//导入的变量，也就是在导入的模块里叫什么名字
                    let localName = specifier.local.name;//本地变量，在当前模块叫什么
                    //this.imports['name'] = {localName:'name',source:'./msg',importName:'name'};
                    //为了方便记忆，我把格式统一一下
                    this.imports[localName] = { localName, source, importName };
                });
            }
            //找出this.exports
            if (statement.type === 'ExportNamedDeclaration') {
                let declaration = statement.declaration;
                if (declaration.type === 'VariableDeclaration') {
                    let declarations = declaration.declarations;
                    declarations.forEach(declaration => {
                        let localName = declaration.id.name;//当前模块内声明的变量名
                        let exportName = localName;
                        //记录导出了哪个变量，这个变量是通过哪个声明语名声明的
                        this.exports[exportName] = { localName, exportName, declaration };
                    });
                }
            }
        });
        //获取定义的变量和读取的变量
        analyse(this.ast, this.code, this);
        this.ast.body.forEach(statement => {
            //statement._defines可以从语句获取变量名
            //可以从变量名叫定义这个变量的语句
            Object.keys(statement._defines).forEach(name => {
                //this.definitions['say']=function say(hi){}
                this.definitions[name] = statement;
            });
            //这里存放的是当前语句更新到的所有的变量
            Object.keys(statement._modifies).forEach(name => {
                //this.definitions['say']=function say(hi){}
                if (!hasOwnProperty(this.modifications, name)) {
                    this.modifications[name] = [];
                }
                this.modifications[name].push(statement);
            });
        });
    }
    expandAllStatements() {
        let allStatements = [];
        //循环所有的body语句，
        this.ast.body.forEach(statement => {
            //如果是导入语句的话直接忽略 ，不会放在结果 里
            if (statement.type === 'ImportDeclaration') return;
            if (statement.type === 'VariableDeclaration') return;
            if (statement.type === 'FunctionDeclaration') return;
            let statements = this.expandStatement(statement);
            allStatements.push(...statements);
        });
        return allStatements;
    }
    expandStatement(statement) {
        //第二进来的是在msg模块的 var age = 13;语句
        statement._include = true;
        let result = [];
        //获得这个语句依赖或者说使用到了哪些变量
        //var age = 13;
        //A阶段
        const depends = Object.keys(statement._dependsOn);
        depends.forEach(dependName => {
            //找到这个依赖的变量对应的变量定义语句
            let definition = this.define(dependName);
            result.push(...definition);
        });
        //B阶段 
        result.push(statement);
        //再找定义的变量的修改语句
        // 对于main来说，这个defines是空的
        //C阶段
        const defines = Object.keys(statement._defines);
        defines.forEach(name => {//age
            //找到当前模块内对这个变量的修改句 找age变量的修改语句
            const modifications = hasOwnProperty(this.modifications, name) && this.modifications[name];
            if (modifications) {
                modifications.forEach(statement => {
                    if (!statement._include) {
                        let statements = this.expandStatement(statement);
                        result.push(...statements)
                    }
                });
            }
        });
        return result;
    }
    //返回此变量对应的定义语句
    define(name) {
        //判断这个变量是外部导入的，还是模块内声明的
        if (hasOwnProperty(this.imports, name)) {
            //localName name2 importName name source home
            const { localName, importName, source } = this.imports[name];
            //获取依赖的模块 source依赖的模块名 this.path=当前模块的绝对路径
            let importModule = this.bundle.fetchModule(source, this.path);
            //externalLocalName=localName=hname
            let { localName: externalLocalName } = importModule.exports[importName];
            return importModule.define(externalLocalName);
            //说明是模块自己声明的
        } else {
            //获取本模块内的变量声明语句，如果此语句没有包含过的话，递归添加到结果 里
            debugger
            let statement = this.definitions[name];
            if (statement) {
                if (statement._include) {
                    return [];
                } else {
                    return this.expandStatement(statement);
                }
            } else if (SYSTEMS.includes(name)) {//console log
                return [];
            } else {
                throw new Error(`ReferenceError: ${name} is not defined in current module`);
            }
        }
    }
}
module.exports = Module;