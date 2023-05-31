// 1. 将函数作为另外一个函数的参数
function foo(fn) {
    fn()
}

function bar() {
    console.log("bar function")
}

foo(bar)


function calc(num1, num2, calcFn) {
    console.log(calcFn(num1, num2))
}
function add(num1, num2) { return num1 + num2 }
function sub(num1, num2) { return num1 - num2 }
function mul(num1, num2) { return num1 * num2 }

var m = 20
var n = 10
calc(m, n, add)
calc(m, n, sub)
calc(m, n, mul)