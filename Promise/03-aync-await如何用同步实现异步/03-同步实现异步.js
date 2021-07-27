/**
 * 问题: Async/await 如何通过同步的方式实现异步?
 */

/**
 * 1. 概括的说
 * 一个函数如果加上 async, 那么该函数就会返回一个 Promise.
 * await 只能在 async 函数中使用,可以把 async 看成将函数返回值使用 Promise.resolve()包裹了
 * 下.
 * 
 * async 和 await 相比直接使用Promise来说, 优势在于处理 then 的调用链,能过更清晰准确的写出代码.
 * 缺点在于滥用 await 可能会导致性能问题, 因为 await 会阻塞代码, 也许之后的异步代码并不依赖于前者,
 * 但仍然需要等待前者完成,导致带啊失去了并发性.
 */

//实例:
async function test(){
    return "1";
}
console.log(test());
// -> Promise {<resolved>: "1"}

//实例2:
function sleep(){
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('finish')
            resolve("sleep")
        },2000);
    });
}
async function test1(){
    let value = await sleep();
    console.log(value);
    console.log("Object");
}
test1()
//上面代码会先打印 finish 然后在打印 object, 因为await会等待sleep函数resolve,所以即使后面是同步代码,
//也不会先去执行同步代码再来执行异步代码.


/**
 * 2. 两点回答
 * js 是单线程的
 */
function test2(){
    let d = Date.now()
    for(let i = 0; i < 1e8; i++){}
    console.log(Date.now() - d); //62ms左右
}
function test3(){
    let d = Date.now()
    console.log(Date.now() - d); // 0
}
test2()
test3()

/**
 * 上面仅仅是一个for循环,而在实际应用中,会有大量的网络请求,它的响应是不确定的,这个情况下也要等待吗?
 * 
 * 显然是不行的,因而js设计了异步,即发起网络请求(诸如 IO 操作,定时器),由于需要等服务器响应,就先不理会,而是
 * 去做其他的事情,等请求返回了结果的时候再说.
 * 
 * 那么如何实现异步?
 * callback, 实现异步的核心就是回调钩子,将cb 作为参数传递给异步执行函数,当有了结果后再触发cb.
 * --> Event-loop 机制
 * 
 * 之前这种函数嵌套,大量的回调函数,使代码阅读起来晦涩难懂,不直观,形象的称之为 回调地狱(callback hell),
 * 所以为了在写法上能更通俗一点, ES6+ 陆续出现了 Promise, Generator, Async/await, 力求在写法上简介
 * 明了,可读性强.
 * 
 * async/await 是参照 Generator 封装的一套异步处理方案,可以理解为 Generator 的语法糖.
 * 而 Generator 又依赖于迭代器 Iterator.
 * 
 * 概念: 单向链表
 * 可以看到, async function 代替了 function*, await 代替了 yield, 同时也无需自己手动写一个自动
 * 执行器 run 了
 * 
 * async/await 特点:
 * > 当await 后面跟的是Promise对象时, 才会异步执行, 其他类型的数据会同步执行
 * > 返回的仍然是个Promise对象,上面代码中的 return 'done'; 会直接被下面 then 函数接收到
 */


/**
 * 3. 进阶回答
 * async/await 是参照 Generator 封装的一套异步处理方案,可以理解为 Generator 的语法糖.
 * async/await --> Generator,
 * Generator   --> Iterator,
 * Iterator 思想来源于 单向链表
 */

/**
 * 3.1 什么是单向链表?
 * 是一种线性表,但是并不会按现行的顺序储存数据,而是在每一个节点存到下一个节点的指针(Pointer).
 * 由于不必须按顺序储存,链表在插入的时候可以达到 o(1) 的复杂度,比另一种线性顺序快得多,但是查
 * 找一个节点或者访问特定编号则需要 o(n) 的时间,而顺序表响应的时间复杂度分别是 o(logn) 和 o(1).
 * 
 * 链表优点:
 * > 无须预先分配内存
 * > 插入/删除节点不影响其他节点,效率高(典型例子: git commit)
 * 
 * 单向链表: 是链表中最简单的一种,它包含两个域, 一个信息域 和 一个指针域. 这个链接指向列表中
 * 的下一个节点,而最后一个节点则指向一个空值.
 * 
 * 如图 03.1
 * 
 * 一个单向链表包含两个值: 当前节点的值 和 一个指向下一个节点的链接
 * 单链特点: 节点的链接方向是单向的: 相对于数组来说, 单链表的随机访问速度较慢,但是单链表删除/添加数据的效率跟高.
 * 
 * 理解 js 原型链/作用域链的话, 理解这个很容易,它们是相通的
 */

/**
 * 3.2 Iterator
 * 迭代器(遍历器), 它的遍历过程(类似于单向链表):
 * > 创建一个指针对象, 指向当前数据结果的起始位置;
 * > 第一次调用指针对象的 next 方法, 将指针指向数据结构的第一个成员
 * > 第二次调用指针对象的 next 方法, 将指针指向数据结构的第二个成员
 * > 不断的调用指针对象的 next 方法, 直到它指向数据结构的结束位置
 * 
 * 一个对象要变成可迭代的, 必须实现 iterator 方法, 即对象(或它原型链上的某个对象) 必须有一个名字是
 * Symbol.iterator 的属性(原生具有该属性的有: 字符串, 数组, 类数组的对象, Set 和 Map);
 * 
 * 当一个对象需要被迭代的时候(比如开始用于一个for...of循环中), 它的 iterator方法被调用并且无参数,然后
 * 返回一个用于在迭代中获得值的迭代器
 */

/**
 * 3.3 Generator
 * Generator: 生成器对象是生成器函数(GeneratorFunction)返回的,它符合可迭代协议和迭代器协议,
 * 即是迭代器也是可迭代对象,可以调用 next 方法, 但它不是函数,更不是 构造函数.
 * 
 * 调用一个生成器函数并不会马上执行它里面的语句,而是返回一个这个生成器的迭代器对象, 当这个迭代器的 next()
 * 方法被首次(后续)调用时, 其内的语句会执行到第一个(后续) 出现 yield 的位置位置(让执行处于暂停状),
 * yield 后紧跟迭代器要返回的值. 或者如果yoga的是 yield* (多了个星号),则表示将执行权移交给另一个生成器函数
 * (当前生成器暂停执行),调用 next() (再启动) 方法时, 如果传入了参数, 那么这个参数会作为上一条执行的 yield 语句
 * 的返回值.
 * 
 * Generator 的本质:
 * 它会让程序执行到指定位置先暂停(yield), 然后再启动 (next), 在暂停(yield), 再启动(next), 而这个暂停就很容易让它
 * 和异步操作产生联系, 因为我们在处理异步是:
 * 开始异步处理(网络请求,IO操作), 然后暂停一下, 等处理完了, 再进行下一步操作.
 * 
 * 不过值得注意的是, js 是单线程的, 异步还是异步, callback 还是 callback, 不会因为 Generator 而有任何改变.
 */

/**
 * 3.4 Async/Await
 * async/await 是 Generator 的语法糖, 就是一个自执行的 generator 函数, 利用 generate 函数的特性把异步代码
 * 写成 "同步" 的形式
 */