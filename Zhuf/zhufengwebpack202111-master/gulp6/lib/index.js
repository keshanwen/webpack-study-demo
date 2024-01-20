//const util = require('util');
const UnderTaker = require('undertaker');
const vinyl = require('./vinyl-fs');
function Gulp() {
    //把子类的实例传给父类的构造函数，是用来实例化父类的私有属性
    UnderTaker.call(this);
    //把父类里的定义任务的方法绑定this后赋给this.task
    //定义任务
    this.task = this.task.bind(this);
    //串行执行任务
    this.series = this.series.bind(this);
    //并行执行任务
    this.parallel = this.parallel.bind(this);
}
Gulp.prototype.src = vinyl.src;
Gulp.prototype.dest = vinyl.dest;
//util.inherits(Gulp, UnderTaker);
//继承父类上的实例方法和属性
Object.setPrototypeOf(Gulp.prototype, UnderTaker.prototype);
//继承父类身上的静态方法和属性
Object.setPrototypeOf(Gulp, UnderTaker);
const inst = new Gulp();
module.exports = inst;