Function.prototype.hybind = function (thisArg,...argArray) {
    //1. 获取到真实需要调用的函数
    var fn = this

    //2. 绑定this
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

    function proxyFn(...args) {
        //3. 将函数放到thisArg中调用
        thisArg.fn = fn
        //特殊: 对两个参数进行合并
        var finalArgs = [...argArray, ...args]
        var result = thisArg.fn(...finalArgs)
        delete thisArg.fn

        //4. 返回结果
        return result
    }
    return proxyFn
}
function foo() {
    console.log("foo被执行", this)
}

function sum(n1,n2,n3,n4) {
    console.log(n1, n2, n3, n4)
}  

// 1. 方式一: 系统的bind使用
// var bar = foo.bind("abc")
// bar()

// 2. 方式二: 携带全部参数
// var newSum = sum.bind("aaa",18, 20, 30, 50)
// newSum()

// 3. 方式三: 不携带参数
// var newSum = sum.bind("aaa")
// newSum(18, 20, 30, 50)

// 4. 方式四: 携带部分参数
// var newSum = sum.bind("aaa", 10, 20)
// newSum(30, 40)


