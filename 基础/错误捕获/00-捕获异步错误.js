// 1. 捕获同步异常
try {
    ;(()=>{
        throw new Error('err')
    })()
} catch (error) {
    console.log(error) // caught
}

//  2. 异步错误无法被直接捕获
try {
    ;(async ()=> {
        // throw new Error('async err')
    })()
} catch (error) {
    console.log(error)
}
/**
 *  3. 原因是异步代码并不在 try...catch 上下文中执行, 唯一的同步逻辑只有创建一个异步
 * 函数, 所以异步函数内的错误无法被捕获.
 * 
 * 要捕获 async 函数内的异常, 可以调用 .catch, 因为 async 函数返回一个 Promise:
 */
;(async ()=> {
    throw new Error('async err')
})().catch((e) => {
    console.log(e) // caught
})
//  4. 当然也可以在函数体内直接用 try...catch.
;(async ()=> {
    try {
        throw new Error('function body inner error')
    } catch (error) {
        console.log(error)
    }
})()
//  5. 类似的,如果在循环体力捕获异常,则要使用 Promise.all: 
;(async ()=>{
    try {
        await Promise.all(
            [1,2,3].map(async () => {
                throw new Error('promise all err')
            })
        )
    } catch (error) {
        console.log(error)
    }
})()
/**
 * 6.  也就是说 await 修饰的 Promise 内抛出的异常, 可以被 try catch 捕获.
 * 但不是说写了 await 就一定能捕获到异常 , 一种情况是 Promise 内在包含一个异步
 */
new Promise(() => {
    setTimeout(() => {
        // throw new Error("Can't catch err")
    },0)
}).catch((e) => {
    console.log(e)
})
//以上情况要用 reject 方式抛出异常才能被捕获: 
new Promise((res,rej) => {
    setTimeout(() => {
        rej(' need reject err');
    },0)
}).catch((e) => {
    console.log(e)
})

/**
 * 7.  另一种情况是, 这个 await 没有被执行到: 
 */
const wait = (ms) => new Promise((res) => setTimeout(res,ms))
;(async ()=>{
    try {
        const p1 = wait(3000).then(() => {
            // throw new Error('p1 err')
        }) // uncaught
        await wait(2000).then(() => {
            throw new Error('await err2')
        })
        await p1
    } catch (error) {
        console.log(error)
    }
})()
 /**
  * p1 等待 3s 后抛出异常, 但因为 2s 后抛出了 err2 异常, 中断了代码执行, 所以 await p1 不会被执行到,导致
  * 这个异常不会被 catch 住.
  * 
  * 而且有意思的是, 如果换一个场景, 提前执行了 p1, 等 1s 后再 await p1, 那异常就无法捕获变成可以捕获了,这样
  * 浏览器会怎么处理? 
  */
;(async ()=>{
    try {
        const p1 = wait(1000).then(()=> {
            throw new Error('can catch err')
        })
        await wait(2000)
        await p1
    } catch (error) {
        console.log(error)
    }
})()
//结论是浏览器 1s 后会抛出一个为捕获异常, 但再过 1s 这个为捕获异常就消失了,变成了捕获的异常.
//这个行为很奇怪,当程序复杂时很难排查, 因为并行的Promise建议用 Promise.all 处理: 
;(async ()=> {
    try {
        await Promise.all([
            wait(1000).then(() => {
                throw new Error(' all err')
            }), //p1
            wait(2000),
        ])
    } catch (error) {
        console.log(error)
    }
})()
//8.  另外Promise的错误会随着Promise链传递, 因此建议把Promsie内多次异步行为改写为多条链的模式,在最后
// catch 住错误.
// 还是之前的例子, Promise 无法捕获内部的异步错误: 
new Promise((res,rej) => {
    setTimeout(() => {
        throw Error('old err')
    }, 1000)
}).catch(error => {
    console.log(error)
})

// 但如果写成 Promise Chain, 就可以捕获了: 
new Promise((res,rej) => {
    setTimeout(res,1000)
}).then((res,rej) => {
    throw Error('chain error')
})
.catch((error) => {
    console.log(error)
})
//原因是, 用Promise Chain 代替了内部多次异步嵌套, 这样多个异步行为会被拆解为对应
//Promise Chain 的同步行为, Promise就可以捕获啦.

//9. 最后,DOM事件监听内抛出的错误都无法被捕获: 
// document.querySelector('button').addEventListener('click',async () => {
//     throw new Error('err') // uncaught
// })
// //同步也一样: 
// document.querySelector('button').addEventListener('click',() => {
//     throw new Error('err') // uncaught
// })

//只能通过函数体内 try...catch 来捕获

/**
 * 精读
 * 我们开篇提到了要监控所有异常, 仅通过 try catch, then 捕获同步, 异步错误 还是不够的, 因为这些是局部错误捕获手段,
 * 当我们无法保证所有代码都处理了异常时, 需要进行全局异常监控, 一般有两种方法: 
 * > window.addEventListener('error')
 * > window.addEventListener('unhandledrejection')
 * 
 * error 可以监听所有同步, 异步的运行时错误, 但无法监听语法, 接口, 资源加载错误. 而unhandledrejection可以监听
 * 到Promise中抛出的,未被 .catch 捕获的错误.
 * 
 * 在具体的框架中, 也可以通过框架提供的错误监听方案解决部分问题,比如React的 Error Boundaries, Vue 的 error handler, 
 * 一个是 UI组件级别的, 一个是全局的.
 * 
 * 回头来看, 本身 js 提供的 try catch 是非常有效的, 之所以会遇到无法捕获错误的经常,大多是因为异步导致的.
 * 然而大部分异步错误,都可以通过 await 方法解决, 我们唯一需要注意的是, await 仅支持一层, 或者说 一条链的错误监听,比如下面
 * 例子错误是可以监听的到的: 
 */

;(async ()=>{
    try {
        await func1()
    } catch (error) {
        // caught
        console.log(error)
    }
})()

async function func1(){
    await func2()
}
async function func2(){
    throw Error('single chain error')
}
//也就是说, 只要这一条链内部都被 await 住了, 那么最外层的 try catch 就能捕获异步错误.
//但如果有一层异步又脱离了 await, 那么就无法捕获了: 
async function func3(){
    setTimeout(() => {
        throw Error('setTimeout Error') //uncaught
    })
}
//针对这个问题 , 原文也提供了例如 Promise.all, 链式Promise, .catch等方法解决, 因此只要编写
//代码时注意对异步的处理, 就可以用 try catch 捕获这些异步错误.