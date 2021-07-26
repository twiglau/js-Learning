/**
 * 需求:
 * 1. 我们想要得到一个图片,对其进行压缩,应用一个滤镜,然后保存它.
 * 2. 首先,先用 getImage 函数要得到我们想要编辑的图片
 * 3. 一旦图片被成功加载,把这个图片值传到一个compressImage函数中.
 * 4. 当图片已经被成功地重新调整大小后,在 applyFilter 函数中为图片应用一个滤镜.
 * 5. 在图片被压缩和添加滤镜后,保存图片并且打印成功的日志!
 */
getImage('./image.png',(image,err) => {
    if(err) throw new Error(err)
    compressImage(image,(compressedImage,err) => {
        if(err) throw new Error(err)
        applyFilter(compressedImage,(filteredImage,err) => {
            if(err) throw new Error(err)
            saveImage(filteredImage,(res,err) => {
                if(err) throw new Error(err)
                console.log("Successfully saved image!",res)
            })
        })
    })
})
/**
 * 以上代码也能得到我们想要的结果,但是完成过程并不友好.
 * 使用了大量嵌套的回调函数,这使我们的代码阅读起来特别困难.
 * 因为写了许多嵌套的回调函数,这些回调函数又依赖于前一个回调函数,这通常被称为 "回调地狱"
 * 幸运的, ES6 中的 Promise 能很好的处理这种情况!
 */

/**
 * Promise 语法
 * Promise真正是什么?
 * 我们可以使用一个接收一个回调函数的 Promise 构造器创建一个 promise.
 * 
 * 如图 02.1 
 * 
 * 刚刚得到的返回值是什么?
 * > Promise 是一个对象,它包含一个状态 PromiseStatus 和 一个值 PromiseValue
 * > 在上面的例子中,你可以看到 PromiseStatus 的值是 pending, PromiseValue 的值是 undefined
 * > 不过, 你将永远不会与这个对象进行交互,你甚至不能访问 PromiseStatus 和 PromiseValue 这两个属性!
 */

/**
 * PromiseStatus 的值, 也就是 Promise 的状态,可以是以下三个值之一:
 * > fulfilled: promise 已经被 resolved. 一切很好,在promise内部没有错误发生.
 * > rejected: promise 已经被 rejected. 某些事情出错了.
 * > pending: promise 暂时还没有被解决也没有被拒绝,仍然处于pending状态
 * 
 * 问题: 什么时候 promise 的状态是 pending, fulfilled 或 rejected呢? 为什么这个状态很重要?
 * 在上面例子汇总,我们只是为 Promise 构造器传递了一个简单的回调函数 () => {}.
 * 然而,这个回调函数实际上接受两个参数.
 * > 第一个参数的值经常被叫做 resolve 或 res, 它是一个函数,在 Promise 应该解决 resolve 的时候
 *   会被调用.
 * > 第二个参数的值经常被叫做 reject 或 rej, 它也是一个函数,在Promise出现一些错误应该被拒绝 reject的时候
 *   被调用
 * 
 * 如图 02.2
 * 
 * 让我们尝试看看当我们调用 resolve 或 reject 方法时得到的日志.
 * 在我们例子中,把 resolve 方法叫做 res, 把 reject 方法叫做 rej
 * 
 * 如图 02.3
 * 
 * > 当我们调用 resolve 方法时, promise 的状态是 fulfilled.
 * > 当我们调用 reject 方法时, promise 的状态是 rejected.
 */

/**
 * 解决问题
 */
