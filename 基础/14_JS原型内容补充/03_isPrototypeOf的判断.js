
//2. isPrototypeOf
// 用于检测某个对象, 是否出现在 某个实例对象的原型链上

function Person() {

}

var p = new Person()

console.log(p instanceof Person)
console.log(Person.prototype.isPrototypeOf(p))

var obj = { name: "why", age: 18}

var info = Object.create(obj)

// console.log(info instanceof obj)
// 对象obj, 是否出现在 info 对象的原型链上
console.log(obj.isPrototypeOf(info))