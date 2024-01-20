const readableStream = require('./readableStream');
const transformStream = require('./transformStream');
const writableStream = require('./writableStream');
readableStream.pipe(transformStream).pipe(writableStream);