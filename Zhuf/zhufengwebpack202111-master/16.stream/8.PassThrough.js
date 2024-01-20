const fs = require('fs');
const PassThrough = require('./PassThrough');
const readableStream = require('./readableStream');
const writableStream = require('./writableStream');
const passThrough = new PassThrough();
readableStream.pipe(passThrough).pipe(writableStream);