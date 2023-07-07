async function foo() {
    return "111"
}

// 异步函数的返回值 一定是 一个Promise
const promise = foo()
promise.then(res => {
    console.log(res)
})

