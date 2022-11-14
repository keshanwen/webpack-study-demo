// 定义一个类作为发布者
class AsyncSeriesWaterfallHook {
    constructor(args){
        // 缓存列表
        this.tasks = [];
        // 定义属性保存将来会给订阅者传递多少个参数
        this.args = args;
    }
    // 用于订阅的方法
    tapAsync(tag, task){
        this.tasks.push(task);
    }
    // 用于发布的方法
    callAsync(...args){
        if(args.length < this.args.length){
            return new Error("参数个数不对");
        }
        args = args.slice(0, this.args.length + 1);
        // 1.取出监听的回调函数
        let finalTask = args.pop();
        // 2.通过递归函数实现依次执行订阅函数
        let index = 0;
        let next = (error, ...data) =>{
            // 取出当前订阅函数
            let task = this.tasks[index];
            // 如果没有取到就表示所有订阅函数执行完了
            if(!task){
                finalTask();
                return;
            }
            // 如果是第一个就将发布消息的参数传递给它
            if(index === 0){
                task(...args, next);
            }
            // 如果不是第一个就需要判断是否有错
            else{
                if(error === "error"){
                    finalTask();
                }else{
                    // 如果没有错误就将上一个订阅函数返回值传递给它
                    task(...data, next);
                }
            }
            index++;
        }
        next();
    }
}
module.exports = AsyncSeriesWaterfallHook;