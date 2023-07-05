/**
 * any方法是ES12中新增的方法, 和 race 方法是类似的:
 * > any方法会等到一个fulfilled状态, 才会决定新Promise的状态
 * > 如果所有的Promise都是reject的, 那么也会等到所有的Promise都变成rejected状态
 */


const p1 = new Promise((resolve,reject) => {
    setTimeout(()=>{
        reject(11111)
    }, 1001)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(()=>{
        // resolve(22222)
        reject(22222)
    }, 500)
})
const p3 = new Promise((resolve,reject) => {
    setTimeout(()=>{
        reject(33333)
    }, 1000)
})


// any方法
Promise.any([p1, p2, p3]).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err.errors)
})