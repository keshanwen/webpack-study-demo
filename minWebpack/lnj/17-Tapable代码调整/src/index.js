const { SyncHook } = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            // 创建一个发布者对象
            vue: new SyncHook(["des"]),
        }
    }
    tap(){
        // 订阅消息
        this.hooks.vue.tap("zs", function (des) {
            console.log("zs", des);
        });
        this.hooks.vue.tap("ls", function (des) {
            console.log("ls", des);
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
