/**
 * 判断obj对象上是否有prop属性
 * @param {*} obj  对象
 * @param {*} prop  属性
 * @returns 
 */
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}


function keys(obj) {
    return Object.keys(obj);
}

exports.hasOwnProperty = hasOwnProperty;
exports.keys = keys;