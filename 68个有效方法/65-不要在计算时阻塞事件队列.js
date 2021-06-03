/**
 * 61条解释了异步API怎样帮助我们防止一段程序阻塞应用程序的时间队列.但这并不是故事的全部.
 * 毕竟,每个程序员都可以告诉你,即使没有一个函数调用也很容易使一个应用程序陷入泥潭.
 * while(true) {}
 * 
 * 而且它并不需要一个无限循环来写一个缓慢的程序. 代码需要时间来运行,而低效的算法或
 * 数据结构可能导致运行长时间的计算.
 * 
 * 当然,效率不是JavaScript唯一关注的. 但是基于事件的编程的确强加了一些特殊的约束.为了保持
 * 客户端应用程序的高度交互性和确保所有传入的请求在服务器应用程序中得到充分的服务,保持事件
 * 循环的每个轮次尽可能短是至关重要的.否则,事件队列会滞销,其增长速度会超过分发处理时间处理
 * 程序的速度.在浏览器环境中,一些代价高昂的计算也会导致糟糕的用户体验,因为一个页面的用户界面
 * 无响应多数是由于在运行JavaScript代码.
 * 
 * 那么,如果你的应用程序需要执行代价高昂的计算你该怎么办呢?没有一个完全正确的答案,但有一些通用
 * 的技术可用. 也许最简单的方法是使用像Web客户端平台的Worker API这样的并发机制.这对于需要搜索大量
 * 可移动距离的人工智能游戏是一个很好的方法. 游戏可能以生成大量的专门计算移动距离的worker开始.
 * var ai = new Worker("ai.js");
 * 这将使用ai.js源文件作为worker的脚本,产生一个新的线程独立的时间队列的并发执行线程.该worker运行
 * 在一个完全隔离的状态 ---- 没有任何应用程序对象的直接访问. 但是, 应用程序与worker之间可以通过
 * 发送形式为字符串的messages来交互. 所以,每当游戏需要程序计算移动时,它会发送一个消息给worker.
 * 
 * var userMove =
 * ai.postMessage(JSON.stringify({ userMove:userMove }));
 * 
 * postMessage的参数被作为一个消息增加到worker的事件队列中. 为了处理worker的响应,
 * 游戏会注册一个事件处理程序.
 * 
 * ai.onmessage = function(event) { executeMove(JSON.parse(event.data).computerMove)};
 * 与此同时,源文件ai.js指示worker监听消息并执行计算下一步移动所需的工作.
 * self.onmessage = function(event){
 *    //parse the user move
 *    var userMove = JSON.parse(event.data).userMove;
 *    //generate the next computer move
 *    var computerMove = computeNextMove(userMove);
 *    //format the computer move
 *    var message = JSON.stringify({ computerMove: computerMove });
 *    //....
 *    self.postMessage(message);
 * };
 * function computeNextMove(userMove){ //... }
 */

/**
 * 不是所有的JavaScript平台都提供了类似Worker这样的API,而且有时传递消息的开销可能会过于昂贵.
 * 另一种方法是将算法分解为多个步骤,每个步骤组成一个可管理的工作块.考虑下第48条搜索社交网络图的
 * 工作表算法.
 */
Member.prototype.inNetwork = function(other) {
    var visited = {};
    var worklist = [this];
    while(worklist.length > 0){
        var member = worklist.pop();
        //...
        if(member === other) {//found?
            return true;
        }
        //...
    }
    return false;
}
/**
 * 以上如果这段程序核心的while循环代价太过高昂,搜索工作可能会以一种不可接受的时间运行
 * 而阻塞应用程序事件队列. 即使我们可以使用Worker API, 它也是昂贵或不方便实现的,因为
 * 它需要赋值整个网络图的状态或在worker中存储网络图的状态, 并总是使用消息传递来更新
 * 和查询网络.
 * 
 * 幸运的是,这种算法被定义为一个步骤集的序列 ---- while 循环的迭代. 我们可以通过增加一个
 * 回调参数将 inNetwork装换为一个匿名函数, 并像第64条讲述的,将while循环替换为一个匿名
 * 的递归函数.
 */
Member.prototype.inNetwork = function (other,callback) {
    var visited = {};
    var worklist = [this];
    function next(){
        if(worklist.length === 0){
            callback(false);
            return;
        }
        var member = worklist.pop();
        // ...
        if(member === other){
            callback(true);
            return;
        }
        //...
        setTimeout(next,0); //schedule the next iteration
    }
    setTimeout(next,0); //schedule the first iteration
};
/**
 * 以上代码如何工作?
 * 为了替换while循环,我们写一个局部的next函数,该函数执行循环中的单个迭代然后调度
 * 应用程序事件队列来异步运行下一次迭代. 这使得在此期间已经发生的其他事件被处理后
 * 才继续下一次迭代. 当搜索完成后, 通过找到一个匹配或遍历完整个工作表,我们使用结果
 * 值调用回调函数并通过调用没有调度任何迭代的next来返回,从而有效地完成循环.
 * 
 * 要调度迭代,我们使用多数JavaScript平台都可用的,通用的setTimeout API 来注册next函数,
 * 使next函数经过一段最少时间(0毫秒)后运行. 这具有几乎立刻将回调函数添加到事件队列上的作用.
 * 
 * 值得注意的是,虽然setTimeout 有相对稳定的跨平台移值性,但通常还有更好的替代方案.
 * 例如,在浏览器环境中,最低的超时时间被压制为4毫秒,我们可以采用一种替代方案,使用postMessage
 * 立即压入一个事件.
 * 
 * 如果应用程序事件队列的每个轮次中止执行算法的一个迭代,那就杀鸡用牛刀了.
 * 我们可以调整算法,自定义每个轮次中的迭代次数. 这很容易实现,只须在next函数的主要部分
 * 的外围使用一个循环计数器.
 */
Member.prototype.inNetwork = function(other,callback){
    //...
    function next(){
        for(var i = 0; i < 10; i++){
            //...
        }
        setTimeout(next,0);
    }
    setTimeout(next,0);
}

/**
 * 1.避免在主 事件队列中执行代价高昂的算法.
 * 2.在支持Worker API的平台,该API可以用来在一个独立的事件队列中运行长计算程序.
 * 3.在Worker API 不可用或代价昂贵的环境中,考虑将计算程序分解到事件循环的多个轮次中.
 */