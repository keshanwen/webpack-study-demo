var through = require('through2');
const babel = require('@babel/core');
function gulpPrefix(options) {
    const stream = through.obj(function (file, encoding, callback) {
        /*  const { code } = babel.transformSync(file.contents, options);
         console.log('code', code);
         file.contents = Buffer.from(code);
         callback(null, file); */
        babel.transform(file.contents, options, (err, result) => {
            const { code } = result;
            console.log('code', code);
            file.contents = Buffer.from(code);
            callback(err, file);
        });
    });
    return stream;
}
//转换流特点，是获取老的流里的内容，然后对文件进行转换
//转换流继承自双工流，可以读也可以写
//转换可以自动把读到的内容，转换后放在可流读里
module.exports = gulpPrefix;