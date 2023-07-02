// ES12  WeakRef
// > 如果原对象没有销毁, 那么可以获取到原对象
// > 如果原对象已经销毁, 那么获取到的是 undefined

const finalRegistry = new FinalizationRegistry((value) => {
    console.log("注册在finalRegistry的对象, 某一个被销毁", value)
})

let obj = { name: "lau" }
let info = new WeakRef(obj)

finalRegistry.register(obj, "obj")

obj = null

setTimeout(() => {
    if(info.deref()) {}
    console.log(info.deref()?.name)
    console.log(info.deref() && info.deref().name)
}, 10000)