class Hook {
    constructor(args = []) {
        this.args = args
        this.taps = [] // 将用来存放组装好的 {}
        this._x = undefined // 将来在代码工厂函数中会给 _x = [f1,f2,f3.....]
    }

    tap(options, fn) {
        if (typeof options === 'string') {
            options = {
                name: options
            }
        }

        options = Object.assign({ fn }, options) 

        this._insert(options)
    }

    _insert(options) {
        this.taps[this.taps.length] = options
    }

    call(...args) {
        // 创建将来要具体执行的函数代码
        let callFn = this._createCall()
        // 调用上述的函数 (args 传入进去)
        return callFn.apply(this, args)
    }

    _createCall() {
        return this.compile({
            taps: this.taps,
            args: this.args
        })
    }
}

module.exports = Hook