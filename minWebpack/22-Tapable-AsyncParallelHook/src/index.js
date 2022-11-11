// const { AsyncParallelHook } = require('tapable');
const AsyncParallelHook = require('./AsyncParallelHook.js');

class Lesson {
    constructor() {
        this.hooks = {
            // 创建一个发布者对象
            vue: new AsyncParallelHook(["des"]),
        }
        this.index = 0;
    }
    tap(){
        // 订阅消息
        // 注意点: 如果是通过tapPromise来订阅消息, 那么就必须返回一个Promise对象
        //         如果是通过tapPromise来订阅消息, 那么就必须通过resolve来告诉它当前的订阅函数执行完毕了
        this.hooks.vue.tapPromise("zs", (des) => {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("zs", des);
                    resolve();
                }, 3000);
            })
        });
        this.hooks.vue.tapPromise("ls", function (des) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("ls", des);
                    // resolve();
                }, 2000);
            })
        });
        this.hooks.vue.tapPromise("ww", function (des) {
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
        // 注意点: 如果是通过promise来发布消息, 那么就必须通过.then来监听是否所有的订阅函数都执行完毕了
        this.hooks.vue.promise("vue课程上线了").then(function () {
            console.log("end");
        });
    }
}
let ls = new Lesson();
ls.tap();
ls.call();
