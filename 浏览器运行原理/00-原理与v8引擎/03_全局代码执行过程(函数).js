var name = "why"

foo(123)
function foo(num) {
    console.log(m)
    var m = 10
    var n = 20
    console.log(name)
}

/**
 * 1. 代码被解析 [源码 -> Parse -> AST], v8 引擎内部会帮助我们创建一个对象(GlobalObject = go)
 * 
 *    js引擎会在执行代码之前, 会在堆内存中创建一个全局对象: Global Object (GO)
 *    > 该对象 所有的作用域 (scope) 都可以访问;
 *    > 里面会包含 Date, Array, String, Number, setTimeout, setInterval 等;
 *    > 其中还有一个 window 属性 指向自己;
 */

// var globalObject = {
//     String: "类",
//     Date: "类",
//     setTimeout: "函数",
//     window: globalObject
//     name: undefined,
//     num1: undefined,
//     num2: undefined,
//     result: undefined
// }

/**
 * 2. 运行代码
 *    2.1  v8为了执行代码, v8引擎内部会有一个执行上下文栈(Execution Context Stack, ECStack)(函数调用栈)
 *    2.2 因为我们执行的是全局代码, 为了全局代码能够正常的执行, 需要创建 全局执行上下文(Global Execution Context)
 */


var GlobalObject = {
    String: "类",
    window: GlobalObject,
    name: undefined,
    foo: 
}