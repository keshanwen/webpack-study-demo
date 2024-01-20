const Bundle = require('./bundle');
/**
 * 从入口出发进行编译 ，输出文件
 * @param {*} entry 
 * @param {*} filename 
 */
function rollup(entry, filename) {
    const bundle = new Bundle({ entry });
    bundle.build(filename);
}
module.exports = rollup