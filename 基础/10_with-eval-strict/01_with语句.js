"use strict"; // 严格模式下, 不支持 with 语句

// var message = "Hello World"

// with 语句: 可以形成自己的作用域
var obj = { name: "why", age: 18, message: 'obj message'}

function foo() {
    with(obj) {
        console.log(message)
        console.log("------")
    }
}

foo()