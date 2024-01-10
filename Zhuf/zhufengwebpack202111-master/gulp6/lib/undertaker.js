let EventEmitter = require('events');
var flatten = require('arr-flatten');
const DefaultRegistry = require('./undertaker-registry');
function UnderTaker() {
    EventEmitter.call(this);
    this._registry = new DefaultRegistry();
}
Object.setPrototypeOf(UnderTaker.prototype, EventEmitter.prototype);
Object.setPrototypeOf(UnderTaker, EventEmitter);

function _setTask(name, fn) {
    this._registry.set(name, fn);
}
function _getTask(name) {
    return this._registry.get(name);
}
function task(name, fn) {
    if (!fn) {
        return this._getTask(name);
    }
    this._setTask(name, fn)
}
function series() {
    var args = normalizeArgs(this._registry, arguments);
    let fn = buildSeries(args);
    return fn.bind(this);
}
function parallel() {
    var args = normalizeArgs(this._registry, arguments);
    let fn = buildParallel(args);
    return fn.bind(this);
}
/**
 * 
 * @param {*} values 函数的数组 [one,two,three]
 * done 最后执行的回调
 * @returns  fn
 */
function buildSeries(values) {
    function series(done) {
        //获取数组的长度
        let length = values.length;
        //当前正在执行的函数的索引
        let idx = 0;
        //存放结果的数组
        let results = [];
        const next = (idx) => {
            let fn = values[idx];
            let startHr = process.hrtime();
            this.emit('start', { name: fn.name });
            fn((err, result) => {
                this.emit('stop', { name: fn.name, duration: process.hrtime(startHr) });
                results[idx] = result;
                if (++idx >= length) {
                    done(err, results);
                } else {
                    next(idx);
                }
            });
        }
        next(idx);
    }
    return series;
}
function buildParallel(values) {
    function parallel(done) {
        //获取数组的长度
        let length = values.length;
        let counter = length;
        //存放结果的数组
        let results = [];
        const next = (idx) => {
            let fn = values[idx];
            let startHr = process.hrtime();
            this.emit('start', { name: fn.name });
            fn((err, result) => {
                this.emit('stop', { name: fn.name, duration: process.hrtime(startHr) });
                results[idx] = result;
                if (--counter == 0) {
                    done(err, results);
                }
            });
        }
        for (let idx = 0; idx < length; idx++) {
            next(idx);
        }
    }
    return parallel;
}
function normalizeArgs(registry, args) {
    //获取函数，如果是函数，直接返回，如果不是函数，变成函数
    function getFunction(task) {
        if (typeof task === 'function') {
            return task;
        }
        var fn = registry.get(task);
        return fn;
    }
    var flattenArgs = flatten(args);
    return flattenArgs.map(getFunction);
}
UnderTaker.prototype.task = task;
UnderTaker.prototype.parallel = parallel;
UnderTaker.prototype.series = series;
UnderTaker.prototype._setTask = _setTask;
UnderTaker.prototype._getTask = _getTask;




module.exports = UnderTaker;