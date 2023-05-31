// 1. 禁止意外创建全局变量
message = "Hello world"
console.log(message)

function foo1() {
    age = 20
}

foo1()
console.log(age)


// 2. 不允许函数有相同的参数名称
function foo2(x, y, x) {
    console.log(x, y, x)
}

foo2(20, 30, 40)

// 3. 静默错误
// 3.1
true.name = "abc"
// 3.2
NaN = 123
// 3.3
var obj = {}
Object.defineProperty(obj, "name", {
    configurable: false,
    writable: false,
    value: "why"
})

console.log(obj.name)

// 错误 - writable
obj.name = "kobe"
// 错误 - configurable
delete obj.name


// 4. 不允许使用原先的八进制格式
var num = 0123 // 原八进制

// 可以
var num1 = 0o123 //八进制
var num2 = 0x123 //十六进制
var num3 = 0b100 //二进制

// 5. with语句不允许使用

// 6. eval函数不会向上引用变量
var jsString = 'var message = "Hello world"; console.log(message)'
eval(jsString)
console.log(message)