const fs = require('fs');
const through = require('through2');
const { series, parallel } = require('gulp');
function callbackTask(done) {
    setTimeout(() => {
        console.log('callbackTask');
        done();//调用done方法就表示任务完成了
    }, 1000);
}
function promiseTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('promiseTask');
            resolve();//调用resolve方法就表示promise成功了
        }, 1000);
    });
}
async function asyncTask() {
    await new Promise(resolve => {
        setTimeout(() => {
            console.log('asyncTask');
            resolve();//调用resolve方法就表示promise成功了
        }, 1000);
    });
}
function streamTask() {
    //流的操作其实也是异步的，这个任务也需要等待流这个异步任务之后才会让任务结束
    let rs = fs.createReadStream('input.txt', { autoClose: true });
    let ws = fs.createWriteStream('output.txt', { autoClose: true });
    return rs.pipe(through((chunk, enc, next) => {
        setTimeout(() => {
            next(null, chunk.toString() + "$");
        }, 1000);
    })).pipe(ws, { end: true }).on('end', () => console.log('end'));
}
const parallelTask = parallel(callbackTask, promiseTask, asyncTask, streamTask);
const seriesTask = series(callbackTask, promiseTask, asyncTask, streamTask);
exports.callback = callbackTask;
exports.promise = promiseTask;
exports.async = asyncTask;
exports.stream = streamTask;
exports.parallel = parallelTask;//Promise.all
exports.series = seriesTask;