/**
 * 1.Promise 的声明周期
 * 每个Promise都会经历一个短暂的声明周期,初始为 挂其态(pending state), 这表示异步操作
 * 尚未结束. 一个挂起的Promise也被认为是未决的 (unsettled). 上个例子中的 Promise 在
 * readFile() 函数返回它的时候就是处在挂起态. 一旦异步操作结束, Promise 就会被认为是
 * 已决的(settled),并进入两种可能状态之一:
 * 
 * >已完成(fulfilled): Promise 的异步操作已成功结束;
 * >已拒绝(rejected): Promise的异步操作未成功结束,可能是一个错误,或由其他原因导致.
 */

/**
 * 内部的 [[PromiseState]] 属性会被设置为 "pending", "fulfilled" 或 "rejected",以反映
 * Promise的状态. 该属性并未在Promise对象上被暴露出来,因此你无法已编程方式判断Promise到底处于
 * 那种状态,不过你可以使用 then() 方法在 Promise 的状态改变时执行一些特定操作.
 * 
 * 1. pending:挂起,表示未结束的Promise状态,相关词汇 "挂起态".
 * 2. fulfilled:已完成,表示已成功结束的Promise状态,可以理解为"成功完成",相关词汇 "完成","被完成","完成态".
 * 3. rejected:已拒绝,表示已结束但失败的Promise状态
 * 4. resolve:决议,表示将Promise推向成功态,可以理解为"决议通过",在Promise概念中与"完成"是近义词.相关词汇
 *    "决议态","已决议","被决议"
 * 5. unsettled:未决,或者成为"未解决",表示Promise尚未被完成或拒绝,与"挂起"是近义词.
 * 6. settled:已决,或者称为"已解决",表示Promise已被完成或拒绝.注意这与"已完成"或"已决议"不同,"已决"的状态
 *    态也可能是"拒绝态"(已失败).
 * 7. fulfillment handler: 完成处理函数,表示Promise为完成态时会被调用的函数.
 * 8. rejection handler: 拒绝处理函数,表示Promise为拒绝时会被调用的函数.
 * 
 * then() 方法在所有的Promise上都存在,并且接收两个参数.第一个参数是Promise被完成时要调用的函数,与异步操作
 * 关联的任何附加数据都会被传入这个完成函数. 第二个参数则是Promise被拒绝时调用的函数,与完成函数相似,拒绝函数
 * 会被传入与拒绝相关联的任何附加数据.
 * 
 * 用这种方式实现then()方法的任何对象都被称为一个 thenable.所有的Promise都是thenable,反之则未必成立.
 * 
 * 传递给then()的两个参数都是可选的,因此你可以监听完成与拒绝的任意组合形式,如下:
 */
let promise = readFile("example.txt");

promise.then(function(contents){
    //完成
    console.log(contents);
},function(err){
    //拒绝
    console.error(err.message);
});

promise.then(function(contents){
    //完成
    console.log(contents);
});
promise.then(null,function(err){
    //拒绝
    console.error(err.message);
});
//这三个 then() 调用都操作在同一个Promise上,第一个调用同时监听了完成与失败;第二个调用只监听了完成,错误不会被
//报告;第三个则只监听了拒绝,并不报告成功信息.

//Promise也具有一个 catch() 方法,其行为等同于只传递拒绝处理函数给 then(). 例如,以下的 catch()
//与 then() 调用是功能等效的.
promise.catch(function(err){
    //拒绝
    console.error(err.message);
});
//等同于:
promise.then(null,function(err){
    //拒绝
    console.error(err.message);
});
/**
 * then() 与 catch() 背后的意图是让你组合使用它们来正确处理异步操作的结果,此系统要优于事件与回调函数,因为
 * 它让操作是成功还是失败变得完全清晰(事件模式倾向于在出错时不被触发,而在回调函数模式中你必须始终记得检查
 * 错误参数). 只需知道若你未给Promise附加拒绝处理函数,所有的错误就会静默发生.建议始终附加一个拒绝处理函数,
 * 即使该处理程序只是用于打印错误日志.
 * 
 * 即使完成或拒绝处理函数的Promise已经被解决之后才添加到作业队列,它们仍然会被执行.这允许你随时添加新的完成
 * 或拒绝处理函数,并保证它们会被调用,如下:
 */

