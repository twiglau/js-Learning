

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
let activeReactiveFn = null
function watchFn(fn) {
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
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
        // 根据target, key 获取对应 depend
        const depend = getDepend(target, key)
        // 给depend对象中 添加响应函数
        depend.addDepend(activeReactiveFn)
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        const depend = getDepend(target, key)
        depend.notify()
    }
})


watchFn(function () {
    console.log(objProxy.age, "demo function -----")
})



