
class Scope {
    constructor(options) {
        this.name = options.name;//作用域的名字，没什么用
        this.parent = options.parent;//父作用域，它用来构建作用域链
        this.names = options.names || [];//此作用域内部的定义的变量
        this.isBlockScope = !!options.block;//当前作用域是否是块级作用域
    }
    /**
     * 向当前的作用域内添加个变量name
     * @param {*} name 
     */
    add(name, isBlockDeclaration) {
        //如果这个变量不是一个块级声明，并且当前作用域是一个块级作用域的话 
        //当前是一个块级作用域，声明的变量是var
        if (!isBlockDeclaration && this.isBlockScope) {
            //不添加到自己的作用域，而是添加到父作用域
            this.parent.add(name, isBlockDeclaration);
            return false;
        } else {
            this.names.push(name);
            return true;
        }
    }
    /**
     * 查找某个变量是在哪个作用域中定义的
     * 原理是延着作用域链向上查找，一直查到根作用域为止，如果查不到返回null
     */
    findDefiningScope(name) {
        //如果当前的作用域内包含name变量
        if (this.names.includes(name)) {
            return this;//返回当前作用域 
        }
        if (this.parent) {
            return this.parent.findDefiningScope(name);
        }
        return null;
    }
}
module.exports = Scope;