function getImage(file){
    return new Promise((res,rej) => {
        try {
            const data = readFile(file)
            resolve(data)
        } catch(err) {
            reject(new Error(err))
        }
    })
}
//让我们看下当我们在终端运行这段代码时会发生什么?
//如图 02.4
/**
 * 非常酷! 就像我们所期望的一样, promise 得到了解析数据后的值.
 * 但是现在呢? 我们不关心整个 promise 对象, 我们只关心数据的值! 幸运的,有内置的
 * 方法来得到 promise 的值.
 * 
 * 对于一个 promise, 我们可以使用它上面的3个方法:
 * > .then(): 在一个 promise 被 resolved后调用
 * > .catch(): 在一个 promise 被 rejected后被调用
 * > .finally(): 不论 promise 是被 resolved 还是 reject 总是调用
 */
getImage(file)
.then(image => console.log(image))
.catch(error => console.log(error))
.finally(() => console.log('All done!'))

//.then 方法接收传递给 resolve 方法的值.
//如图 02.5

//.catch 方法接受传递给 rejected 方法的值
//如图 02.6

//最终,我们拥有了 promise 被解决后 (resolved) 的值,并不需要整个 promise 对象!
/**
 * 提醒下:
 * 当你知道一个 promise 总是 resolve 或者总是 reject 的时候,你可以写 Promise.resolve
 * 或 Promise.reject, 传入你想要 reject 或 resolve 的 promise 的值.
 * 
 * 如图 02.7
 * 在下边的例子中你将会经常看到这个语法.
 * 
 * 在 getImage 的例子中,为了运行它们,我们最终不得不嵌套多个回调. 幸运的, then 处理器可以帮助
 * 我们完成这件事!
 * 
 * .then 它自己的执行结果是一个 promise. 这意味着我们可以链接任意数量的 .then:
 * 前一个 then 回调的结果将会作为参数传递给下一个 then 回调!
 * 
 * 如图 02.8
 * 
 * 在getImage示例中,为了传递被处理的图片到下一个函数,我们可以链接多个then回调.
 * 相比于之前最终得到许多嵌套回调,现在我们得到了整洁的 then 链.
 * 
 */
getImage('./image.png')
   .then(image => compressImage(image))
   .then(compressImage => applyFilter(compressImage))
   .then(filteredImage => saveImage(filteredImage))
   .then(res => console.log("Successfully saved image!"))
   .catch(err => throw new Error(err))
//完美! 这个语法看起来已经比之前的嵌套回调好多了

/**
 * 三, 宏任务和微任务(macrotask and microtask)
 * 我们知道可一些如何创建 promsie 以及如何提取出 promise 的值的方法.
 * 让我们为脚本添加一些更多的代码并且再次运行它:
 * 
 * 如图 02.9
 * 
 * 发生了什么?
 * 首先, State! 被输出.
 * 然而,第二个被打印的值是 End!,并不是 promise 被解决的值! 只有在End! 被打印之后,
 * promise 的值才会被打印.
 * 
 * 这里发生了什么?
 * 我们最终看到了 promise 真正的力量! 尽管 JavaScript 是单线程的,我们可以使用 Promise
 * 添加异步任务!
 * 
 * 我们之前见过这种情况吗?
 * 在JavaScript Event Loop 中,我们不是也可以使用浏览器原生的方法如 setTimeout 创建某类
 * 异步行为吗?
 * 是的!然而,在事件循环内部,实际上有2中类型的队列:
 * 宏任务(macro)队列[或者只是叫做 任务队列] 和 微任务队列.
 * (宏)任务队列用于 宏任务, 微任务队列用于 微任务.
 * 
 * 那么,什么是宏任务, 什么是微任务?
 * (Macro)task: setTimeout   |   setInterval | setImmediate
 * Microtask:   process.nextTick   | Promise callback  | queueMicrotask
 * 
 * 我们看到 Promise 在微任务列表中, 当一个 Promise 解决(resolve) 并且调用它的 then(),
 * catch() 或 finally() 方法的时候, 这些方法里的回调函数被添加到微任务对垒!
 * 
 * 这意味着 then(), catch() 或 finally() 方法内部的回调函数不是立即被执行,本质上是为
 * 我们的 JavaScript 代码添加了一些异步行为.
 * 
 * 那么什么时候执行 then(), catch(), 或 finally() 内的回调呢?
 */

