

// 保存当前需要收集的响应式函数
let activeReactiveFn = null

/**
 * Depend 优化:
 * 1 > depend 方法
 * 2 > 使用 set来保存函数, 而不是数组 []
 */
class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }
    addDepend(reactiveFn) {
        this.reactiveFns.add(reactiveFn)
    }
    depend() {
        if(activeReactiveFn) {
            this.reactiveFns.add(activeReactiveFn)
        }
    }
    notify() {
        this.reactiveFns.forEach(fn => fn())
    }
}
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


function reactive(obj) {
    // { name: "why", age: 18 }
    // ES6 之前, 使用 Object.defineProperty
    Object.keys(obj).forEach(key => {
        let value =obj[key]
        Object.defineProperty(obj, key, {
            get: function() {
                const depend = getDepend(obj, key)
                depend.depend()
                return value
            },
            set: function(newValue) {
                value = newValue
                const depend = getDepend(obj, key)
                depend.notify()
            }
        })
    })
    return obj
}


// 监听对象属性变化: Proxy(vue3) / Object.defineProperty(vue2)
const objProxy = reactive({
    name: "lau", // 每个属性对应一个 dep 对象
    age: 18
})


const infoProxy = reactive({
    address: 'HangKang',
    area: 1.88
})

watchFn(()=> {
    console.log(infoProxy.address)
})

infoProxy.address = "luoyang"



