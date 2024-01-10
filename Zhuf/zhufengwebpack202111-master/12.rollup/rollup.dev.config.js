export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.cjs.js',//指定输出的文件名
        format: 'cjs',//指定输出的格式 amd/es/iife/umd/cjs
    }
}