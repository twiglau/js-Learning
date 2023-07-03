
// 注意: Promise状态一旦确定下来, 那么就是不可更改的(锁定)
new Promise((resolve, reject) => {
    // 阶段: pending
    console.log("---- 立即执行 ----")
    resolve()      // 阶段: fulfilled (固定, 已敲定)                       
    // reject()    // 阶段: rejected
}).then(res => {
    console.log("res: ", res)           
}, err => {
    console.log("err: ", err)          
})