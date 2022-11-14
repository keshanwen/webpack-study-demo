import * as parser from "@babel/parser";

const code = `let sum = 10 + 66;`;
const ast = parser.parse(code);
console.log(ast);