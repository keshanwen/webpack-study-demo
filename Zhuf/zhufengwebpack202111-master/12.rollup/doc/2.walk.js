const acorn = require('acorn');
//在rollup里和webpack是一样，都是通过acorn把源代码转成抽象语法树
const source = `import $ from 'jquery';`;
const walk = require('./ast/walk');
//把源代码转成抽象语法树
const ast = acorn.parse(source, {
    locations: true, ranges: true, sourceType: 'module', ecmaVersion: 8
});
let indent = 0;
const padding = () => " ".repeat(indent);
//ast.body是一个数组，放置的是根语句
ast.body.forEach(statement => {
    walk(statement, {
        enter(node, parent) {
            if (node.type) {
                console.log(padding() + node.type + ' enter');
                indent += 2;
            }
        },
        leave(node, parent) {
            if (node.type) {
                indent -= 2;
                console.log(padding() + node.type + ' leave');
            }
        }
    })
});