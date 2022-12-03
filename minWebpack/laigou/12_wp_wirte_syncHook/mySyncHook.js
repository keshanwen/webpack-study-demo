let Hook = require('./myHook.js')

class HookCodeFactory {
    args() {
        return this.options.args.join(',')  // ["name", "age"]===> name, age
    }
    head() {
        return `var _x = this._x;`
    }
    content() {
        let code = ``
        for (var i = 0; i < this.options.taps.length; i++) {
            code += `var _fn${i} = _x[${i}];_fn${i}(${this.args()});`
        }
        return code
    }
    setup(instance, options) {
        this.options = options
        instance._x = options.taps.map( o => o.fn )
    }
    create() {
        let fn
        // fn = new Function("name,age","var _x = this._x, var _fn0 = _x[0];_fn0(name, age)")
        fn = new Function(
            this.args(),
            this.head() + this.content()
        )

        return fn
    }
}

let factory = new HookCodeFactory()


class SyncHook extends Hook {
    constructor(args) {
        super(args)
    }

    compile(options) {
        factory.setup(this, options)
        return factory.create(options)
    }
}


module.exports = SyncHook