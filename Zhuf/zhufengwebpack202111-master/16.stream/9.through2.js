const fs = require('fs');
const through = require('./through2');
const readableStream = require('./readableStream');
const writableStream = require('./writableStream');
//through可以帮我们快速创建一个转换流
const transformStream = through(function transform(buffer, encoding, next) {
    let transformed = buffer.toString() + '$';
    next(null, transformed);
});
readableStream.pipe(transformStream).pipe(writableStream);