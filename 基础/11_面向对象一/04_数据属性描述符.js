// name 和 age 虽然没有使用属性描述符定义, 但是它们也是具备对应的特性的
// value: 赋值的 value
// configurable: true
// enumerable: true
// writable: true
var obj = {
    name: "why",
    age: 18
}

// 数据属性描述符
// 用了属性描述符, 那么会有默认的特性
Object.defineProperty(obj, "address", {
    value: "peiking", // 默认值undefined
    // 该属性 false, 不可删除,不可修改, 不可重新定义属性描述符
    configurable: false, // 默认值false
    // 该属性配置对应的属性(address)是否是可以枚举的
    enumerable: false, // 默认值false
    // 该特性是属性是否可以赋值(写入值)
    writable: false // 默认值false
})

delete obj.name
console.log(obj.name)

delete obj.address
console.log(obj.address)

// 测试 enumerable的作用
console.log(obj)
for(var key in obj) {
    console.log(key)
}

// 测试writable作用
obj.address = "廊坊"