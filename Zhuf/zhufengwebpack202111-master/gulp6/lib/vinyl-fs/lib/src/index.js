

const gs = require('./glob-stream');
const wrapVinyl = require('./wrap-vinyl');
const readContents = require('./read-contents');

function src(glob) {
    //获取了glob的可读流
    const globStream = gs(glob);
    //获取的一个虚拟文件流
    const vinylStream = globStream.pipe(wrapVinyl());
    //每个虚拟文件contents
    const readContentStream = vinylStream.pipe(readContents());
    return readContentStream;
}
module.exports = src;