
// 我们每个对象中都有一个 [[prototype]], 这个属性可以称之为为 对象的原型 (隐式原型: 不会改, 不会用)



var obj = { name: "why"} // [[prototype]]
var info = {} // [[prototype]]

// 1. 解释原型的概念, 和查看下原型
// 早期的ECMA是没有规范 如何去查看 [[prototype]] 对象 

// 给对象中提供了一个属性, 可以让我们查看一下这个原型对象(浏览器提供) - 这个是早期浏览器自己添加的, 存在一定的兼容性问题
// __proto__

console.log(obj.__proto__) // {}
console.log(obj.__proto__) // {}


// ES5 之后提供的
console.log(Object.getPrototypeOf(obj))



// 2. 原型有什么用呢?
// 当我们从一个对象中 获取某一个属性时, 它会触发 [[get]] 操作
// 2.1 在当前对象中去查找对应的属性, 如果找到就直接使用
// 2.2 如果没有找到, 那么会沿着它的原型链去查找 [[prototype]]
obj.__proto__.age = 18
console.log(obj.age)