var obj = {
    name: "lau",
    age: 18
}

// 触发: [[get]]操作
// 1. 在当前的对象中查找属性
// 2. 如果没有找到, 这个时候回去原型链(__proto__)对象去查找

obj.__proto__ = {}

// 原型链
obj.__proto__.__proto__ = {
    // address: "广州市"
}
obj.__proto__.__proto__.__proto__ = {
    address: "常德市"
}
console.log(obj.address)