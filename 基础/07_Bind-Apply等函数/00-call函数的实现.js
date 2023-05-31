// 给所有的函数添加一个hyCall的方法
Function.prototype.hycall = function(thisArg, ...args) {
    // 在这里可以去执行调用的那个函数(foo)
    // 问题: 需要可以获取到是哪一个函数, 执行了 hycall
    // 1. 获取需要被执行的函数
    var fn = this

    // 调用需要被执行的函数
    // 如果 thisArg 是 数字,字符串. 来添加属性 fn ,是加不了的
    // 2. 对thisArg转成对象对象类型(防止它传入的是非对象类型)
    thisArg = thisArg ? Object(thisArg) : window

    // 3. 调用需要被执行的函数
    thisArg.fn = fn 
    var result = thisArg.fn(...args)  // 展开运算符
    delete thisArg.fn    //多出来一个属性

    // 4. 将最终的结果返回出去
    return result
}

function foo() {
    console.log("foo函数被执行", this);
}
function sum(num1, num2) {
    console.log("sum函数被执行", this)
    return num1 + num2
}

// 系统的函数的call方法
// foo.call()

// 自己实现的函数的hycall方法
// 默认进行隐式绑定
foo.hycall({name:"why"}) //  多出来一个属性
foo.hycall(123) // 如果数字类型调用,会发生什么  
foo.hycall(null) // 如果传入 Null undefined
var res = sum.hycall({}, 20, 30) // 如果有额外的参数,并且有返回值呢
console.log(res)