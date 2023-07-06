// await / async
// async 关键字用于声明一个异步函数
async function foo() {
    return "111"
}

foo().then(res => {
    console.log("结果: ", res)
})