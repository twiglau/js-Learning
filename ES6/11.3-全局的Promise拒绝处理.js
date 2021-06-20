/**
 * 1.Node.js的拒绝处理
 * 在Node.js中, process 对象上存在两个关联到 Promise 的拒绝处理的事件:
 * > unhandledRejection: 当一个Promise被拒绝,而在事件循环的一个轮次中没有任何拒绝处理函数
 *   被调用,该事件就会被触发;
 * > rejectionHandled: 若一个Promise被拒绝,并在事件循环的一个轮次之后再有拒绝处理函数被调用,
 *   该事件就会被触发.
 * 
 * 这两个事件旨在共同帮助识别已被拒绝但未曾被处理promise.
 * 
 * unhandledRejection 事件处理函数接受的参数是拒绝原因(常常是一个错误对象) 以及已被拒绝的 Promise.
 * 以下代码展示了 unhandledRejection 的应用:
 */
let rejected;
process.on("unhandledRejection",function(reason,promise){
    console.log(reason.message);  // "Explosion!"
    console.log(rejected === promise); //true
});

rejected = Promise.reject(new Error("Explosion!"));
//此例创建了一个带有错误对象的已被拒绝的Promise,并监听了 unhandledRejection 事件. 事件处理函数接收
//了该错误对象作为第一个参数,原Promise则是第二个参数.

//rejectionHandled 事件处理函数则只有一个参数,即已被拒绝的Promise,如:
process.on("rejectionHandled",function(promise){
    console.log(rejected === promise);
});
rejected = Promise.reject(new Error("Explosion!"));
//延迟添加拒绝处理函数
setTimeout(function(){
    rejected.catch(function(value){
        console.log(value.message); // "Explosion!"
    });
},1000);
/**
 * 此处的 rejectionHandled 事件在拒绝处理函数最终被调用时触发. 若在 rejected 被创建后直接将拒绝处理函数
 * 附加到它上面,那么此事件就不会被触发. 因为立即附加的拒绝处理函数在 rejected 被创建的事件循环的同一个轮次内
 * 就会被调用,这样 rejectionHandled 就不会起作用.
 * 
 * 为了正确追踪潜在的未被处理的拒绝,使用 rejectionHandled 与 unhandledRejection 事件就能保持包含这些
 * Promise的一个列表,之后等待一段时间再检查此列表.如:
 */
let possiblyUnhandledRejections = new Map();

//当一个拒绝未被处理,将其添加到 map
process.on("unhandledRejection",function(reason,promise){
    possiblyUnhandledRejections.set(promise,reason);
});
process.on("rejectionHandled",function(promise){
    possiblyUnhandledRejections.delete(promise);
});
setInterval(function(){
    possiblyUnhandledRejections.forEach(function(reason,promise){
        console.log(reason.message ? reason.message : reason);

        //做点事来处理这些拒绝
        handleRejection(promise,reason);
    });

    possiblyUnhandledRejections.clear();

},60000);
/**
 * 对于未处理的拒绝,这只是个简单追踪器,它使用了一个 Map 来储存 Promise 及其拒绝原因,每个 Promise
 * 都是键,而它的拒绝原因就是相关的值. 每当 unhandledRejection 被触发, Promise 及其拒绝原因就
 * 会被添加到此 Map 中. 而每当 rejectionHandled 被触发, 已被处理的 Promise 就会从这个 Map 中被
 * 移除. 这样一来, possiblyUnhandledRejections 就会随着事件的调用而扩展或收缩. 
 * setInterval() 的调用会定期检查这个列表,查看可能未被处理的拒绝,并将其信息输出到控制台.
 * 
 * 此例使用了一个Map而不是Weak Map, 这是因为你需要定期检查此 Map 来查看哪些 Promise 存在,而这是
 * 使用 Weak Map 所无法做到的.
 */