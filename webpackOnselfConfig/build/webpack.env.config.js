const { isProduction } = require('./util.js')

// 获取环境变量
const env = isProduction ? 'prod' : 'dev'

// require指定的环境配置文件
const envConfigFile = '../config/' + env + '.env.js'

// 将require的配置文件原封不动export回出去
module.exports = require(envConfigFile)

