//const { Readable } = require('stream');
// class Readable extends Stream implements ReadableStream {
const Readable = require('./Readable');
//水井
let cell = ['1', '2', '3', '4', '5'];
let idx = 0;
const readableStream = new Readable({
    read() {
        if (idx >= cell.length) {
            this.push(null);
        } else {
            this.push(cell[idx]);
        }
        idx++;
    }
});
module.exports = readableStream;