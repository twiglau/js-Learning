

class Depend {
    constructor() {
        this.reactiveFns = []
    }
    addDepend(reactiveFn) {
        this.reactiveFns.push(reactiveFn)
    }
    notify() {
        this.reactiveFns.forEach(fn => fn())
    }
}
// 封装一个响应式函数
const depend = new Depend()
function watchFn(fn) {
    depend.addDepend(fn)
}

// 对象的响应式
const obj = {
    name: "lau", // 每个属性对应一个 dep 对象
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

depend.notify()
