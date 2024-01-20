
class Scope {
    constructor(options) {
        this.scopeName = options.scopeName;//作用域的名字，没什么用
        this.parentScope = options.parentScope;//父作用域，它用来构建作用域链
        this.variableNames = options.variableNames || [];//此作用域内部的定义的变量
    }
    /**
     * 向当前的作用域内添加个变量name
     * @param {*} name 
     */
    add(variableName) {
        this.variableNames.push(variableName);
    }
    /**
     * 查找某个变量是在哪个作用域中定义的
     * 原理是延着作用域链向上查找，一直查到根作用域为止，如果查不到返回null
     */
    findDefiningScope(variableName) {
        //如果当前的作用域内包含name变量
        if (this.variableNames.includes(variableName)) {
            return this;//返回当前作用域 
        }
        if (this.parentScope) {
            return this.parentScope.findDefiningScope(variableName);
        }
        return null;
    }
}
module.exports = Scope;