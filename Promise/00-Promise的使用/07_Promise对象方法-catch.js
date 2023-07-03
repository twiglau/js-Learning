

// const promise = new Promise((resolve, reject) => {
//     // resolve()
//     // reject("rejected status")
//     throw new Error("rejected status")
// })

// 1. 当executor抛出异常时, 也是会调用错误(拒绝)捕获的回调函数的
// promise.then(undefined, (err) => {
//     console.log("err: ", err.message)
// })

// 2. 通过catch方法来传入错误(拒绝)捕获的回调函数
// promise/a+规范
// promise.catch(err => {
//    console.log("err: ", err)
// })

// 有两个Promise: 1. promise  2. then 返回的 promise
// promise.then(res => {
//     return 11111
// }).catch(err => {
//     console.log("err: ", err)
// })


// 3. 拒绝捕获的问题(前面课程)
// promise.then(res => {}, err => {
//     console.log("err: ", err)
// })

// const promise = new Promise((resolve, reject) => {
//     reject("1111")
// })
// promise.then(res => {})
// promise.catch(err => {})

// 4. catch方法的返回值
const promise = new Promise((resolve, reject) => {
    reject("1111")
})
promise.then(res => {
    console.log("res: ", res)
}).catch(err => {
    console.log("err: ", err)
    return "catch return value"  // 返回一个Promise
}).then(res => {
    console.log("res result: ", res)
}).catch(err => {
    console.log("err result:", err)
})