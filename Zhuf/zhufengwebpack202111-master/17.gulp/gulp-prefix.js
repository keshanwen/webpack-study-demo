var through = require('through2');
var { PluginError } = require('gulp-util');
const { PassThrough } = require('stream');
//插件的名称
const PLUGIN_NAME = 'gulp-prefix';

function gulpPrefix(prefixText) {
    if (!prefixText) {
        throw new PluginError(PLUGIN_NAME, '要加的前缀信息为空!');
    }
    //转成Buffer
    prefixText = Buffer.from(prefixText);
    const stream = through.obj(function (file, encoding, callback) {
        //虚拟文件对象，它的contents,我们这个插件只支持 Buffer
        if (file.isStream()) {
            const stream = new PassThrough();
            stream.write(prefixText);
            //让老的流写通过管道的方式写入stream里
            file.contents = file.contents.pipe(stream);
        } else if (file.isBuffer()) {
            file.contents = Buffer.concat([prefixText, file.contents]);
        }
        callback(null, file);
    });
    return stream;
}
//转换流特点，是获取老的流里的内容，然后对文件进行转换
//转换流继承自双工流，可以读也可以写
//转换可以自动把读到的内容，转换后放在可流读里
module.exports = gulpPrefix;