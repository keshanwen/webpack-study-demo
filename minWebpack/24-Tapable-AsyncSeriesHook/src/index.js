// const { AsyncSeriesHook } = require('tapable');
const AsyncSeriesHook = require('./AsyncSeriesHook.js');

class Lesson {
    constructor() {
        this.hooks = {
            // 创建一个发布者对象
            vue: new AsyncSeriesHook(["des"]),
        }
        this.index = 0;
    }
    tap(){
        // 订阅消息
        this.hooks.vue.tapPromise("zs", (des) => {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("zs", des);
                    resolve();
                }, 3000);
            })
        });
        this.hooks.vue.tapPromise("ls", function (des, cb) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("ls", des);
                    resolve();
                }, 2000);
            })
        });
        this.hooks.vue.tapPromise("ww", function (des, cb) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("ww", des);
                    resolve();
                }, 1000);
            })
        });
    }
    call(){
        // 发布消息
        this.hooks.vue.promise("vue课程上线了").then(function () {
            console.log("end");
        });
    }
}
let ls = new Lesson();
ls.tap();
ls.call();
