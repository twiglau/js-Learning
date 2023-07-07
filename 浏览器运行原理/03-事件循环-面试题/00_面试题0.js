async function async1 () {
    console.log("async1 start")
    await async2();
    // 相当于 async2 返回的 promise then 当中执行 => 放到微任务里面
    console.log('async1 end')
}

async function async2 () {
    console.log('async2')
    // return Promise.resolve(undefined)
}

console.log('script start')

setTimeout(function() {
    console.log('setTimeout')
}, 0)


async1()

new Promise(function(resolve) {
    console.log('promise1')
    resolve()
}).then(function() {
    console.log('promise2')
})

console.log('script end')

// script start -> async1 start -> async2 -> promise1 -> script end
// 微任务: async1 end -> promise2 
// 宏任务: setTimeout