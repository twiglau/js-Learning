var obj = {
    name: "lau",
    age: 18,
    height: 1.88
}

// 对象的解构: {}
var { name, age, height } = obj
console.log(name, age, height)

var {age: newAge } = obj
console.log(newAge)