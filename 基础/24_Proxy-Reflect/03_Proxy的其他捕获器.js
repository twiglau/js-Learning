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
    },

    // 监听in的捕获器
    has: function(target, key) {
        console.log(`监听到对象的${key}属性In`, target)
        return key in target
    },

    // 监听delete的捕获器
    deleteProperty: function(target, key) {
        console.log(`监听到对象的${key}属性delete 操作`, target)
        delete target[key]
    }
})

// in 操作符
console.log("name" in objProxy)

// delete 操作
delete objProxy.name