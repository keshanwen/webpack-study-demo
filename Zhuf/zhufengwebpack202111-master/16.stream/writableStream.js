//const { Writable } = require('stream');
const Writable = require('./Writable');
const writableStream = new Writable({
    write(data, encoding, next) {
        //这里模拟的就是写入硬盘的过程，或者说真正吃馒头的过程
        console.log(data.toString());
        setTimeout(next, 1000);
    }
});
module.exports = writableStream;