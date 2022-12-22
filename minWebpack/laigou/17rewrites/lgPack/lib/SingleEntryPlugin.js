
class SingleEntryPlugin {
    constructor(context, entry, name) {
        this.context = context
        this.entry = entry
        this.name = name
    }

    apply(compiler) {
        compiler.hooks.make.tapAsync('singleEntryPlugin',(compilation, callback) => {
            const { context, entry, name } = this
            console.log('make 钩子监听执行了~~~~~~~~~~~~~~~~~~~~~~')
        })
    }
}


module.exports = SingleEntryPlugin