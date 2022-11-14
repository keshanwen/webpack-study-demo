import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from '@babel/generator';
import * as t from '@babel/types';

let code = ``;

let ast = parser.parse(code);
console.log(ast);

// 需求: 要求手动创建 let sum = 10 + 66;的节点, 添加到body
// 推荐从内向外创建
// 1.创建二元运算符左右参与运算的 字面量节点
let left = t.numericLiteral(10);
let right = t.numericLiteral(66);
// 2.创建二元运算符节点
let init = t.binaryExpression("+", left, right);
// 3.创建表达式标识符节点
let id = t.identifier("sum");
// 4.创建内部变量表达式节点
let variable = t.variableDeclarator(id, init);
// 5.创建外部变量表达式节点
let declaration = t.variableDeclaration("let", [variable]);
// 6.将组合好的节点添加到body中
ast.program.body.push(declaration);

let resultCode = generate(ast);
console.log(resultCode.code);