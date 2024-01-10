import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.es.js',//指定输出的文件名
        format: 'es',//指定输出的格式 amd/es/iife/umd/cjs
        name: 'bundleName',//当format格式为iife和umd的时候必须提供，它将会作为全局变量持在window下
        globals: {
            lodash: '_',//告诉 rollup 模块lodash可以从全局变量_上取
            jquery: '$'// 告诉 rollup 模块jquery可以从全局变量$上取
        }
    },
    plugins: [
        babel({
            exclude: /node_modules/
        }),
        resolve(),
        commonjs(),
        typescript(),
        terser(),
        postcss(),
        serve({
            open: true,
            port: 8080,
            contentBase: './dist'
        })
    ],
    external: ['lodash', 'jquery']
}