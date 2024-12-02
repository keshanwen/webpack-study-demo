const { Tapable } = require("tapable");

/*
    代表整个编译对象，负责整个编译的过程，里面会保存所有的编译信息
    Compiler 类的实例全局唯一
*/ 
class Compiler {
    constructor(context) {
        this.options = {};
        this.context = context; //设置上下文路径
        this.hooks = {};
    }
    run(callback) {
        console.log("Compiler run");
        callback(null, {
            toJson() {
                return {
                    entries: true,
                    chunks: true,
                    modules: true,
                    assets: true
                }
            }
        });
    }
}


module.exports = Compiler;