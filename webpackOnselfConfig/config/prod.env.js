const common = require('./common.env.js')

// 生产环境的常量
module.exports = {
    ...common,
    PROD: 'i am PROD'
}