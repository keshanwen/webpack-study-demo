import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from '@babel/generator';

// 1.转换成抽象语法树
const code = `let sum = 10 + 66;`;
const ast = parser.parse(code);
console.log(ast);

// 2.遍历抽象语法树
traverse(ast, {
    enter(path) {
        // console.log(path.node.type);
        if(path.node.type === "Identifier"){
            // 3.修改满足条件的语法树节点
            path.node.name = "add";
            path.stop();
        }
    }
});
console.log(ast);

// 4.将抽象语法树转换成代码
const res = generate(ast);
console.log(res);