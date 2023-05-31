// 在大多数的情况下, this 都是出现在函数中
// 在全局作用域下
// 浏览器: this -> window(globalObject)
// node环境: this -> {}
// node 环境为什么指向 空对象?
// node 在执行当前文件时, 会将其当作为一个模块 module -> 加载 -> 编译 -> 将模块中所有代码放到一个函数中 -> 然后执行这个函数.call({})
console.log(this)
console.log(window)