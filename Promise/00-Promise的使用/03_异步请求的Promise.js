// request.js
function requestData(url) {
    // 异步请求的代码会被放入到 executor 中
    return new Promise((resolve, reject) => {
        // 模拟网络请求
        setTimeout(() => {
            // 拿到请求结果
            // url传入的是coderwhy, 请求成功
            if(url === "coderwhy") {
                // 成功
                let names = ["abc", "cba", "nba"]
                resolve(names)
            } else {
                // 失败
                let errMessage = "请求失败, url 错误"
                reject(errMessage)
            }
    
        }, 3000);
    })
}

// main.js
const promise = requestData("coderwhy")
promise.then((res) => {
    console.log(res, "请求成功;")
},(err) => {
    console.log(err, "请求失败")
})


