var through = require('through2');
const { PassThrough } = require('stream');
var { PluginError } = require('gulp-util');
//插件的名称
const PLUGIN_NAME = 'gulp-prefix';
function prefixStream(prefixText) {
    //var stream = through();
    const stream = new PassThrough();
    stream.write(prefixText);
    return stream;
}

function gulpPrefix(prefixText) {
    if (!prefixText) {
        throw new PluginError(PLUGIN_NAME, '要加的前缀信息为空!');
    }
    //转成Buffer
    prefixText = Buffer.from(prefixText);
    const stream = through.obj(function (file, encoding, callback) {
        //虚拟文件对象，它的contents,我们这个插件只支持 Buffer
        if (file.isBuffer()) {
            this.emit('error', new PluginError(PLUGIN_NAME, '此插件不支持Buffer!'));
            return callback();
        }
        if (file.isStream()) {
            //file.contents = Buffer.concat([prefixText, file.contents]);
            let stream = prefixStream(prefixText);
            //让老的流写通过管道的方式写入stream里
            file.contents = file.contents.pipe(stream);
        }
        //this.push(file);
        callback(null, file);
    });
    return stream;
}
//转换流特点，是获取老的流里的内容，然后对文件进行转换
//转换流继承自双工流，可以读也可以写
//转换可以自动把读到的内容，转换后放在可流读里
module.exports = gulpPrefix;