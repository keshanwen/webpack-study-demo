

function DefaultRegistry() {
    this._tasks = {};
}

DefaultRegistry.prototype.set = function (name, fn) {
    this._tasks[name] = fn;
}
DefaultRegistry.prototype.get = function (name) {
    return this._tasks[name];
}

module.exports = DefaultRegistry;