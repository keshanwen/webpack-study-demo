const { Transform } = require('stream');
const transformStream = new Transform({
    transform(buffer, encoding, next) {
        let transformed = buffer.toString() + '$';
        next(null, transformed);
    }
});
module.exports = transformStream;