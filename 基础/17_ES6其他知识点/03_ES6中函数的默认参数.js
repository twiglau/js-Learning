// 1. ES5以及之前给参数默认值 的方式
/**
 * 缺点:
 * 1. 写起来很麻烦, 并且代码的阅读性比较差
 * 2. 这种写法是有bug的
 */
function foo(m, n) {
  m = m || "aaa"
  n = n || "bbb"

  console.log(m, n)
}

foo()


// 2. ES6可以给函数参数提供默认值
function foo(m = "aaa", n = "bbb") {
    console.log(m, n)
}

// foo()
foo(0, "")


// 3. 对象参数和默认值以及解构
function printInfo({name, age} = { name: "lau", age: 18}) {
    console.log(name, age)
}
// 另外一种写法
function printInfo1({ name = "lau", age = 18} = {}) {
    console.log(name, age)
}
// 有默认值的形参最好放在最后
function bar(x, y, z = 20) {
    console.log(x, y, z)
}

// 4. 有默认值得函数的length属性
function baz(x, y, z = 30, m, n) {
    console.log(x, y, z, m, n)
}

console.log(baz.length) // 有默认值位置开始,一直往后,都不计算在内