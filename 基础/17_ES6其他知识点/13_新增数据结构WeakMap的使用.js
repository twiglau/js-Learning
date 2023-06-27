const obj1 = { name: "obj1" }

// 1. WeakMap和Map的区别二:
const map = new Map()
map.set(obj1, "aaa")

// const weakMap = new WeakMap()
// weakMap.set(obj1, "bbb")


// 2. 区别一: 不能使用基本数据类型
// weakMap.set(1, "ccc")

// 3. 常见方法

// get 方法
console.log(weakMap.get(obj1))

// has 方法
console.log(weakMap.has(obj1))

// delete 方法
console.log(weakMap.delete(obj1))
// WeakMap { <items unknown } 不能被遍历
console.log(weakMap)

// 不支持 forEach
console.log(weakMap.forEach())



