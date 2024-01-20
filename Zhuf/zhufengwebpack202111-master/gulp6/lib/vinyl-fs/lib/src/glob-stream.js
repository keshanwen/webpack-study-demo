
const GlobStream = require('./GlobStream');
function globStream(glob, opt = {}) {
    //给当前的工作目录赋值
    opt.cwd = opt.cwd || process.cwd();
    return new GlobStream(glob, opt);
}
module.exports = globStream;