/**
 * 3.1 事件循环给予任务不同的优先级:
 * > 1. 当前在调用栈(call stack)内的所有函数会被执行, 当它们返回值的时候,会被从栈内弹出.
 * > 2. 当调用栈是空的时候,所有排队的微任务会一个接一个从微任务队列中弹出进入调用栈中,然后
 *      在调用栈中被执行!(微任务自己也能返回一个新的微任务,有效地创建无限的微任务循环)
 * > 3. 如果调用栈和微任务队列都是空的, 事件循环会检查宏任务队列里是否还有任务. 如果宏任务中
 *      还有任务,会从宏任务中弹出进入调用栈,被执行后会从调用栈中弹出.
 */

/**
 * 3.2 查看一个例子.
 * > Task1 : 立即被添加到调用栈中的函数,比如在我们的代码中立即调用它.
 * > Task2, Task3, Task4: 微任务, 比如 promise 中 then 方法里的回调,或者用 queueMicrotask
 *   添加的一个任务
 * > Task5, Task6: 宏任务, 比如 setTimeout 或者 setImmediate 里的回调
 * 
 * 如图 02.10 
 * 
 * 首先, Task1 返回一个值并且从调用栈中弹出. 然后, JavaScript 引擎检查微任务对列中排队的任务.
 * 一旦微任务中所有的任务被放入调用栈并且最终被弹出, JavaScript 引擎会检查宏任务队列中的任务,将
 * 它们弹入调用栈中并且在它们返回值的时候把它们弹出调用栈.
 * 
 * 图中足够粉色的盒子是不同的任务,让我们用写真实的代码来使用它
 */
console.log("Start!")
setTimeout(() => {
    console.log("Timeout!")
},0)

Promise.resolve("Promise!")
.then(res => console.log(res))

