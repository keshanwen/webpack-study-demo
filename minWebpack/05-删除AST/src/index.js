import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from '@babel/generator';
import * as t from '@babel/types';

let code = `
    console.log("lnj");
    let sum = 10 + 66;
    let minus = 66 - 33;
    console.log("it666");
`;

let ast = parser.parse(code);
// console.log(ast);

traverse(ast, {
    /*
    enter方法什么时候调用: 只要遍历到一个节点就会调用, 并且还会传递一个NodePath对象给我们
                           传递的这个对象中就保存了当前遍历到的节点
    * */
    /*
    enter(path){
        console.log(path.node.name);
    }
     */
    /*
    traverse方法中除了有enter方法以外, 还有其它的方法
    只要是抽象语法树中拥有的节点类型都有对应的方法
    那么如果写的不是enter, 而是抽象语法树节点对应类型的方法
    那么只有遍历到对应的类型才会调用
    * */
    Identifier(path){
        // console.log(path.node.name);
        if(path.node.name === "sum"){
            // console.log(path.node);
            path.parentPath.remove();
        }
    }
});

console.log(ast);

let resultCode = generate(ast);
console.log(resultCode);