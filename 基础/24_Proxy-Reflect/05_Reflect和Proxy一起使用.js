const obj = {
    name: "lau",
    age: 18
}

const objProxy = new Proxy(obj, {
    get: function(target, key, receiver) {
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue, receiver) {
        console.log("set-------")

        // 1. 有可能赋值失败
        target[key] = newValue 
        // 2. Reflect 返回赋值结果
        const result = Reflect.set(target, key, newValue, receiver)
        if(result){}else{}
    }
})

objProxy.name = "kobe"

console.log(objProxy.name, obj.name)