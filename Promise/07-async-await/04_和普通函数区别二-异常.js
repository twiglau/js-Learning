
async function foo1() {
    console.log("foo1 start")

    console.log("中间代码")
    // 异步函数抛出的异常, 会被作为异步函数的返回值的Promise的 reject 的值的, 被catch捕获到
    throw new Error("error message")

    console.log("foo1 end")
}
// 异步函数的返回值一定是 一个Promise
// foo1()   throw new Error("error message")
foo1().catch(err => {
    console.log("捕获到异常: ", err)
})

console.log("后续还有代码~")