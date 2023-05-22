Function.prototype.hyapply = function(thisArg, argArray) {
    // 1.获取到要执行的函数
    var fn = this

    // 2.处理绑定的thisArg
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

    // 3.执行函数
    thisArg.fn = fn //添加属性
    var result
    // if(!argArray) { // argArray 是没有值(没有传参)
    //    result = thisArg.fn()
    // }else{
    //    result = thisArg.fn(...argArray)
    // }
    argArray = argArray ?? []
    result = thisArg.fn(...argArray)
    delete thisArg.fn

    // 4.返回结果
    return result
}
function koa() {
    console.log('koa log')
}
function foo(num) {
    return num
}
function sum(num1, num2) {
    console.log("sum被调用:", this, num1, num2)
    return num1 + num2
}
function bar() {
    console.log("bar函数被执行")
}
// 系统调用
// var result1 = sum.apply("abc", [20, 30])
// console.log(result1)

// 自己实现的调用
var result2 = sum.hyapply("abc", [20, 30])

var result3 = foo.hyapply("cba", [20])

koa.hyapply("nba")
koa.hyapply(0)
