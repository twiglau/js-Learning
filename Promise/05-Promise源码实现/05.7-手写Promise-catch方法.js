
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
        // then 支持链式调用, 直接返回Promise
        return new HYPromise((resolve, reject) => {
            
            // executor 在then调用时, 直接执行一次
            // 下一次执行时(链式调用), 使用 execFunctionWithCatchError 里面状态的返回值 执行
            // 1. 如果在then调用的时候, 状态已经确定下来, 就直接执行
            if(this.status == PROMISE_STATUS_FULFILLED && onfulfilled) {
                execFunctionWithCatchError(onfulfilled, this.value, resolve, reject)
            }
            if(this.status == PROMISE_STATUS_REJECTED && onrejected) {
                execFunctionWithCatchError(onrejected, this.reason, resolve, reject)
            }
            // 2. 将成功回调和失败回调放到数组中
            if(this.status === PROMISE_STATUS_PENDING) {
                if(onfulfilled) this.onfulfilledFns.push(()=>{
                    execFunctionWithCatchError(onfulfilled, this.value, resolve, reject)
                })
                if(onrejected) this.onrejectedFns.push(()=> {
                    execFunctionWithCatchError(onrejected, this.reason, resolve, reject)
                })
            }
        })
    }

    catch(onrejected) {
        this.then(undefined, onrejected)
    }
}

const promise = new HYPromise((resolve, reject) => {
    console.log("状态 pending")
    reject(22222)
    // throw new Error("executor error message")
})

// promise.then(res => {
//     console.log("res: ", res)
// }, err => console.log('err: ', err)).catch(err => {
//     console.log('err1: ', err)
// })


promise.then(res => {
    console.log("res: ", res)
}).catch(err => {
    console.log('err1: ', err)
})