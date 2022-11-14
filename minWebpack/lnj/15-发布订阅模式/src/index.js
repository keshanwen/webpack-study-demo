const SyncHook = require('./SyncHook.js');
/*
需求:
学员到知播渔学习Vue的课程和React的课程, 但是还没有对应课程的视频
要求通过发布订阅模式实现视频发布后通知所有想学习Vue课程的学员和React课程的学员
* */
class Lesson {
    constructor(){
        this.videos = {
            // 创建一个发布者对象, 专门用于处理Vue订阅和发布
            vue: new SyncHook(["des"]),
            // 创建一个发布者对象, 专门用于处理React订阅和发布
            react: new SyncHook(["des"]),
        }
    }
    // 新增订阅Vue课程的方法
    studyVue(name, fn){
        this.videos.vue.tap(name, fn);
    }
    // 新增订阅Vue课程的方法
    studyReact(name, fn){
        this.videos.react.tap(name, fn);
    }
    // 新增发布Vue到课消息方法
    callVue(...args){
        this.videos.vue.call(...args);
    }
    // 新增发布React到课消息方法
    callReact(...args){
        this.videos.react.call(...args);
    }
}

let ls = new Lesson();
ls.studyVue("zs", function (des) {
    console.log("zs", des);
});
ls.studyVue("ls", function (des) {
    console.log("ls", des);
});
ls.studyReact("ww", function (des) {
    console.log("ww", des);
});
ls.studyReact("zq", function (des) {
    console.log("zq", des);
});
// ls.callVue("vue课程已经上线了");
ls.callReact("react课程已经上线了");
