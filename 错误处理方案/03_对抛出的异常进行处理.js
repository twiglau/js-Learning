

function foo() {
    throw new Error("foo error message~")
}



function bar() {
    // foo()  // 1. 第一种是 不处理, bar函数继续将异常抛出去.
    try {
        foo()
    } catch (error) {
        console.log("error throw out:", error)
    }
}

function test() {
    bar()
}

function demo() {
    test()
}


// 两种处理方法:
// 1. 第一种是不处理, 那么异常会进一步的抛出, 知道最顶层的调用
// 如果在最顶层也没有对这个异常进行处理, 那么我们的程序就会终止执行, 并且报错

// 2. 使用 try...catch来捕获异常

demo()
console.log("script end~")