function foo() {
    
}

// 函数也是一个对象, 函数作为对象来说, 它也是有 [[prototype]] 隐式原型
console.log(foo.__proto__)


// 函数, 它因为是一个函数, 所以它还会多出来一个显式原型属性: prototype
console.log(foo.prototype)

/**
 * new 操作符
 * 1. 在内存中创建一个新的对象 (空对象);
 *    var moni = {}
      this = {}
 * 2. 这个对象内部的 [[prototype]] 属性 会被赋值为该构造函数的 prototype 属性;
      this.__proto__ = foo.prototype
 */

var f1 = new foo()
var f2 = new foo()

// new 操作符: 内部操作
f1.__proto__ === foo.prototype
f2.__proto__ === foo.prototype