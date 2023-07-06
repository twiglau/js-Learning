// 1. 返回值 undefined
async function foo1() {
    console.log("foo1 start")

    console.log("中间代码")

    console.log("foo1 end")
}

const promise1 = foo1()
promise1.then(res => {
    console.log("promise1 then exec: ", res)
})

// 2. 有返回值
async function foo2() {
    return "111"
}

// 异步函数的返回值 一定是 一个Promise
const promise2 = foo2()
promise2.then(res => {
    console.log("promise2 then exec:", res)
})

// 3. 返回的是一个 thenable 对象
async function foo3() {
    return {
        then: function (resolve, reject) {
            resolve("thenable")
        }
    }
}
const promise3 = foo3()
promise3.then(res => {
    console.log("promise3 then exec: ", res)
})

// 4. 返回的是一个 Promise
async function foo4() {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve("promise") }, 2000)
    })
}
const promise4 = foo4()
promise4.then(res => {
    console.log("promise4 then exec: ", res)
})