const fs = require('fs-extra');
const path = require('path');
const through = require('through2');
function writeContents(outFolder) {
    function writeFile(file, encoding, callback) {
        //得到要写入文件路径 获得当前要写入的目录的绝对路径 dist
        let basePath = path.resolve(file.cwd, outFolder);
        //file.relative 
        let writePath = path.resolve(basePath, file.relative);
        //保证此路径的父路径存在
        fs.ensureDir(path.dirname(writePath), (err) => {
            fs.writeFile(writePath, file.contents, encoding, callback);
        });
    }
    return through.obj(writeFile);
}
module.exports = writeContents;