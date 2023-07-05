/**
 * 在ES11(ES2020)中, 添加了新的API Promise.allSettled:
 * > 该方法会在所有的Promise都有结果(settled), 无论是 fulfilled, 还是 reject时, 才会有最终的状态
 * > 并且这个Promise的结果一定是 fulfilled的
 */

const p1 = new Promise((resolve,reject) => {
    setTimeout(()=>{
        resolve(11111)
    }, 1000)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(()=>{
        // resolve(22222)
        reject(22222)
    }, 2000)
})
const p3 = new Promise((resolve,reject) => {
    setTimeout(()=>{
        resolve(33333)
    }, 3000)
})

Promise.allSettled([p1, p2, p3]).then(res => {
    console.log(res)
    // [
    //     { status: 'fulfilled', value: 11111 },
    //     { status: 'rejected', reason: 22222 },
    //     { status: 'fulfilled', value: 33333 } 
    // ]
}).catch(err => {
    console.log(err)
})