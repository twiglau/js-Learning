
// 验证
var obj = { name: "lau"}
console.log(obj.__proto__)
console.log(Object.prototype)
console.log(obj.__proto__ === Object.prototype)


console.log(Object)
console.log(Object.prototype) // 并不是空对象, 只是 是不可枚举的
console.log(Object.prototype.constructor)
console.log(Object.prototype.__proto__)

console.log(Object.getOwnPropertyDescriptors(Object.prototype))


var obj2 = {
    address: "北京市"
}
obj.prototype = obj2