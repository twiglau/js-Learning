
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'


class HYPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined
        this.onfulfilledFns = []
        this.onrejectedFns = []
        const resolve = (value) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                //宏任务
                //setTimeout(()=>{},0)

                // 微任务
                queueMicrotask(()=>{
                    if(this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_FULFILLED
                    this.value = value
                    this.onfulfilledFns.forEach(fn => fn(this.value))
                });
            }
        }
        const reject = (reason) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                // this.status = PROMISE_STATUS_REJECTED
                // this.reason = reason
                queueMicrotask(()=>{
                    if(this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason
                    this.onrejectedFns.forEach(fn => fn(this.value))
                })
            }
        }
        executor(resolve, reject)
    }

    then(onfulfilled, onrejected) {
        // 1. 如果在then调用的时候, 状态已经确定下来, 就直接执行
        if(this.status == PROMISE_STATUS_FULFILLED && onfulfilled) {
            onfulfilled(this.value)
        }
        if(this.status == PROMISE_STATUS_REJECTED && onrejected) {
            onrejected(this.reason)
        }
        // 2. 将成功回调和失败回调放到数组中
        if(this.status === PROMISE_STATUS_PENDING) {
            this.onfulfilledFns.push(onfulfilled)
            this.onrejectedFns.push(onrejected)
        }
    }

}

const promise = new HYPromise((resolve, reject) => {
    console.log("状态 pending")
    resolve(11111) // resolved fulfilled
    reject(22222)
})

// 1. 多次调用
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

// 2. 在确定Promsie状态后, 再次调用then
// 问题: 延迟1s, 再调用then回调, 是不会执行的
// 因为: 先延迟时, promise 中, 已经执行 resolve 回调  => queueMicrotask 先执行
setTimeout(()=> {
    promise.then(res => {
        console.log('res3: ', res)
    })
}, 1000)
