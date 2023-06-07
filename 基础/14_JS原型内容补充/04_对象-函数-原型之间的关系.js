var obj = {
    name: 'obj'
}

console.log(obj.__proto__ === Object.prototype)

// 对象里面是有一个 __proto__ 对象: 隐式原型对象

// 1. Foo是一个函数, 那么它会有一个显式原型对象: Foo.prototype
// Foo.prototype 来自哪里?
// 答案: 创建了一个函数, Foo.prototype = { constructor: Foo }

// 2. Foo本身就是一个对象, 是由 new Function() 创建出来的: var Foo = new Function()
// 3. Foo是一个对象, 那么它会有一个隐式原型对象: Foo.__proto__
// Foo.__proto__ 来自哪里?
// 答案: new Function()   Foo.__proto__ = Function.prototype
// Function.prototype = { constructor: Function }
function Foo() {}

console.log(Foo.prototype === Foo.__proto__)
console.log(Foo.prototype.constructor)
console.log(Foo.__proto__.constructor)

console.log(Function.prototype === Function.__proto__)
