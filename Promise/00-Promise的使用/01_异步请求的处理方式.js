

/**
 * 这种回调的方式有很多的弊端:
 * 1 > 如果我们自己封装的requestData, 那么我们在封装的时候必须自己设计好callback名称, 并且使用好
 * 2 > 如果我们使用的是别人封装的requestData或者一些第三方库, 那么我们必须去看别人的源码或者文档, 才知道它这个函数
 * 需要怎么去获取到结果
 */

// request.js
function requestData(url, successCallback, failtureCallback) {
    // 模拟网络请求
    setTimeout(() => {
        // 拿到请求结果
        // url传入的是coderwhy, 请求成功

        if(url === "coderwhy") {
            // 成功
            let names = ["abc", "cba", "nba"]
            successCallback(names)
        } else {
            // 失败
            let errMessage = "请求失败, url 错误"
            failtureCallback(errMessage)
        }

    }, 3000);
}


// main.js
requestData("coderwhy", (res) => {
    console.log(res)
},(err)=> {
    console.log(err)
})


// 更好的,规范的方案 承诺(这个承诺已经规范好了所有的代码编写逻辑)
function requestData2() {
    return "承诺"
}

const chengnuo = requestData2()