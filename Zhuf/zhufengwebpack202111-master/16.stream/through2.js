const { Transform,PassThrough } = require('stream');
function through2(transform) {
    const transformStream = new Transform({
        transform
    });
    return transformStream;
}
module.exports = through2;