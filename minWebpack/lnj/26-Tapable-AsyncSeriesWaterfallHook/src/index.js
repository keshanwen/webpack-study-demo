// const { AsyncSeriesWaterfallHook } = require('tapable');
const AsyncSeriesWaterfallHook = require('./AsyncSeriesWaterfallHook.js');

class Lesson {
    constructor() {
        this.hooks = {
            // 创建一个发布者对象
            vue: new AsyncSeriesWaterfallHook(["des"]),
        }
        this.index = 0;
    }
    tap(){
        // 订阅消息
        this.hooks.vue.tapPromise("zs", (des) => {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("zs", des);
                    // resolve("1");
                    reject("it666");
                }, 3000);
            })
        });
        this.hooks.vue.tapPromise("ls", function (des) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("ls", des);
                    resolve("2");
                }, 3000);
            })
        });
        this.hooks.vue.tapPromise("ww", function (des) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("ww", des);
                    resolve("3");
                }, 3000);
            })
        });
    }
    call(){
        // 发布消息
        this.hooks.vue.promise("vue课程上线了")
            .then(function () {
                console.log("end");
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
let ls = new Lesson();
ls.tap();
ls.call();
