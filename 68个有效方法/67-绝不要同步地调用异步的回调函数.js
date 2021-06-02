/**
 * 设想有 downloadAsync函数的一种变种,它持有一个缓存(实现为一个Dict,请参阅第45条)来避免多次下载同一个
 * 文件,在文件已经被缓存的情况下,立即调用回调函数是最优选择.
 */
var cache = new Dict();
function downloadCachingAsync(url,onsuccess,onerror){
    if(cache.has(url)) {
        onsuccess(cache.get(url)); // synchronous call
        return;
    }
    return downloadAsync(url,function(file){
        cache.set(url,file);
        onsuccess(file);
    },onerror);
}
/**
 * 通常情况下,如果可以,它似乎会立即提供数据,但这以微妙的方式违反了异步API客户端的期望,首先,它改变了操作
 * 的预期顺序. 
 * 第62条显示了下面的例子,对于一个循规滔距的异步API应该总是以一种可预测的顺序来记录日志信息.
 */
downloadAsync("file.txt",function(file){
    console.log("finished");
});
console.log("starting");
/**
 * 使用上面的downloadCachingAsync实现,这样的客户端代码可能最终会以任意的顺序记录事件,这取决于
 * 文件是否已被缓存起来.
 */
downloadCachingAsync("file.txt",function(file){
    console.log("finished"); //might happen first
});
console.log("starting");
/**
 * 日志消息的顺序是一回事,更一般的是,异步API的目的是维持事件循环中每轮的严格分离.
 * 正如第61条解释的,这简化了并发,通过减轻每轮事件循环的代码量而不必担心其他代码并发地修改
 * 共享的数据结构. 同步地调用异步的回调函数违反了这一分离,导致在当前轮完成之前,代码用于
 * 执行一轮隔离的事件循环.
 * 
 * 例如,应用程序可能会持有一个剩余的文件队列给用户下载和显示消息.
 */
downloadCachingAsync(remaining[0],function(file){
    remaining.shift();
    //...
});
status.display("Downloading " + remaining[0] + "...");
/**
 * 如果同步地调用该回调函数,那么将显示错误的文件名的消息(或者更糟糕的是,如果队列为空会显示 "undefined").
 * 
 * 同步的调用异步的回调函数甚至可能会导致一些微妙的问题.
 * 
 * 1.第64条解释了异步的回调函数本质上是以空的调用栈来调用,因此将异步的循环实现为递归函数是安全的,完全没有
 * 积累超越调用栈空间的危险,同步的调用不能保障这一点,因而使得一个表面上的异步循环很可能会耗尽调用栈空间.
 * 2.另一种问题是异常,对于上面的downloadCachingAsync实现,如果回调函数抛出一个异常,它将会在每轮的事件
 * 循环中,也就是开始下载时而不是期望的一个分离的回合中抛出该异常.
 * 
 * 为了确保总是异步地调用回调函数,我们可以使用已存在的异步API, 就像在第65条和66条中所做的一样,使用通用
 * 的库函数 setTimeout 在每隔一个最小的超时时间后给事件队列增加一个回调函数.
 * 当然,可能有比 setTimeout 函数更完美的替代方案来调度即时事件,这取决于特定平台.
 */
var cache = new Dict();
function downloadCachingAsync(url,onsuccess,onerror){
    if(cache.has(url)){
        var cached = cache.get(url);
        setTimeout(onsuccess.bind(null,cached),0);
        return;
    }
    return downloadAsync(url,function(file){
        cache.set(url,file);
        onsuccess(file);
    },onerror);
}
//使用bind函数(参阅25条)将结果保存为onsuccess回调函数的第一个参数.

/**
 * 1.即使可以立即得到数据,也绝不要同步地调用异步回调函数.
 * 2.同步地调用异步的回调函数扰乱了预期的操作序列,并可能导致意想不到的交错代码.
 * 3.同步地调用异步的回调函数可能导致栈溢出或错误地处理异常.
 * 4.使用异步的API,比如setTimeout函数来调度异步回调函数,使其运行于另一个回合.
 */