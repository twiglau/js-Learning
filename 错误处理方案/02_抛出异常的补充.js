

class TYError {
    constructor(errorCode, errorMessage) {
        this.errorCode = errorCode
        this.errorMessage = errorMessage
    }
}


function foo(type) {
    console.log("foo函数开始执行")

    if(type === 0) {
        // 1. 抛出一个字符串类型 (基本的数据类型 都是可以的)
        // throw "type不能为0~" // 100

        // 2. 比较常见的是抛出一个对象类型
        // throw { errorCode: -1001, message: "网络错误" }

        // 3. 创建类, 并且创建这个类对应的对象
        // throw new TYError(-1001, "type can't be zero")

        // 4. 提供了一个Error类
        // const err = new Error("type can't be zero")

        // console.log(err.message)
        // console.log(err.name)
        // console.log(err.stack) // 函数的调用栈

        // 5. Error的子类
        const err = new TypeError("当前type类型是错误的~")

        throw err

        // 强调: 如果函数中已经抛出了异常, 那么后续的代码都不会继续执行了
    }


    console.log("foo函数结束执行")
}

foo(0)

console.log("后续的代码继续执行~")


// 函数调用栈