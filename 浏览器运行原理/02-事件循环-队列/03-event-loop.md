
## 1. 理论 关于MacroTask 和 MicroTask
一张图展示JavaScript中的事件循环:

如图: 03.1
一次事件循环: 先运行macroTask队列中的一个,然后运行microtask队列中的所有任务.
接着开始下一次循环(只是针对macroTask和microtask,一次完整的事件循环会比这个复杂的多)

其中macroTask 和 microTask 是两种任务队列,相比而言,大家更熟悉的一个词是任务队列
(task queue,其实就是macrotask),大家更熟悉的关于事件的机制说法大概是:
> 主进程执行完之后,每次从任务队列里取一个任务执行. 但是promise出现之后,这个说法就
  不太准确了.

JavaScript引擎对这两种队列有不同的处理,简单的说就是引擎会把我们的所有任务分门别类,一部分
归为macrotask,另外一部分归为microtask,下面是类别划分:

macroTask: setTimeout, setInterval, setImmediate, requestAnimationFrame,I/O,UI rendering
microTask: process.nextTick,Promise,Object.observe,MutationObserver

我们所熟悉的定时器就属于macroTask,但是仅仅了解macroTask的机制还是不够的.
上面这些都是理论,怎么直观的感受两种队列的区别呢?



## 2. 实践.
我们以setTimeout,process.nextTick,promise为例直观感受下两种任务队列的运行方法.
```js
console.log('main1');
process.nextTick(function(){
    console.log('process.nextTick1');
});

setTimeout(function() {
    console.log('setTimeout');
    process.nextTick(function() {
        console.log('process.nextTick2');
    });
},0);

new Promise(function(resolve,reject) {
    console.log('promise');
    resolve();
}).then(function() {
    console.log('promise then');
});
console.log('main2');
```

最终结果是这样的:
main1
promise
main2
process.nextTick1
promise then
setTimeout
process.nextTick2

## 解释:
process.nextTick 和 promise then 在 setTimeout 前面输出,已经证明了 macroTask 和 microTask 的执行顺序.
但是有一点必须要指出的是. 上面的图容易给人一个错觉,就是主进程的代码执行之后,会先调用macroTask,在调用microTask,
这样在第一个循环里一定是macroTask在前,microTask在后.

但是最终的实践证明: 在第一个循环里, process.nextTick1 和 promise then 这两个 microTask 是在setTimeout 这
个macroTask里之前输出的,这是问什么呢?

因为主线程的代码也属于macroTask(这一点我比较以后的是 主进程都是一些同步代码,而 macroTask 和 microTask 包含的
都是一些异步任务,为啥主进程的代码会被划分为macroTask,不过从实践来看确实是这样,而且也有理论支撑:
Promises/A+规范)

主进程这个macroTask(也就是main1, promise 和 main2) 执行完了, 自然会去执行 process.nextTick1 和 promise then
这两个 microTask. 这是第一个循环, 之后的 setTimeout 和 process.nextTick2 属于第二个循环.

requestAnimationFrame, Object.observe(已废弃) 和 MutationObserver 这三个任务的运行机制大家可以从上面看到,不同
的知识具体用法不同. 重点说下 UI rendering. 在HTML规范: event-loop-processing-model 里叙述了一次事件循环的处理过
程,在处理了macroTask 和 microTask 之后, 会进行一次 Update the rendering, 其中细节比较多,总的来说会进行一次UI的重
新渲染.

