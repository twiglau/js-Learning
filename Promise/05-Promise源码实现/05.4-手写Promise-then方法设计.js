
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'


class HYPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined
        const resolve = (value) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                //宏任务
                //setTimeout(()=>{},0)
                this.status = PROMISE_STATUS_FULFILLED
                queueMicrotask(()=>{
                    this.value = value
                    console.log("resolve被调用~")
                    // 执行then传入进来的第一个回调函数
                    this.onfulfilled(this.value)
                });
            }
        }
        const reject = (reason) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_REJECTED
                queueMicrotask(()=>{
                    this.reason = reason
                    console.log("reject被调用~")
                    // 执行then传入进来的第二个回调函数
                    this.onrejected(this.reason)
                })
            }
        }
        executor(resolve, reject)
    }

    then(onfulfilled, onrejected) {
        // 这里获取 onfulfilled
        this.onfulfilled = onfulfilled
        this.onrejected = onrejected
    }

}

const promise = new HYPromise((resolve, reject) => {
    console.log("状态 pending")
    resolve(11111)
    reject(22222)
})

// 1. 不能多次调用
promise.then(res => {
    console.log('res1: ', res)
}, err => {
    console.log('err1: ', err)
})

promise.then(res => {
    console.log('res2: ', res)
}, err => {
    console.log('err2: ', err)
})

// 2. 没有链式调用
promise.then(res => {
    console.log('res3: ', res)
    return "res3 1111"
}, err => {
    console.log('err3: ', err)
}).then(res => {
    console.log('res4: ', res)
}, err => {
    console.log('err4: ', err)
})