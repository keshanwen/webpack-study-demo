const path = require('path')

module.exports = {
    mode: 'development', // 运行模式
    entry: {
        main: './src/index.js' // 打包入口，默认是 src/index.js 文件
    },
    module: {
        rules: [
            {
                test: /\.jpg$/, // 遇到 jpg 结尾的文件，使用该 loader
                use: {
                    loader: 'file-loader' // 使用 file-loader去处理 jpg 结尾的文件
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js', // 输出的文件名称
        path: path.resolve(__dirname,'dist') // 输出的文件路径
    }
}

/*
webpack 只能打包js 文件，那么遇到非Js 文件怎么办？因为项目中不可能只有js文件，还有图片。。。。。其他类型的文件。
那么 loadr 上场了，loader可以将不同类型的文件转换为js文件，不同的文件类型对应了不同的loader,比如 css-loader styele-loader vue-loader file-loader ......
用法很简单,如上:

*/ 