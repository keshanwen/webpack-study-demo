//const { Writable } = require('stream');
const Writable = require('./Writable');
const ws = new Writable({
    //如果highWaterMark=1说明正在处理的数据只能有1个字节，正在处理的数据包括已经 发给底层系统的数据加上缓存区的数据
    highWaterMark: 3,//最高水位线。其实就是指的能缓存的数据大小
    write(data, encoding, next) {
        //模拟的是真实写入的过程
        console.log('writing ', data.toString());
        setTimeout(next, 1000);
    }
});
//如果缓存区满了，那就返回false,如果没有满，那就返回true
//正在处理的数据如果大于等于最高水位线，就是false,
//返回当前正在处理的数据(向硬盘写入的+缓存的)=当前的水位小于最高水位线
let lessThanMark = ws.write('1');
console.log("lessThanMark:1", lessThanMark);
lessThanMark = ws.write('2');
console.log("lessThanMark:2", lessThanMark);
lessThanMark = ws.write('3');
console.log("lessThanMark:3", lessThanMark);
//如果lessThanMark如果为false,按理说就不要再写了
//监听 可写流的排干事件
ws.once('drain', () => {
    let lessThanMark = ws.write('4');
    console.log("lessThanMark:4", lessThanMark);
    lessThanMark = ws.write('5');
    console.log("lessThanMark:5", lessThanMark);
    lessThanMark = ws.write('6');
    console.log("lessThanMark:6", lessThanMark);
});

