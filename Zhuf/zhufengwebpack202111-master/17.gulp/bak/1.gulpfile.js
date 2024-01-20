const { series, parallel } = require('gulp6');
const oneTask = (done) => {
    setTimeout(() => {
        console.log('oneTask');
        done(null, 'oneResult');
    }, 1000);
}
const twoTask = (done) => {
    setTimeout(() => {
        console.log('twoTask');
        done(null, 'twoResult');
    }, 2000);
}
const threeTask = (done) => {
    setTimeout(() => {
        console.log('threeTask');
        done(null, 'threeResult');
    }, 3000);
}
/* series((err,results) => {
    console.log(results);//[oneResult,twoResult,threeResult]
}); */
//函数的组件 把三个任务变成一个函数，串行依次执行
exports.series = series(oneTask, twoTask, threeTask);
exports.parallel = parallel(oneTask, twoTask, threeTask);
const defaultTask = (done) => {
    console.log('defaultTask');
    done();
}
exports.default = defaultTask;