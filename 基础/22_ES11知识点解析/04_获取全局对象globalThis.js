// 获取某一个环境下的全局对象(Global Object)

// 1. 在浏览器环境下
// console.log(window)
// console.log(this)


// 2. 在node下
// console.log(this) //  {}
// console.log(global) // Object [global]

// 3. 不管在浏览器还是Node环境下
// ES11
console.log(globalThis) // window 或  Object [global]