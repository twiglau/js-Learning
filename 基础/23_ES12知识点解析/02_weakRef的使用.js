// ES12: WeakRef 类
// WeakRef.prototype.deref
// > 如果原对象没有销毁, 那么可以获取到原对象
// > 如果原对象已经销毁, 那么获取到的是 undefined

const finalRegistery = new FinalizationRegistry((value) => {
    console.log("注册在finalRegistry的对象, 某一个被销毁", value);
})

let obj = { name: "lau" }
// let info = obj 不会被回收, info 还引用内存地址
let info = new WeakRef(obj) // 会被回收, 弱引用

finalRegistery.register(obj, "obj")

obj = null

setTimeout(() => {
    console.log(info.deref().name)
}, 10000)
// obj 对象会不会被回收掉?