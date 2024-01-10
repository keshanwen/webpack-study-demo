/**
 * 以深度优先的方式遍历当前的节点
 * @param {*} astNode 当前节点
 * @param {*} visitor 访问者 
 */
function walk(astNode, { enter, leave }) {
    visit(astNode, null, enter, leave);
}
/**
 * 访问一个语法树的节点
 * @param {*} astNode 当前节点
 * @param {*} parent 父节点
 * @param {*} enter 进入时执行的方法
 * @param {*} leave 离开时执行方法
 */
function visit(astNode, parent, enter, leave) {
    if (enter) {
        enter.call(null, astNode, parent);
    }
    const childKeys = Object.keys(astNode).filter(key => typeof astNode[key] === 'object');
    childKeys.forEach(childKey => {
        let value = astNode[childKey];
        if (Array.isArray(value)) {
            value.forEach(child => visit(child, astNode, enter, leave));
        } else if (value && value.type) {
            visit(value, astNode, enter, leave)
        }
    });
    if (leave) {
        leave.call(null, astNode, parent);
    }
}

module.exports = walk;