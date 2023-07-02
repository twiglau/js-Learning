

let reactiveFns = []
// 封装一个响应式函数
function watchFn(fn) {
    reactiveFns.push(fn)
}

// 对象的响应式
const obj = {
    name: "lau",
    age: 18
}

watchFn(function () {
    // 两段代码自动执行
    const newName = obj.name
    console.log(obj.name)
    console.log("你好啊, lau")
    console.log("Hello World")
})

watchFn(function () {
    console.log(obj.name, "demo function -----")
})

function bar() {
    console.log("普通的其他函数")
    console.log("这个函数不需要有任何响应式")
}
// 执行该段代码
obj.name = "twig"
reactiveFns.forEach(fn => {
    fn()
})
