
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
        // then 支持链式调用, 直接返回Promise
        return new HYPromise((resolve, reject) => {
            
            console.log('zhixingggggg11111aaaaaaaa')
            // executor 在then调用时, 直接执行一次
            // 下一次执行时(链式调用), 使用 execFunctionWithCatchError 里面状态的返回值 执行
            // 1. 如果在then调用的时候, 状态已经确定下来, 就直接执行
            // 两个if语句,保证异步调用 then/catch时, status状态已经改变,可以直接调用
            if(this.status == PROMISE_STATUS_FULFILLED && onfulfilled) {
                execFunctionWithCatchError(onfulfilled, this.value, resolve, reject)
            }
            if(this.status == PROMISE_STATUS_REJECTED && onrejected) {
                execFunctionWithCatchError(onrejected, this.reason, resolve, reject)
            }
            // 2. 将成功回调和失败回调放到数组中
            if(this.status === PROMISE_STATUS_PENDING) {
                console.log('zhixingggggg11111')
                // 数组 - 支持多次调用
                // push: 匿名函数 保证链式调用拿到 上次调用的返回值
                this.onfulfilledFns.push(()=>{
                    console.log('zhixingggggg')
                    execFunctionWithCatchError(onfulfilled, this.value, resolve, reject)
                })
                this.onrejectedFns.push(()=> {
                    execFunctionWithCatchError(onrejected, this.reason, resolve, reject)
                })
            }
        })
    }
}

const promise = new HYPromise((resolve, reject) => {
    console.log("状态 pending")
    resolve(11111) // resolved fulfilled
    // reject(22222)
    // throw new Error("executor error message")
})

// 没有链式调用
promise.then(res => {
    console.log('res3: ', res)
    return "res3 1111"
    // throw new Error("err message")
}, err => {
    console.log('err3: ', err)
    // return "res3 2222"
    throw new Error("err message")
}).then(res => {
    console.log('res4: ', res)
}, err => {
    console.log('err4: ', err)
})