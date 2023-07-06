# Promise 边界情况

## [Promise规范]<https://promisesaplus.com/>

## Promise类设计

```js
class HYPromise {}
```

## 构造函数的规划

```js
class HYPromise {
    constructor(executor) {
        // 定义状态
        // 定义resolve, reject回调
        // resolve执行微任务队列: 改变状态, 获取value, then 传入执行成功回调
        // reject执行微任务队列: 改变状态, 获取reason, then 传入执行失败回调

        // try catch
        executor(resolve, reject)
    }
}
```

## then 方法的实现

```js
class HYPromise {
    then(onFulfilled, onRejected) {
        // this.onFulfilled = onFulfilled
        // this.onRejected = onRejected

        // 1. 判断onFulfilled, onRejected 会给默认值

        // 2. 返回Promise resolve/reject

        // 3. 判断之前的promsie状态是否确定
        // onFulfilled/onRejected直接执行 (捕获异常)

        // 4. 添加到数组中push(() => { 执行 onFulfilled/onRejected 直接执行代码 })
    }
}
```
