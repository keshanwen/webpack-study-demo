const name = "why";
const age = 18;
const height = 1.88;



// 导出方式一
module.exports = {
    name,
    age,
    height
}


/*

exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出

*/ 
// 导出方式二
// exports.name = name
// exports.age = age
// exports.height = height

