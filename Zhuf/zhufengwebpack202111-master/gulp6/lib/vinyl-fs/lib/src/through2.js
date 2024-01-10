const { Transform } = require('stream');
function through(transform) {
    return new Transform({
        objectMode: false,
        transform
    });
}
through.obj = function (transform) {
    return new Transform({
        objectMode: true,
        transform
    });
}
module.exports = through;