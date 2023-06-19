// ES6 之前 没有块级作用域 这个概念

// 声明对象的字面量
// var obj = {
//     name: "why"
// }


// 块代码(block code) 
// {
//     // 表达式
//     var foo = "foo"
// }


// 在ES5中只有两个东西会形成作用域
// 1. 全局作用域
// 2. 函数作用域
// function foo() {
//     var bar = "bar"
// }
// console.log(bar)


// 形成三个作用域
// 1. 全局作用域
// 2. foo函数作用域
// 3. demo函数作用域
function foo() {
    function demo() {

    }
}

