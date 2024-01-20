const Duplex = require('./Duplex');
const { inherits } = require('util');
inherits(Transform, Duplex);
function Transform(options) {
    Duplex.call(this, options);
    if (options.transform) this._transform = options.transform;
}
Transform.prototype._write = function (chunk, encoding, next) {//chunk1
    this._transform(chunk, encoding, (err, data) => {
        //向可读流的水箱里放数据 chunk 1=>1$
        this.push(data);
        next(err);
    });
}
Transform.prototype._read = function () {

}
module.exports = Transform;