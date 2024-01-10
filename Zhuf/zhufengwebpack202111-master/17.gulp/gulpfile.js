const { src, dest } = require('gulp');
//const prefix = require('./gulp-prefix');
const babel = require('./gulp-babel');
const defaultTask = () => {
    return src('src/scripts/**/*.js', { buffer: true })
        .pipe(babel({ presets: ["@babel/preset-env"] }))
        .pipe(dest('dist'));
}
exports.default = defaultTask;