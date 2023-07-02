const obj = {
    _name: "lau",
    get name() {
        console.log("obj get name 被访问", this._name)
        return this._name
    },
    set name(newValue) {
        this._name = newValue
    }
}

// obj.name = "kobe"
// console.log(obj.name)


const objProxy = new Proxy(obj, {
    get: function(target, key, receiver) {
        console.log("proxy get方法 被访问", key)
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
    }
})

// 如果 Reflect 没有使用 receiver
// return Reflect.get(target, key)
// 1. => 2. proxy 的 get  => 3. obj 的 get  => 4. this._name[this指向obj]
// 问题: 第4步, 访问_name属性时, 已经绕过了 Proxy?
// 但是, 我们希望对obj对象的所有访问, 我们希望都经过 objProxy 代理来访问, 包括 _name 这个属性, 
// 如果在 Proxy 进行了拦截操作, _name 属性就会绕过该拦截.

// Reflect 传入 receiver, 就会改变 4 步中 this 指向(objProxy)
console.log(objProxy.name)