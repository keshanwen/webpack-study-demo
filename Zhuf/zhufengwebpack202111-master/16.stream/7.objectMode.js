const { Readable, Writable } = require('stream');

let cell = [{ id: 1 }, { id: 2 }, { id: 3 }];
let idx = 0;
const readableStream = new Readable({
    objectMode: true,
    read() {
        if (idx >= cell.length) {
            this.push(null);
        } else {
            //The "chunk" argument must be of type string or an instance of Buffer
            this.push(cell[idx]);
        }
        idx++;
    }
});
const writableStream = new Writable({
    objectMode: true,
    write(data, encoding, next) {
        //这里模拟的就是写入硬盘的过程，或者说真正吃馒头的过程
        console.log(data);
        setTimeout(next, 1000);
    }
});
readableStream.pipe(writableStream);
