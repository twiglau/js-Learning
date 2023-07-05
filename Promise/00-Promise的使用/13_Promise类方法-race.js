const p1 = new Promise((resolve,reject) => {
    setTimeout(()=>{
        resolve(11111)
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
        resolve(33333)
    }, 1000)
})

// race: 竞技/竞赛
// 只要有一个promise变成fulfilled状态, 那么就会结束
// 意外: 在等结果之前, 有个promise rejected 了, 那么就会 catch 到该 rejected
Promise.race([p1, p2, p3]).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})