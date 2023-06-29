const obj = {
    name: "lau",
    age: 18
}

const objProxy = new Proxy(obj, {
    // 获取值是的捕获器
    get:function(target, key) {
        console.log(`监听到对象的${key}属性被访问了`, target)
        return target[key]
    },

    // 设置值时捕获器
    set: function(target, key, newValue) {
        console.log(`监听到对象的${key}属性被设置值`, target)
        target[key] = newValue
    }
})

objProxy.name = "kobe"
objProxy.age = 30

console.log(obj.name, obj.age)