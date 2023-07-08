// 1. 没有自己作用域, 命名冲突
// var a_name = "kobe"
// var isFlag = false

// 2. 以前如何解决 命名冲突 - 函数: 函数有自己的作用域
var moduleA = (function() {
    var a_name = "twig"
    var isFlag = false

    return {
        name: a_name,
        isFlag: isFlag
    }
})()


// 3. 引起问题: 外部访问不了自己定义的变量/函数
// 解决: 将需要暴露的对象, 返回出去 moduleA 对象


// 这样做的好处:
// 1. 避免命名冲突


// 但是这样做以后, 依然还有问题:
// 1. 名字 moduleA, 有可能其他地方也是同样的名字 kobe 编写的代码,使用相同的名称
// 2. 在使用moduleA里面变量的地方, 比如 lau.js, 必须知道名字 moduleA, 如果一个项目有很多这样的名称, 一定不好使用
// 3. 如果再做一个新的项目,写法不一样, 每个人需要学习大量自己定义的规范, 用于不同的场景, 那么会引起一定的混乱, 代码也不具备一定可移植性

// 以上问题: 为了让JS程序员, 都遵循 一个统一的模块化规范, 这个时候, 在社区中慢慢形成不同的模块化规范
// 比较常见的如: AMD, CMD, CommonJS