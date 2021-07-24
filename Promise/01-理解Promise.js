/**
 * 一, 什么是Promise
 * > ES6 异步编程的一种解决方案,比传统的方案(回调函数和事件)更加的
 *   合理和强大
 * > 好处 异步操作以同步操作的流程表达出来,避免了层层嵌套的回调函数
 * > promise 可以解决异步的问题,本身不能说promise是异步的
 */

/**
 * 二, Promise 特点
 * > 对象的状态不收外界影响. Promise 对象代表一个异步操作,有三种状态:
 *   pending(进行中), resolved(已成功) 和 rejected(已失败)
 * > 一旦状态改变,就不会再变, 任何时候都可以得到这个结果. Promise 对象的装填改变,
 *   只有两种可能: 从pending 变为 resolved 和从 pending 变为 rejected
 * > promise内部发生错误,不会影响到外部程序的执行
 * > 无法取消Promise,一旦新建它就会立即执行,无法从中途取消.其次,如果不设置回调函数,
 *   promise 内部抛出的错误,不会反应到外部. 第三, 当处于 pending 状态是,无法得知
 *   目前进展到哪个阶段(刚刚开始还是即将完成)
 */

/**
 * 三, 用法
 */
// 1. 基础用法
//创造Promise实例,必须传入一个函数作为参数
new Promise(() =>{});
// new Promise(); //报错 Uncaught TypeError: Promise resolver undefined is not a function
//    at new Promise (<anonymous>)

