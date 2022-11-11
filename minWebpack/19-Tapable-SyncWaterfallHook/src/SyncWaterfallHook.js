// 定义一个类作为发布者
class SyncWaterfallHook {
    constructor(args){
        // 缓存列表
        this.tasks = [];
        // 定义属性保存将来会给订阅者传递多少个参数
        this.args = args;
    }
    // 用于订阅的方法
    tap(tag, task){
        this.tasks.push(task);
    }
    // 用于发布的方法
    call(...args){
        if(args.length < this.args.length){
            return new Error("参数个数不对");
        }
        args = args.slice(0, this.args.length);

        let [firstTask, ...others] = this.tasks;
        let result = firstTask(...args);
        others.forEach(function (task) {
            result = task(result);
        });
    }
}
module.exports = SyncWaterfallHook;
/*
// 1.创建发布者
let hook = new SyncHook(["name", "price"]);
// 2.订阅者像发布者订阅
hook.tap("zs", function (name, price) {
    console.log(name, price);
});
hook.tap("ls", function (name, price) {
    console.log(name, price);
});
hook.tap("ww", function (name, price) {
    console.log(name, price);
});
// 3.发布者发布消息
hook.call("豪车", 88888, 666);
 */