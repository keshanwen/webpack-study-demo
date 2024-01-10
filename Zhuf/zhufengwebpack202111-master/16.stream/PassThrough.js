
let { inherits } = require('util');
let Transform = require('./Transform');
function PassThrough(options = {}) {
    Transform.call(this, options);
}
inherits(PassThrough, Transform);
PassThrough.prototype._transform = function (buffer, encoding, next) {
    console.log('正在经过PassThrough', buffer.toString());
    next(null, buffer);
}
module.exports = PassThrough;