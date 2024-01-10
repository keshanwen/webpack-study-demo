const MagicString = require('magic-string');
const source = `export var name = "zhufeng"`;
let magicString = new MagicString(source);
//剪出一个子串出来 前闭后开区间 xxx.slice(0,6) 返回一个原串的克隆
console.log(magicString.snip(0, 6).toString());
//删除从开始到结束的区间的内容
console.log(magicString.remove(0, 7).toString());

//还可以用来连接多个子串
let bundleString = new MagicString.Bundle();
bundleString.addSource({
    content: 'var a =1;',
    separator: '\n'
});
bundleString.addSource({
    content: 'var b =2;',
    separator: '\n'
});
console.log(bundleString.toString());