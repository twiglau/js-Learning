
function* foo(t) {
    console.log("函数开始执行~")
    const value1 = 100 * t
    console.log("第一段代码:",value1)
    const n = yield value1

    const value2 = 200 * n
    console.log("第二段代码:",value2)
    const m = yield value2

    const value3 = 300 * m
    console.log("第三段代码:",value3)
    yield value3

    console.log("函数执行结束~")
    return 400
}


// 生成器上的 next方法 可以传递参数
const generator = foo(5)
console.log(generator.next())
// 第二段代码, 应该是第二次调用next的时候执行的
// 接收这个 10 的参数的是, 第一次 yield 的返回值, 用来接收这个参数
console.log(generator.next(10))
console.log(generator.next(25))

