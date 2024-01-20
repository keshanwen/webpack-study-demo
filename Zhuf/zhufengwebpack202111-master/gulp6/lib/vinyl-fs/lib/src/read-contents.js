
const fs = require('fs-extra');
const path = require('path');
const through = require('through2');
function readContents() {
    function readFile(file, encoding, callback) {
        //根据文件路径给file.contents赋值为data
        fs.readFile(file.path, onReadFile);
        function onReadFile(err, data) {
            file.contents = data;
            //this.push
            callback(err, file);
        }
    }
    return through.obj(readFile);
}
module.exports = readContents;