console.log("End!")
/**
 * 在这段代码中,我们有宏任务 setTimeout 和 微任务 promise 的 then 回调.
 * 一旦 JavaScript 引擎到达 setTimeout 函数所在的那行就会涉及到事件循环.
 * 让我们一步步运行这段代码,看看会得到什么样的日志?
 * 
 * 1. 在第一行, JavaScript 引擎遇到了 console.log() 方法, 它被添加到调用栈, 之后它在控制台输出值 Start!.
 * console.log 函数从调用栈内弹出, 之后 JavaScript 引擎继续执行代码.
 * 
 * 如图 02.11
 * 
 * 2. JavaScript 引擎遇到了 setTimeout 方法, 他被弹入调用栈中. setTimeout 是浏览器的原生方法:
 * 它的回调函数 ( () => console.log('In timeout')) 将会被添加到 Web API, 直到计时器完成时.
 * 尽管我们为计时器提供的值是 0, 在它被添加到宏任务队列( setTimeout 是一个宏任务) 之后回调还是
 * 会被首先推入 Web API.
 * 
 * 如图 02.12
 * 
 * 3. JavaScript 引擎遇到了 Promise.resolve 方法. Promise.resolve 被添加到调用栈. 在 Promise
 * 解决 (resolve) 值之后,它的 then 中的回调函数被添加到微任务对列.
 * 
 * 如图 02.13
 * 
 * 4. JavaScript 引擎看到调用栈现在是空的, 它将会去检查在微任务队列是否有在排队的任务! 是的,有任务在
 *排队, promise 的 then 中的 回调函数正在等待轮到它! 它被弹入调用栈, 之后它输出了 promise 被解决
 *后(resolved) 的值: 在这个例子中的字符串 Promise!.
 * 
 * 如图 02.14
 * 
 * 5. JavaScript 引擎看到调用栈是空的, 因此, 如果任务在排队的话, 它将会再次去检查微任务队列. 此时,微任务
 * 队列完全是空的.
 * 
 * 到了去检查宏任务的时候了: setTimeout 回调仍然在那里等待 setTimeout 被弹入调用栈. 回调函数返回 console.log
 * 方法, 输出了字符串 In timeout!. setTimeout 回调从调用栈中弹出.
 * 
 * 如图 02.15
 */


 /**
  * 四, Async/Await
  * ES7 引入了一个新的在 JavaScript 中添加异步行为的方式并且使 promise 用起来更加简单! 随着 async 和 await 
  * 关键字的引入, 我们能过创建一个隐式的返回一个 promise 的 async 函数. 但是,我们该怎么做?
  * 
  * 之前,我们看到不管是通过输入 new Promise(() => {}), Promise.resolve 或 Promise.reject, 我们都可以显式
  * 的使用 Promise 对象创建 promise.
  * 
  * 我们现在能过创建隐式地返回一个对象的异步函数,而不是显式地使用 Promise 对象! 这意味着我们不再需要些任何 Promise 
  * 对象了.
  * 
  * 如图 02.16
  * 
  * 尽管 async 函数隐式的返回 promise 是一个非常棒的事实, 但是在使用 await 关键字的时候才能看到 async 函数的真正力量.
  * 当我们等待 await 后的值返回一个 resolved 的 promise 时, 通过 await 关键字, 我们可以暂停异步函数. 如果我们想要
  * 得到这个 resolved 的 promise 的值, 就像我么之前使用 then 回调那样, 我们为被 await 的 promise 的值赋值为变量!
  * 
  * 这样, 我们就可以暂停一个异步函数吗?
  * 当我们运行下面的代码块时让我么看下发生了什么:
  * 
  * 如图 02.17
  * 
  * 嗯? 这里发生了什么?
  * 
  * 如图 02.18
  */

 /**
  * 解释:
  * 1. 首先, JavaScript 引擎遇到了 console.log. 它被弹入到调用栈中, 这之后 Before function! 被输出.
  * 如图 02.19
  * 
  * 2. 然后,我们调用了异步函数 myFunc(), 这之后 myFunc 函数体运行, 函数主体内的最开始一行,我们调用了另
  * 一个 console.log, 这次传入的是字符串 In function!. console.log 被添加到调用栈中,输出值,然后从
  * 栈内弹出.
  * 如图 02.20
  * 
  * 3. 函数体继续执行, 将我们带到第二行. 最终,我们看到一个 await 关键字!
  * 最先发生的事情是被等待的值执行: 在这个例子中是函数one. 它被弹入调用栈, 并且最终返回一个解决状态的 promise.
  * 一旦 Promise 被解决并且 one 返回一个值, JavaScript 遇到了 await 关键字.
  * 
  * 当遇到await关键字的时候,异步函数被暂停. 函数体的执行被暂停, async 函数中剩余的代码会在微任务中运行而不是
  * 一个常规任务!
  * 如图 02.21
  * 
  * 现在,因为遇到了 await 关键字,异步函数 myFunc 被暂停, JavaScript 引擎跳出异步函数,并且在异步函数被调用的
  * 执行上下文中继续执行代码: 在这个例子中是 全局执行上下文
  * 
  * 最终,没有更多的任务在全局执行上下文中运行! 事件循环检查看看是否有任何的微任务在排队: 是的,有! 在解决了 one 的值
  * 以后, 异步函数 myFunc 开始排队. myFunc 被弹入调用栈中,在它之前中断的地方继续运行.
  * 
  * 变量 res 最终获得了它的值, 也即使 one 返回的 promise 被解决的值! 我们用 res的值(在这个例子中是字符串 One!)
  * 调用 console.log. One! 被打印到控制台并且 console.log 从调用栈弹出.
  * 
  * 最终,所有的事情都完成了! 你注意到 async 函数相比于 promise 的 then 有什么不同吗? await 关键字暂停了 async 函数,
  * 然而如果我们使用 then 的话, Promise 的主题将会继续被执行!
  */


