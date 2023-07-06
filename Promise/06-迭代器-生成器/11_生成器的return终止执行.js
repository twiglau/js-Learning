
function* foo(t) {
    console.log("函数开始执行~")
    const value1 = 100 * t
    console.log("第一段代码:",value1)
    const n = yield value1

    // return n
    const value2 = 200 * n
    console.log("第二段代码:",value2)
    const m = yield value2

    const value3 = 300 * m
    console.log("第三段代码:",value3)
    yield value3

    console.log("函数执行结束~")
    return 400
}

const generator = foo(5)

console.log(generator.next())

// 第二次调用 next第二段代码的执行
// 但是如果 调用 .return(15)
// 相当于在第二段代码顶部增加代码: return 15, 就会提前终止生成器函数代码继续执行
// 第二段代码就不会执行了
// 而且这样做之后,以后再调用next,就不会再执行了
// 相当于提前把代码终止掉了
console.log(generator.return(15))

