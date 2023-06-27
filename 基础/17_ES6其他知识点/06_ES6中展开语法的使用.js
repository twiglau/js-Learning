const names = ["abc", "cbd", "cba"]
const name = "lau"
const info = { name: "lau", age: 18 }

// 1. 函数调用时
function foo(x, y, z) {
    console.log(x, y, z)
}

foo.apply(null, names)
foo(...names)
foo(...name)


// 2. 构造数组时
const newNames = [...names, ...name]
console.log(newNames)

// 3. 构建对象字面量时 ES2018(ES9)
const obj = { ...info, address: "广州市"}
console.log(obj)