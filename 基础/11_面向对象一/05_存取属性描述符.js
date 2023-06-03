var obj = {
    name: "why",
    age: 18,
    _address: "北京市"
}

// 存取属性描述符
// 1. 隐藏某一个私有属性不希望直接被外界使用和赋值
// 2. 如果我们希望截获某一个属性它访问和设置值得过程时, 也会使用存储属性描述符
Object.defineProperty(obj, "address", {
    enumerable: true,
    configurable: true,
    // 下面两个属性 不能和 get,set共存
    // value: "北京市",
    // writable: true,
    get:function(){
        foo()
        return this._address
    },
    set:function(value){
        this._address = value
    }
})

function foo() {
    console.log("log 获取了一次 address 的值")
}
console.log(obj)