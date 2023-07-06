
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
    try {
        const result = execFn(value)
        resolve(result)
    } catch (err) {
        reject(err)
    }
}

class HYPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined
        this.onfulfilledFns = []
        this.onrejectedFns = []
        const resolve = (value) => {
            if(this.status === PROMISE_STATUS_PENDING) {
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
                queueMicrotask(()=>{
                    if(this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason
                    this.onrejectedFns.forEach(fn => fn(this.value))
                })
            }
        }
        // 捕获 executor 函数 异常, 放入 reject 里面
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onfulfilled, onrejected) {
        // 如果没有定义 onrejected, 需要有个默认的, 并且直接 throw , 让 链式调用的下个Promise then 捕获到
        const defaultOnRejected = err => { console.log('defaultOnRejected:', err); throw err }
        onrejected = onrejected || defaultOnRejected

        const defaultOnFulfilled = value => { return value }
        onfulfilled = onfulfilled || defaultOnFulfilled
        // then 支持链式调用, 直接返回Promise
        return new HYPromise((resolve, reject) => {
            
            // executor 在then调用时, 直接执行一次
            // 下一次执行时(链式调用), 使用 execFunctionWithCatchError 里面状态的返回值 执行
            // 1. 如果在then调用的时候, 状态已经确定下来, 就直接执行
            if(this.status == PROMISE_STATUS_FULFILLED) {
                execFunctionWithCatchError(onfulfilled, this.value, resolve, reject)
            }
            if(this.status == PROMISE_STATUS_REJECTED) {
                execFunctionWithCatchError(onrejected, this.reason, resolve, reject)
            }
            // 2. 将成功回调和失败回调放到数组中 
            if(this.status === PROMISE_STATUS_PENDING) {
                this.onfulfilledFns.push(()=>{
                    execFunctionWithCatchError(onfulfilled, this.value, resolve, reject)
                })
                this.onrejectedFns.push(()=> {
                    execFunctionWithCatchError(onrejected, this.reason, resolve, reject)
                })
            }
        })
    }

    catch(onrejected) {
        return this.then(undefined, onrejected)
    }

    finally(onfinally) {
        this.then(() => {
            onfinally()
        }, ()=> {
            onfinally()
        })
    }

    static resolve(value) {
        return new HYPromise((resolve) => resolve(value))
    }
    static reject(reason) {
        return new HYPromise((resolve, reject) => reject(reason))
    }
    static all(promises) {
        // 问题关键: 什么时候要执行 resolve, 什么时候要执行 reject
        return new HYPromise((resolve, reject) => {
            const values = []
            promises.forEach(promise => {
                promise.then(res => {
                    values.push(res)
                    if(values.length == promises.length) {
                        resolve(values)
                    }
                }, err => {
                    reject(err)
                })
            })
        })
    }

    static allSettled(promises) {
        return new HYPromise((resolve) => {
            const values = []
            promises.forEach(promise => {
                promise.then(res => {
                    values.push({value: res, status: PROMISE_STATUS_FULFILLED})
                    if(values.length == promises.length) {
                        resolve(values)
                    }
                }, err => {
                    values.push({value: err, status: PROMISE_STATUS_REJECTED})
                    if(values.length == promises.length) {
                        resolve(values)
                    }
                })
            })
        })
    }


}

const p1 = new HYPromise((resolve,reject) => {
    setTimeout(()=> { resolve(1) }, 1000)
})
const p2 = new HYPromise((resolve,reject) => {
    setTimeout(()=> { resolve(2) }, 2000)
})
const p3 = new HYPromise((resolve,reject) => {
    setTimeout(()=> { resolve(3) }, 3000)
})

// HYPromise.all([p1, p2, p3]).then(res => {
//     console.log('all: ', res)
// }).catch(err => {
//     console.log('err: ', err)
// })

HYPromise.allSettled([p1, p2, p3]).then(res => {
    console.log('all: ', res)
}).catch(err => {
    console.log('err: ', err)
})

