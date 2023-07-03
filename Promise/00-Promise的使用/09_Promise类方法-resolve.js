

// 需求: 转成Promise对象

// 1 类方法Promise.resolve
const promise = Promise.resolve({ name: "lau"})
// 相当于
const promise2 = new Promise((resolve, reject) => {
    resolve({ name: "lau"})
})

promise.then(res => {
    console.log("res: ", res)
})


// 2 传入Promise
const promise3 = Promise.resolve(new Promise((resolve, reject) => {
    resolve("11111")
}))

promise3.then(res => {
    console.log("res: ", res)
})
