
const through = require('./through2');
const Vinyl = require('./vinyl');
function wrapVinyl() {
    function wrapFile(globFile, encoding, callback) {
        let vinylFile = new Vinyl(globFile);
        callback(null, vinylFile);
    }
    return through.obj(wrapFile);
}
module.exports = wrapVinyl;