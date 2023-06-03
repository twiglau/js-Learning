var obj = {
    // 私有属性: js里面是没有严格意义上的私有属性
    _age: 18
}

Object.defineProperties(obj, {
    name: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: "why"
    },
    age: {
        configurable: true,
        enumerable: false,
        get: function() {
            return this._age
        },
        set: function(value) {
            this._age = value
        }
    }
})

// 获取某个特定属性的属性描述符
console.log(Object.getOwnPropertyDescriptor(obj, "name"))

// 获取对象的所有属性的属性描述符
console.log(Object.getOwnPropertyDescriptors(obj))