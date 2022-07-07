function add(a, b) {
    console.log(a, b)
    return a + b
}
function count(num) {
    console.log(num)
    return num++
}
export default {
    add,
    count
}


Array.prototype.side = function () {
    console.log('这是一段有副作用的代码')
}
