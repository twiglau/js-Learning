
function* foo(t) {
    console.log("函数开始执行~")

    const value1 = 100
    try {
        yield value1
    } catch (error) {
        console.log("捕获到异常: ", error)
    }

    console.log("第二段代码继续执行~")
    const value2 = 200
    yield value2

    console.log("函数执行结束~")
}

const generator = foo()

console.log(generator.next())

console.log(generator.throw("error message"))


