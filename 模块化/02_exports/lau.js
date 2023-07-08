const a_name = "lau"
const age = 18

function sum(num1, num2) {
    return num1 * num2
}



// module.exports 和 exports 有什么区别?

// 源码是如何处理的?
// 1. module.exports = {}
// 2. exports = module.exports

// 第二种导出方式, 相当于往 module.exports 对象上添加属性
exports.name = a_name
exports.age = age
exports.sum = sum

// 第三种 是不对的, 最终导出的是一定是 module.exports = {} 
// 只有 module.exports 对象里面有属性了, exports 里面才有属性对象
// 以下写法, module.exports 对象并没有三种属性
// exports = {
//     name,age,sum
// }

