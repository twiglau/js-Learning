

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

// 封装获取一个Depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {

    // 根据target对象获取map的过程
    let map = target.get(target)
    if (!map) {
        map = new Map()
        targetMap.set(target, map)
    }

    // 根据key获取depend对象
    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}
// 对象的响应式
const obj = {
    name: "lau", // 每个属性对应一个 dep 对象
    age: 18
}

// 监听对象属性变化: Proxy(vue3) / Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        const depend = getDepend(target, key)
        depend.notify()
    }
})

watchFn(function () {
    // 两段代码自动执行
    const newName = objProxy.name
    console.log(objProxy.name)
    console.log("你好啊, lau")
    console.log("Hello World")
})

watchFn(function () {
    console.log(objProxy.name, "demo function -----")
})

function bar() {
    console.log("普通的其他函数")
    console.log("这个函数不需要有任何响应式")
}
// 执行该段代码
objProxy.name = "twig"
objProxy.name = "twig1"
objProxy.name = "twig2"

const info = {
    address: "广州市"
}

watchFn(function () {
    console.log(info.address, "监听address变化----")
})

// obj 对象
// name: depend
// age: depend
// const objMap = new Map()
// objMap.set("name", "nameDepend")
// objMap.set("age", "ageDepend")

// // info 对象
// // address: depend
// const infoMap = new Map()
// infoMap.set("address", "addressDepend")

// const targetMap = new WeakMap()
// targetMap.set(obj, objMap)
// targetMap.set(info, infoMap)

// const nameDepend = targetMap.get(obj).get("name")
// nameDepend.notify()

