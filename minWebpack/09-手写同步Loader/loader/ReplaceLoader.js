/*
注意点:
1.webpack在使用loader的时候, 会将当前打包的内容传递给当前的loader
2.webpack在使用loader的时候, 会修改loader中的this, 所以定义loader的函数只能是ES5的函数, 不能是ES6函数
* */
module.exports = function (source) {
    source = source.replace(/it666/g, "itzb");
    return source;
};