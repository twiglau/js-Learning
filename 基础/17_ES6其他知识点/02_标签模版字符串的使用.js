// m: 第一个参数依然是模版字符串中的整个字符串, 只是被切成了多块, 放到了一个数组中
// n: 第二个参数是模块字符串中, 第一个${}
function foo(m, n) {
    console.log(m, n, '-----------')
}

foo("hello", "World")

// 另外调用函数的方式: 标签模块字符串
// foo``

// foo`HelloWorld`
const name = "lau"
const age = 18
foo`Hello${name}Wo${age}rld`

