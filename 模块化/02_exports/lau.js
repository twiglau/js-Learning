const a_name = "lau"
const age = 18

function sum(num1, num2) {
    return num1 * num2
}

// 第二种导出方式
exports.name = a_name
exports.age = age
exports.sum = sum


// module.exports 和 exports 有什么区别?

// 源码是如何处理的?
// 1. module.exports = {}
// 2. exports = module.exports