function Persion() {}

var p1 = new Persion()
var p2 = new Persion()

// 1. 将name放到p1对象上
// p1.name = "why"

// 2 将name放到Persion函数的原型对象上
// p1.__proto__.name = "kobe"

// 3 将name放到Persion函数的原型对象上: 方式二
Persion.prototype.name = 'miky'
// 目的: 输出 name
console.log(p1.name)
console.log(p2.name)