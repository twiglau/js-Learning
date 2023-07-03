

/**
 * resolve(参数)
 * 1 > 普通的值或对象 : pending -> fulfilled
 * 2 > 传入一个Promise
 *     那么当前的Promise的状态会由传入的Promise来决定
 *     相当于状态进行了移交
 * 3 > 传入一个对象, 并且这个对象有实现 then 方法 (并且这个对象是实现了thenable的)
 *     那么也会执行该then方法, 并且由该then方法决定后续状态
 */


// 1. 传入Promise的特殊情况
// const newPromise = new Promise((resolve, reject) => {
//     console.log("---- 立即执行 ----")
// })
// new Promise((resolve, reject) => {
//     resolve(newPromise)
// }).then(res => {
//     console.log("res: ", res)           
// }, err => {
//     console.log("err: ", err)          
// })


// 2. 传入对象, 这个对象有then方法
new Promise((resolve, reject) => {
    const obj = {
        then: function(resolve, reject) {
            // resolve("resolve message")
            reject("reject message")
        }
    }
    resolve(obj)
}).then(res => {
    console.log("res: ", res)           
}, err => {
    console.log("err: ", err)          
})