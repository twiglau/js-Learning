function foo() {

}

// foo.prototype 这个对象中 有一个 constructor属性

// 1. enumerable 为 false, 所以为 空
console.log(foo.prototype) 
// 1.1 prototype.constructor == 构造函数本身
console.log(foo.prototype.constructor) 
console.log(foo.prototype.constructor.name) 
console.log(foo.prototype.constructor.prototype.constructor)
// 1.2 验证
console.log(Object.getOwnPropertyDescriptors(foo.prototype))
// 1.3 修改
Object.defineProperty(foo.prototype, "constructor", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "呵呵"
})
// 1.4. 打印
console.log(foo.prototype)


// 2 我们也可以添加自己的属性
foo.prototype.name = "why"
foo.prototype.age = 18
foo.prototype.eating = function() {}
console.log(foo.prototype)

var f1 = new foo()
console.log(f1.name, f1.age)

// 3 直接修改整个 prototype 对象
foo.prototype = {
    constructor: foo,
    name: "why",
    age: 18,
    height:1.88
}

var f2 = new foo()
console.log(f2.name, f2.age, f2.height)


// 3.1 真实开发中, 我们可以通过 Object.defineProperty 方式 添加 constructor
Object.defineProperty(foo.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: foo
})

