// 1. 没有自己作用域, 命名冲突
// var a_name = "kobe"
// var isFlag = false

// 2. 以前如何解决 命名冲突 - 函数: 函数有自己的作用域
(function() {
    var a_name = "kobe"
    var isFlag = false
})()


// 3. 引起问题: 外部访问不了自己定义的变量/函数