//原始的完成处理函数
promise.then(function(contents){
    console.log(contents);

    //现在添加另一个
    promise.then(function(contents){
        console.log(contents);
    });
});
/**
 * 在此代码中,完成处理函数又为同一个Promise添加了另一个完成处理函数. 这个Promise此刻已经完成了,因此新的处理
 * 程序就被添加到任务队列,并在就绪时(前面的作业执行完毕后)被调用.拒绝处理函数使用同样方式工作.
 * 
 * 每次调用 then() 或 catch() 都会创建一个新的作业,它会在Promise已决议时被执行. 但这作业最终会进入一个完全
 * 为Promise保留的作业队列.这个独立队列的确切细节对于理解如何使用Promise是不重要的,你只需理解作业队列通常来
 * 说是如何工作的.
 */

/**
 * 2.创建未决的Promise
 * 新的Promise使用 Promise 构造器来创建. 此构造器接收两个参数: 一个被称为执行器(executor)的函数,包含初始化Promise
 * 的代码. 该执行器会被传递两个名为 resolve() 与 reject() 的函数作为参数.  resolve() 函数在执行器成功结束时被调用,
 * 用于示意该Promise已经准备好被决议 (resolved ),而 reject() 函数则表明执行器的操作已失败.
 * 
 * 此处有个范例,在Node.js中使用了一个Promise,实现了本章前面的 readFile() 函数:
 */

//Node.js 范例
let fs = require("fs");

function readFile(filename){
    return new Promise(function(resolve,reject){
        //触发异步操作
        fs.readFile(filename,{encoding:"utf8"},function(err,contents){

            //检查错误
            if(err){
                reject(err);
                return;
            }

            //读取成功
            resolve(contents);
        });
    });
}

let promise = readFile("example.txt");

//同时监听完成与拒绝
promise.then(function(contents){
   //完成
   console.log(contents);
},function(err){
    //拒绝
    console.error(err.message);
})
//在此例中,Node.js原生的 fs.readFile() 异步调用被包装在一个Promise中. 执行器要么传递错误
//对象给 reject() 函数,要么传递文件内容给 resolve() 函数.

/**
 * 要记住执行器会在 readFile() 被调用时立即运行. 当 resolve() 或 reject() 在执行器内部被
 * 调用时,一个作业被添加到作业队列中,以便决议( resolve ) 这个Promise. 这被称为作业调度(job scheduling),
 * 若你曾用过 setTimeout() 或 setInterval() 函数,那么应该已经熟悉这种方式. 在作业调度中,你添加
 * 新作业到队列中是表示: "不要立刻执行这个作业,但要在稍后执行它". 例如, setTimeout() 函数能让你指定一个延迟
 * 时间,延迟之后作业才会被添加到队列:
 */

//在500毫秒之后添加此函数到作业队列
setTimeout(function(){
    console.log("Timeout");
},500);
console.log("Hi!");
//此代码安排一个作业在 500 毫秒之后被添加到作业队列.此处两个 console.log() 调用产生了以下输出:
//Hi!
//Timeout

//多亏这500毫秒的延迟,被传递给 setTimeout() 的匿名函数的输出,被排在了 console.log("Hi!")输出之后.
//译:
//实际上前面范例中的输出顺序与500毫秒的延时没有关系,而与 setTimeout() 的机制有关.可以把延时改为0,依然
//会得到相同的结果:

//在 0 毫秒之后添加此函数到作业队列
setTimeout(function(){
    console.log("Timeout");
},0);
console.log("Hi!");
//输出结果会保持不变, setTimeout() 确实有延时效果,但原书的例子不当,没有完全说清其中的机制.
//Promise 工作方式与之相似. Promise的执行器会立即执行,早于源代码中在其之后的任何代码,如下:
let promise = new Promise(function(resolve,reject){
    console.log("Promise");
    resolve();
});
console.log("Hi!");
//调用 resolve() 触发了一个异步操作. 传递给 then() 与 catch() 的函数会异步地被执行,并且它们也被
//添加了作业队列(先进队列再执行),如下:
let promise = new Promise(function(resolve,reject){
    console.log("Promise");//1
    resolve();
});
promise.then(function(){
    console.log("Resolved");//3
});
console.log("Hi!");//2
/**
 * 注意:
 * 尽管对 then() 的调用出现在 console.log("Hi!") 代码行之前,它实际上稍后才会执行(与执行器中那行"Promise" 不同).
 * 这是因为完成处理函数与拒绝函数总是会在执行器的操作结束后被添加到作业队列的尾部.
 */

/**
 * 2.3 创建已决的Promise
 * 基于Promise执行器行为的动态本质,Promise构造器就是创建未决的Promise的最好方式,但若你想让一个Promise代表一个已知的值,
 * 那么安排一个单纯传值给 resolve() 函数的作业并没有意义. 相反,有两种方法可使用指定值来创建已决的Promise.
 */

