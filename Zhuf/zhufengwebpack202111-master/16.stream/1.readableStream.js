const readableStream = require('./readableStream');
//继承自EventEmitter
debugger
readableStream.on('data', (data) => {
    console.log(data.toString());
});