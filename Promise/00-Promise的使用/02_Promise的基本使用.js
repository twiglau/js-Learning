function foo() {
    // Promise
    return new Promise((resolve, reject) => {
        resolve()
    })
}

// main.js
const fooPromise = foo()
// then 方法传入的回调函数, 会在Promise执行resolve函数时, 被回调
// > 第一个回调函数, 会在Promise执行resolve函数时, 被回调
// > 第二个回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.then(()=> {

}, ()=> {

})
// catch 方法传入的回调函数, 会在Promsie执行reject函数时, 被回调
// fooPromise.catch(() => {

// })
class Person {
    constructor(callback) {
        let foo = function(){}
        let bar = function(){}
        callback(foo, bar)
    }
}

const p = new Person("lau", 18)

// 传入的这个函数, 被称之为 executor
// > resolve: 回调函数, 在成功时, 回调 resolve 函数
// > reject:  回调函数, 在失败时, 回调 reject  函数
const promise = new Promise((resolve, reject)=> {
    console.log("promise传入的函数被执行了")
    resolve
})

promise.then(() => {})
promise.catch(()=> {})


