let obj = { name: "lau" }
obj = null  // 这个对象会销毁的

// 需求: 在obj被销毁时, 告诉这个对象被销毁了?

// 回调函数: 会在注册在 finalRegistry 里面的对象 销毁时,会执行
// GC 不定时 回收, 不会立即回收
const finalRegistry = new FinalizationRegistry(() => {
    console.log("注册在finalRegistry的对象, 某个销毁了~")
})

let obj1 = { name: "kobe"}
finalRegistry.register(obj1)

obj1 = null