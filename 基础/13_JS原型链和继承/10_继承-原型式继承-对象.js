var obj = {
    name: "why",
    age: 18
}

// 原型式继承函数

// 1. 方式一
function createObject1(o) {
    var newObj = {}
    Object.setPrototypeOf(newObj, o)
    return newObj
}

// 2. 方式二
function createObject2(o) {
    function Fn() {}
    Fn.prototype = o
    var newObj = new Fn()
    // 相当于这个语句, 注意: 不要用这种方式进行赋值操作
    // __proto__ 兼容性问题
    // newObj.__proto__ = 0 
    return newObj
}

// 3. 方式三
var info = Object.create(obj)

console.log(info)
console.log(info.__proto__)