

// Promise有哪些对象方法
// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))


const promise = new Promise((resolve, reject) => {
    resolve("哈哈哈")
})

// 1. 同一个Promise可以被多次调用 then 方法
// 当我们的 resolve 方法被回调时, 所有的then方法传入的回调函数都会被调用
// promise.then((res) => {
//     console.log("res1: ", res)
// })

// promise.then((res) => {
//     console.log("res2: ", res)
// })


// 2. then方法传入的 "回调函数": 可以有返回值
// then方法本身也是有返回值得, 它的返回值是 Promise
// 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值会被作为一个新的Promise的resolve值
promise.then(res => {
    return "aaa"  // 相当于 return new Promise((resolve) => resolve("aaa"))
}).then(res => {  // 这个then, 对应的 return 的 新的Promise的then
    console.log("new res1:", res)
    return "bbb"
})
// 2> 如果我们返回的是一个Promise
promise.then(res => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1111)
        }, 3000)
    })
}).then(res => {
    console.log("new res2:", res)
})
// 3> 如果返回的是一个对象, 并且该对象实现了 thenable
promise.then(res => {
    return {
        then: function(resolve, reject) {
            resolve(2222)
        }
    }
}).then(res => {
    console.log("new res3:", res)
})