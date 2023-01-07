const path = require('path')

module.exports = {
    mode: 'none',

    entry: './src/main.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env',{ modules: 'commonjs' }]
                ]
              }
            }
          }
        ]
    },

    optimization: {
        usedExports: true
    }

    // optimization: {
    //     // 模块只导出被使用的成员
    //     usedExports: true,
    //     // 压缩输出结果
    //     minimize: true,
    //     // 尽可能合并每一个模块到一个函数中
    //     concatenateModules: true,
    // }

}