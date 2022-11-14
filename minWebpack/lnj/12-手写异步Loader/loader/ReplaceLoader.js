const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

module.exports = function (source) {
    // 1.获取webpack传递过来的参数
    let options = loaderUtils.getOptions(this);
    // 2.定制校验的规则
    let schema = {
        type: "object",
        // 可以在properties中告诉webpack, 当前loader可以传递哪些参数
        properties: {
            // 可以传递name参数
            name: {
                // name参数的数据类型必须是字符串类型
                type: "string"
            }
        },
        additionalProperties: false
    };
    // 3.利用校验方法校验传递过来的参数是否符合指定的规则
    validateOptions(schema, options, 'RepalceLoader');

    let callback = this.async();
    setTimeout(function () {
        source = source.replace(/it666/g, options.name);
        /*
        注意点: 如果loader中没有返回结果, 那么就会报错
        * */
        // return source;
        callback(null, source);
    }, 5000);
};