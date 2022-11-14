// const { SyncLoopHook } = require('tapable');
const SyncLoopHook = require('./SyncLoopHook.js');

class Lesson {
    constructor() {
        this.hooks = {
            // 创建一个发布者对象
            vue: new SyncLoopHook(["des"]),
        }
        this.index = 0;
    }
    tap(){
        // 订阅消息
        this.hooks.vue.tap("zs", (des) => {
            console.log("zs", des);
            // return "1";
            this.index++;
            return this.index === 3 ? undefined : '随便返回';
        });
        this.hooks.vue.tap("ls", function (des) {
            console.log("ls", des);
            // return "2";
        });
        this.hooks.vue.tap("ww", function (des) {
            console.log("ww", des);
            // return "3";
        });
    }
    call(){
        // 发布消息
        this.hooks.vue.call("vue课程上线了");
    }
}
let ls = new Lesson();
ls.tap();
ls.call();
