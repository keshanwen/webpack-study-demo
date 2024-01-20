const { Readable } = require('stream');
const { inherits } = require('util');
const { Glob } = require('glob');
const globParent = require('glob-parent');
const toAbsoluteGlob = require('to-absolute-glob');
function GlobStream(glob, opt = {}) {
    //可读流里可以放对象
    Readable.call(this, { objectMode: true });
    //把glob相对路径变成绝对路径
    //src/scripts/**/*.js=>C:/gulp6/src/scripts/**/*
    const absoluteGlob = toAbsoluteGlob(glob);
    //basePath = C:/gulp6/src/scripts/
    let basePath = globParent(absoluteGlob);
    //Glob也是一个可读流，它内部会去遍历硬盘上的文件，如果一旦发现匹配的文件就发身match事件
    let globber = new Glob(absoluteGlob, opt);
    this._globber = globber;
    globber.on('match', (filePath) => {
        let globFile = {
            cwd: opt.cwd,
            base: basePath,
            path: filePath
        }
        //向可读流里放数据，
        this.push(globFile);
    });
    globber.once('end', () => {
        //表示此可读流已经结束了，已经 读完了。
        this.push(null);
    });
}
inherits(GlobStream, Readable);
//什么时候 会调用_read pipe(可写流)  或者 on('data')
GlobStream.prototype._read = function () {
    //只有当调用GlobStream_read方法的时候，才会去让_globber开始发射数据
    this._globber.resume();
}
module.exports = GlobStream;