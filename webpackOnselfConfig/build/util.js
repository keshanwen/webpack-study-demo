const isProduction = process.env.NODE_ENV !== 'development' // 是否是生产环境

const getHtmlTiltle = () => {
    return isProduction ? 'production' : 'development'
}

module.exports = {
    isProduction,
    getHtmlTiltle
}