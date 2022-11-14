const less = require('less');

module.exports = function (source) {
    // let callback = this.async();
    let css = '';
    less.render(source, function (err, obj) {
        // callback(err, obj.css);
        css = obj.css;
    });
    return css;
};