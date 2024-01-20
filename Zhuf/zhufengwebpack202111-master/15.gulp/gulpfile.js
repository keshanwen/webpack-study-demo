const { src, dest, parallel, watch, series } = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const browserServer = browserSync.create();
//清除输出目录
const clean = () => {
    return src(["dist/**", "temp/**"], { read: false })
        .pipe(plugins.clean())
}
//编译样式
const styles = () => {
    return src("src/styles/**/*.less", { base: 'src' })
        .pipe(plugins.less())
        .pipe(dest('temp'))
}
//编译JS脚本
const scripts = () => {
    return src("src/scripts/**/*.js", { base: 'src' })
        .pipe(plugins.babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(dest('temp'))
}
//编译html模板
const html = () => {
    return src("src/**/*.html", { base: 'src' })
        .pipe(plugins.ejs({ "title": 'gulp实战' }, { cache: false }))
        .pipe(dest('temp'))
}
//压缩图片
const images = async () => {
    const imagemin = await import('gulp-imagemin');
    return src("src/assets/images/**/*.@(jpg|png|gif|svg)", { base: 'src' })
        //.pipe(imagemin.default())
        .pipe(dest('dist'))
}

//拷贝不需要任务编译 处理的静态文件，到输出目录
const static = () => {
    return src("static/**", { base: 'static' })
        .pipe(dest('dist'))
}
const serve = () => {
    watch('src/styles/**/*.less', styles).on('change', browserSync.reload);;
    watch('src/scripts/**/*.js', scripts).on('change', browserSync.reload);;
    watch('src/**/*.html', html).on('change', browserSync.reload);;
    watch([
        "src/assets/images/**/*.@(jpg|png|gif|svg)",
        "static/**"
    ], browserServer.reload);
    //serve和webpack-dev-server里的打包不一样，serve不会在内存和硬盘上生成任何文件，
    //webpack-dev-server也只读内存中的文件，webpack打包生成到内存里，
    return browserServer.init({
        notify: false,
        server: {
            baseDir: ['temp', "src", "static"],//静态文件根目录
            files: ['dist/**'],//监听 文件变化，文件变化后重新刷新浏览器
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });
}
const concat = () => {
    //src index.html
    //经过useref处理之后变成 里面有三个文件了index.html build.css build.js
    return src('temp/**/*.html', { base: 'temp' })
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
        .pipe(plugins.if('*.js', plugins.uglify()))
        .pipe(plugins.if('*.css', plugins.cleanCss()))
        .pipe(plugins.if('*.html', plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })))
        .pipe(dest('dist'))
}
//把需要编译 的任务组合在一起，成为一个并发执行的组合任务
const compile = parallel(styles, scripts, html);
const build = series(clean, parallel(series(compile, concat), images, static));
const dev = series(clean, compile, serve);
//生成环境构建
exports.build = build;
//开发环境预览
exports.dev = dev;

///assets/images/circle.svg
//  dist/assets/images/circle.svg
// src/assets/images/circle.svg

///rect.svg

//dist/rect.svg
// src/rect.svg
// static/rect.svg