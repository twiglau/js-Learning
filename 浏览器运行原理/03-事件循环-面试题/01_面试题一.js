Promise.resolve().then(() => { // 1. 这个回调函数 被 放入到 微任务 里面
    console.log(0)
    // 1. 直接return 一个值 相当于 resolve(4)
    // return 4

    // 2. return thenable值
    // return {
    //     // 因为是一个 thenable, 不会再 本轮的事件循环 中执行
    //     // 它会推到 下一次的微任务中
    //     then: function(resolve) {
    //         resolve(4)
    //     }
    // }

    // 3. return Promsie
    // 不是普通的值, 多加一次微任务
    // Promsie.resolve(4), 多加一次微任务
    // 一共多加两次微任务
    // return Promise.resolve(4)
}).then(res => {   // 3. 加入到 微任务 队列
    console.log(res)
})

Promise.resolve().then(() => { // 2. 这个回调函数 被 放入到 微任务 里面
    console.log(1)
}).then(() => {
    console.log(2) // 4. 
}).then(() => {
    console.log(3) // 5
}).then(() => {
    console.log(5) // 6
}).then(() => {
    console.log(6) // 7
})

// 1. return 4 分析:
// 主线程: 空
// 微任务队列-1:   0 -> 1
// 微任务队列-2:   4 -> 2
// 微任务队列-3:   3
// 微任务队列-4:   5
// 微任务队列-5:   6

// 输出顺序:
// 0 -> 1 -> 4 -> 2 -> 3 -> 5 -> 6


// 2. return { then: { ... }} 分析:
// 输出顺序: 0 1 2 4 3 5 6

// 3. return Promise
// 0
// 1
// 2
// 3
// 4
// 5
// 6