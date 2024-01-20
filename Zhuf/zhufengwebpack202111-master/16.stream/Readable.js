const Stream = require('stream');
const { inherits } = require('util');
function Readable(options = {}) {
    Stream.call(this, options);
    this._readableState = {
        ended: false,//水井是否抽取结束,水井是否已经干涸
        buffer: [],//水箱 水泵把水从井时抽出来放到水箱里
        flowing: false//开关是否打开，如果打开会持续抽水，并且发送给用户
    };
    //把传递过来的read方法存放到_read上，用来向数据源读取数据
    if (options.read) this._read = options.read;
}
inherits(Readable, Stream);
//ES6 Class最终其实就是构建函数
//EventEmitter on
Readable.prototype.on = function (event, fn) {
    Stream.prototype.on.call(this, event, fn);
    if (event === 'data') {
        this.resume();//恢复 读取数据，其实就是把开关打开了，让水可以流动下来了
    }
}
Readable.prototype.resume = function () {
    this._readableState.flowing = true;//开关已经打开了，水可以流下来了
    while (this.read());
}
Readable.prototype.read = function () {
    //如果开关打开，并且井里有水才会抽水
    if (this._readableState.flowing && !this._readableState.ended) {
        this._read();
    }
    let data = this._readableState.buffer.shift();
    if (data) {
        this.emit('data', data);
    }
    return data;
}
Readable.prototype.push = function (chunk) {
    //如果本次抽水，抽来的是个空，没抽上来，说明已经没水了，
    if (chunk === null) {
        this._readableState.ended = true;//结束
    } else {
        this._readableState.buffer.push(chunk);
    }
}
Readable.prototype.pipe = function (dest) {
    this.on('data', function (data) {
        let lessThanMark = dest.write(data);
        if (!lessThanMark) {
            this.pause();
        }
    });
    this.on('drain', function () {
        this.resume();
    });
    return dest;
};
module.exports = Readable;