/**
 * 2.3.1 使用Promise.resolve()
 * Promise.resolve() 方法接受单个参数并会返回一个处于完成态的Promise. 这意味着没有任何作业调度会发生,并且
 * 你需要向Promise 添加一个或更多的完成处理函数来提取这个参数值.如下:
 */
let promise = Promise.resolve(42);
promise.then(function(value){
    console.log(value); //42
});
/**
 * 此代码创建了一个已完成的Promise,因此完成处理函数就接收到42作为value参数. 若一个拒绝处理函数被添加到此Promise,该
 * 拒绝处理函数将永不会被调用,因为此Promise绝不可能再是拒绝态.
 */

/**
 * 2.3.2 使用Promise.reject()
 * 也可以使用 Promise.reject() 方法来创建一个已拒绝的Promise. 此方法向Promise.resolve() 一样工作,区别是被创建的
 * Promise处于拒绝态,如下:
 */
let promise = Promise.reject(42);
promise.catch(function(value){
    console.log(value); //42
});
//任何附加到这个Promise的拒绝处理函数都将会被调用,而完成处理函数则不会执行.
//若你传递一个Promise给 Promise.resolve() 或 Promise.reject() 方法,该 Promise 会不作修改原样返回.

/**
 * 2.3.3 非Promise的Thenable
 * Promise.resolve() 与 Promise.reject() 都能接受非Promise的thenable作为参数. 当传入了非Promise的
 * thenable时,这些方法会创建一个新的Promise,此Promise会在 then() 函数之后被调用.
 * 当一个对象拥有一个能接受resolve与reject参数的then()方法,该对象就会被认为是一个非Promise的thenable,如下:
 */
let thenable = {
    then:function(resolve,reject) {
        resolve(42);
    }
};
//此例中的 thenable 对象,除了 then() 方法之外没有任何与Promise相关的特征. 你可以调用 Promise.resolve() 
//来将 thenable 转换为一个已完成的 Promise:
let p1 = Promise.resolve(thenable);
p1.then(function(value){
    console.log(value); // 42
});
/**
 * 在此例中,Promise.resolve() 调用了 thenable.then(),确定了这个 thenable 的 Promise 状态: 由于 resolve(42)
 * 在 thenable.then() 方法内部被调用,这个 thenable 的Promise状态也就被设为已完成. 一个名为 p1 的新Promise被创建
 * 为完成态,并从 thenable 中接收到了值(此处为42),于是 p1 的完成处理函数就接收到一个值为42的参数.
 * 
 * 使用 Promise.resolve(),同样还能从一个 thenable 创建一个已拒绝的 Promise:
 */
let p2 = Promise.resolve(thenable);
p2.catch(function(value){
    console.log(value); //42
});
//此例类似于上例,区别是此处的 thenable 被拒绝了, 当 thenable.then() 执行时,一个处于拒绝态的新 Promise 被创建,并
//伴随着一个值(42). 这个值此后会被传递给 p2 的拒绝处理函数.

/**
 * Promise.resolve() 与 Promise.reject() 用类似方式工作,让你能轻易处理费Promise的 thenable. 在Promise被引入ES6之前,
 * 许多库都使用了 thenable,因此将thenable转换为正规Promise的能力就非常重要了,能对之前已存在的库提供了向下兼容. 当你不能确定
 * 一个对象是否是Promise时,将该对象传递给 Promise.resolve() 或 Promise.reject()是能找出的最好方式,因为传入真正的Promise
 * 只会被直接传递出来,并不会被修改.
 */

/**
 * 3.执行器错误
 * 如果在执行器内部抛出了错误,那么Promise的拒绝处理函数就会被调用,如下:
 */
let promise = new Promise(function(resolve,reject){
    throw new Error("Explosion!");
});
promise.catch(function(error){
    console.log(error.message); //"Explosion!"
});
//在此代码中,执行器故意抛出了一个错误.此处在每个执行器之内并没有显示的 try-catch,因此错误就被捕捉并传递给了拒绝处理函数.
//这个例子等价于:
let promiseA = new Promise(function(resolve,reject){
    try {
        throw new Error("Explosion!");
    }catch(ex){
        reject(ex);
    }
});
promise.catch(function(error){
    console.log(error.message); // "Explosion!"
})
/**
 * 执行器处理程序捕捉了抛出的任何错误,以简化这种常见处理. 但在执行器内抛出的错误仅当在拒绝处理函数
 * 时才会被报告,否则这个错误就会被隐瞒. 这在开发者早期使用Promise的时候是一个问题,但JS环境通过
 * 提供钩子( hook ) 来捕捉被拒绝的Promise,从而拒绝了此问题.
 */