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
        // 注意点: 如果使用的是异步的钩子, 那么就只能通过tapAsync来订阅消息
        this.hooks.vue.tapAsync("zs", (des, cb) => {
            setTimeout(function () {
                console.log("zs", des);
                cb();
            }, 3000);
        });
        this.hooks.vue.tapAsync("ls", function (des, cb) {
            setTimeout(function () {
                console.log("ls", des);
                // cb();
            }, 2000);
        });
        this.hooks.vue.tapAsync("ww", function (des, cb) {
            setTimeout(function () {
                console.log("ww", des);
                cb();
            }, 1000);
        });
    }
    call(){
        // 发布消息
        // 注意点: 如果使用的是异步的钩子, 那么就只能通过callAsync来发布消息
        this.hooks.vue.callAsync("vue课程上线了", function () {
            console.log("end");
        });
    }
}
let ls = new Lesson();
ls.tap();
ls.call();
