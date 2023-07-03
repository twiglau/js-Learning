# 什么是 Promise?

* 我们来看下Promise的API是怎么样的?

* Promise是一个类, 可以翻译成 承诺, 许诺, 期约
* 当我们需要给予调用者一个承诺: 待会儿我会给你回调数据时, 就可以创建一个Promise的对象
* 在通过new创建Promise对象时, 我们需要传入一个回调函数, 我们称之为 executor

> 这个回调函数会被立即执行, 并且给传入另外两个回调函数 resolve, reject
> 当我们调用resolve回调函数时, 会执行Promise对象的then方法传入的回调函数
> 当我们调用reject回调函数时, 会执行Promise对象的catch方法传入的回调函数

## Promise 三个状态

* 待定(pending): 初始状态, 既没有被兑现, 也没有被拒绝

> 当执行 executor 中的代码时, 处于该状态

* 已兑现(fulfilled): 意味着操作成功完成

> 执行了 resolve 时, 处于该状态

* 已拒绝(rejected): 意味着操作失败;

> 执行了reject时, 处于该状态


## then方法 - 接受两个参数

* then方法是Promise对象上的一个方法: 它其实是放在Promise的原型上的 Promise.prototype.then

## [promise 规范]: <https://promisesaplus.com/>
