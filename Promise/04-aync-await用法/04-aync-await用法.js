/**
 * 1. 语法
 * 假设有一个JSON方法,它返回一个promise,该promise会被resolve为一个JSON对象,我们
 * 想要调用该方法,输出得到的JSON对象,最后返回"done"
 * 下面是使用promise的实现方式:
 */
const makeRequest1 = () => getJSON().then(data => {
    console.log(data)
    return "done"
})
makeRequest1()
//使用async/await则是这样的:
const makeRequest2 = async () => {
    console.log(await getJSON())
    return "done"
}
makeRequest2()
/**
 * 使用async/await时有以下几个区别:
 * 在定义函数时我们使用了async关键字. await 关键字只能在使用async定义的函数的内部使用.
 * 所有async函数都会返回一个promise, 该promise最终resolve的值就是你在函数中return的内
 * 容.
 * 
 * 由于第一点中的原因,你不能在顶级作用域中await一个函数. 因为顶级作用域不是一个async方法.
 * 
 * await getJSON() 意味着直到getJSON()返回的promise在resolve之后, console.log才会执行
 * 并输出resolve的值.
 */

//为何使用async/await编写出来的代码更好?

/**
 * 1. 简洁
 */

/**
 * 2. 错误处理
 * async/await 使得用同一种(古老而好用的try/catch)处理同步和异步错误称为可能. 在下面这段使用
 * promise的代码中, try/catch 不能捕获 JSON.parse 抛出的异常,因为该操作是在 promise 中进行的.
 * 要处理JSON.parse抛出的异常,你需要在promise上调用.catch 并重复一遍异常处理的逻辑.
 * 通常在生产环境中异常逻辑都远比console.log要复杂,因此这会导致大量的冗余代码.
 */
const makeRequest3 = () => {
    try {
        getJSON()
        .then(result => {
            // this parse may fail
            const data = JSON.parse(result)
            console.log(data)
        })
        // uncomment this block to handle asynchronous errors
        // .catch((err) =>{
        //     console.log(err)
        // })
    } catch (err){
        console.log(err)
    }
}
//使用了 async/await的情况, catch 代码块现在可以捕获 JSON.parse抛出的异常
const makeRequest4 = async () => {
    try {
        //this parse may fail
        const data = JSON.parse(await getJSON())
        console.log(data)
    } catch(err){
        console.log(err)
    }
}

/**
 * 3.条件分支
 * 假设有如下逻辑的代码. 请求数据,然后根据返回数据中的某些内容决定是直接返回这些
 * 数据还是继续请求更多数据:
 */
const makeRequest5 = () => {
    return getJSON()
    .then(data => {
        if(data.needsAnotherRequest){
            return makeAnotherRequest(data)
            .then(moreData => {
                console.log(moreData)
                return moreData
            })
        } else {
            console.log(data)
            return data
        }
    })
}
/**
 * 只是阅读这些代码已经够让你头疼的了. 一不小心你就会迷失在这些嵌套(6层),空格,返回语句中.
 * (当然我们一般用请求数据的返回值作为判断条件不会写成这样)
 * 
 * 在使用async/await改写后:
 */
const makeRequest6 = async () => {
    const data = await getJSON()
    if(data.needsAnotherRequest) {
        const moreData = await makeAnotherRequest(data);
        console.log(moreData)
        return moreData
    } else {
        console.log(data)
        return data
    }
}

/**
 * 4. 中间值
 * 比如你向一个url1 发送请求,拿到返回值1, 然后用这个返回值 1 当做参数去请求 url2, 拿到
 * 返回值2, 然后拿返回值1 和 返回值2 作为参数去请求 url3, 拿到最终的返回结果
 * 
 * 对应的代码看起来是这样的:
 */
const makeRequest7 = () => {
    return promise1()
    .then(value1 => {
        //do something
        return promise2(value1)
        .then(value2 => {
            //do something
            return promise3(value1,value2)
        })
    })
}
/**
 * 如果promise3 没有用到value1, 那么我们就可以把这几个 promise改成嵌套的模式. 如果你不喜欢这种
 * 编码方式, 你也可以把 value1 和 value2 封装在一个Promise.all 调用中以避免深层次的嵌套:
 */
const makeRequest8 = () => {
    return promise1()
    .then(value1 => {
        //do something
        return Promise.all([value1,promise2(value1)])
    })
    .then(([value1,value2]) => {
        //do something
        return promise3(value1,value2)
    })
}
/**
 * 这种方式为了保证可读性而牺牲了语义. 除了避免嵌套的 promise, 没有其他理由要把 value1
 * 和 value2 放在一个数组里.
 * 
 * 同样的逻辑如果换用async/await编写就会非常简单,直观
 */
const makeRequest9 = async () => {
    const value1 = await promise1()
    const value2 = await promise2(value1)
    return promise3(value1,value2)
}

/**
 * 5. 异常堆栈
 * 假设有一段串行调用多个promise的代码,在promise串中的某一点抛出了异常:
 */
const makeRequest10 = () => {
    return callAPromise()
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => {
        throw new Error("oops")
    })
}
makeRequest10()
.catch(err => {
    console.log(err);
    // output
    // Error: oops at callAPromise.then.then.then.then
})
/**
 * 从promise串返回的异常堆栈中没有包含关于异常是从哪个环节抛出的信息. 更糟糕的是,它还会误导你,
 * 它包含的唯一的函数名是 callAPromise, 然而该函数与此异常并无关系.
 * 
 * 然而,在使用了 async/await的代码中, 异常堆栈指向了正确的函数:
 */
const makeRequest11 = async () => {
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    throw new Error("oops");
}
makeRequest11()
.catch(err => {
    console.log(err);
    //output
    //Error: oops at makeRequest (index.js 7: 9)
})
/**
 * 这带来的好处在本地开发环境中可能并不明显,但当你想要在生产环境的服务器上获取有意义的异常信息时,
 * 这会非常有用. 在这种情况下, 知道异常来自makeRequest而不是一连串的 then 调用会有意义的多.
 */

/**
 * 6.调试
 * 最后压轴的一点, 使用 async/await 最大的优势在于它很容易被调试. 由于以下两个原因,调试
 * promise 一直以来都是很痛苦的.
 * 
 * 你不能在一个返回表达式的箭头函数中设置断点(因为没有代码块)
 * 如图 04.1
 * 
 * 如果你在一个.then代码块中使用调试其的步进(step-over)功能,调试器并不会进入后续的.then代码块,因为
 * 调试器只能跟踪同步代码的 [每一步]
 * 
 * 通过使用async/await, 你不必再使用箭头函数. 你可以对await 语句执行步进操作,就好像他们都是普通的同步
 * 调用一样.
 * 如图 04.2
 */
