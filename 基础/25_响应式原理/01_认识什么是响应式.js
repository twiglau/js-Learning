

// 对象的响应式
const obj = {
    name: "lau",
    age: 18
}

// 两段代码自动执行
const newName = obj.name
console.log(obj.name)

// 执行该段代码
obj.name = "twig"