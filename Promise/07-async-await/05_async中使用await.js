
// 1. 在普通函数中
// 仅允许在异步函数和模块顶级使用 "await" 表达式
// function foo() {
//     await 123
// }

// 2. 
// async function foo() {
//     await 表达式 => Promise
// }
function requestData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve("aaaaa") }, 2000)
    })
}

async function getData() {
    const res = await requestData()

    // 三行输出 相当于在then中执行
    console.log("执行后面的代码1", res)
    console.log("执行后面的代码2")
    console.log("执行后面的代码3")

}

getData()


// 3. 使用普通的返回值
async function foo1() {
    const res = await 123
    console.log(res) // 123
}

foo1()

// 4. 使用thenable对象作为返回值
async function foo2() {
    const res = await {
        then: function (resolve, reject) {
            resolve(456)
        }
    }
    console.log(res) // 456
}

foo2()

// 5. 使用Promise 作为返回值
async function foo3() {
    const res = await Promise.resolve(789)
    console.log(res) // 789
}

foo3()

// 6. reject值
async function foo4() {
    const res = await Promise.reject("091")
    console.log(res)
}

foo4().catch(err => console.log(err)) // 091