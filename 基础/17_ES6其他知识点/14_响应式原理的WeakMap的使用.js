// 4. 应用场景 (vue3响应式原理)
const obj2 = {
    name: "twig",
    age: 18
}

function obj2NameFn1() {
    console.log("obj2NameFn1被执行")
}
function obj2NameFn2() {
    console.log("obj2NameFn2被执行")
}
function obj2AgeFn1() {
    console.log("obj2AgeFn1被执行")
}
function obj2AgeFn2() {
    console.log("obj2AgeFn2被执行")
}
const obj3 = {
    name: "txt",
    height: 1.99,
    address: "洛阳"
}

function obj3NameFn1() {
    console.log("obj3NameFn1被执行")
}
function obj3NameFn2() {
    console.log("obj3NameFn1被执行")
}


// 1. 创建WeakMap
const weakMap = new WeakMap()

// 2. 收集依赖内容
// 2.1 对obj2 收集的数据结构
const obj2Map = new Map()
obj2Map.set("name", [obj2NameFn1, obj2NameFn2])
obj2Map.set("age", [obj2AgeFn1, obj2AgeFn2])
weakMap.set(obj2, obj2Map)

// 2.2 对obj3收集的数据结构
const obj3Map = new Map()
obj3Map.set("name", [obj3NameFn1, obj3NameFn2])
weakMap.set(obj3, obj3Map)

// 3. 如果Obj2.name 发生了改变
obj2.name = "james"
const targetMap = weakMap.get(obj2)
const fns = targetMap.get("name")
fns.forEach(fn => fn())