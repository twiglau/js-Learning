/**
 * 设想有一个函数接收一个URL的数组并尝试依次下载每个文件直到有一个文件被成功下载.
 * 如果API是同步的,很容易使用一个循环来实现.
 */
function downloadOneSync(urls) {
    for(var i = 0, n = urls.length; i < n; i++){
        try {
            return downloadSync(urls[i]);
        }catch(e){}
    }
    throw new Error("all downloads failed");
}
/**
 * 但是这种方式实现的 downloadOneAsync并不能正确工作. 因为我们不能在回调函数中
 * 暂停循环并恢复.如果我们尝试使用循环,它将启动所有的下载,而不是等待一个完成再试下
 * 一个.
 */
function downloadOneAsync(urls,onsuccess,onerror) {
    for(var i = 0, n = urls.length; i < n; i++){
        downloadAsync(urls[i],onsuccess,function(error) {
            //?
        });
        //loop continues
    }
    throw new Error("all downloads failed");
}
/**
 * 因此我们要实现一个类似循环的东西,但只有我们显式地说继续执行,它才会继续执行. 
 * 解决方案是将循环实现为一个函数,所以我们可以决定何时开始每次迭代.
 */
function downloadOneAsync(urls,onsuccess,onfailure) {
    var n = urls.length;
    function tryNextURL(i) {
        if( i >= n){
            onfailure("all downloads failed");
            return;
        }
        downloadAsync(urls[i],onsuccess,function() {
            tryNextURL(i + 1);
        });
    }
    tryNextURL(0);
}
/**
 * 局部函数tryNextURL是一个递归函数. 它的实现调用了其自身. 目前典型的 JavaScript
 * 环境中一个递归函数同步自身多次会导致失败. 例如,下例中的递归函数视图调用自身10万次,
 * 在大多数的JavaScript环境中会产生一个运行时错误.
 */
function countdown(n) {
    if( n === 0){
        return "done";
    }else {
        return countdown(n - 1);
    }
}
/**
 * 当n太大时countdown函数会执行失败,那么如何确保downloadOneAsync函数是安全的呢?
 * 
 * 回答这个问题之前,让我们走个小弯路,查看一下 countdown 函数提供的错误信息.
 * JavaScript环境通常在内存中保存一块固定的区域,称为调用栈, 用于记录函数调用返回前下一步该做什么.
 * 想象执行下面的小程序?
 */
function negative(x) {
    return abs(x) * -1;
}
function abs(x) {
    return Math.abs(x);
}
console.log(negative(42));
/**
 * 当程序使用参数42调用Math.abs方法时,有好几个其他的函数调用也在进行,每个都在等待另一个的调用返回.
 * 图64-1 说明了这一刻的调用栈. 在每个函数调用时,项目符号(*)描述了在程序中已经发生的函数调用地方
 * 及这次调用完成后将返回哪里. 就像传统的栈 数据结构,这个信息遵循 "先进后出" 协议.
 * 最新的函数调用将信息推入栈(被表示为栈的最底层的帧),该信息也将首先从栈中弹出. 当Math.abs 执行完毕,
 * 将会返回给abs函数,其将返回给negative函数, 然后将返回到最外面的脚本.
 * 
 * 当一个程序执行中有太多的函数调用,它会耗尽栈空间,最终抛出异常. 这种情况被称为栈溢出.在此例中,调用
 * countdown(10万次)需要countdown调用自身10万次,每次推入一个栈帧,如图64-2所示. 存储这么多栈帧
 * 需要的空间量会耗尽大多数JavaScript环境分配的空间,导致运行时错误.
 */

/**
 * 现在再看看downloadOneAsync函数. 不想countdown直到递归调用返回后才会返回,
 * downloadOneAsync 只在异步回调函数中调用自身. 记住异步API在其回调函数被调用
 * 前会立即返回. 所以 downloadOneAsync 返回,导致其栈帧在任何递归调用将新的栈帧
 * 推入栈前,会从调用栈中弹出.
 * (事实上,回调函数总在事件循环的单独轮次中被调用,事件循环的每个轮次中调用其事件
 * 处理程序的调用栈最初是空的.)所以无论downloadOneAsync需要多少次迭代,都不会耗尽栈空间.
 */
