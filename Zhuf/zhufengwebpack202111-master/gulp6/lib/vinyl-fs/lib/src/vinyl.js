const { Stream } = require('stream');
const path = require('path');
function VinylFile(options) {
    for (let key in options) {
        this[key] = options[key];
    }
    this.relative = path.relative(this.base, this.path);
}
VinylFile.prototype.isBuffer = function () {
    return Buffer.isBuffer(this.contents)
}
VinylFile.prototype.isStream = function () {
    return this.contents instanceof Stream;
}
VinylFile.isVinyl = function (obj) {
    return obj instanceof VinylFile;
}
module.exports = VinylFile;