var obj1 = {
    name: "obj1",
    foo: function() {
        console.log(this)
    }
}

var obj2 = {
    name: "obj2"
};

// 1.
// obj2.bar = obj1.foo
// obj2.bar()

// 2. 当做: 独立的函数调用
// 如果 obj2 定义结尾,没有添加分号,会将一下代码看做为 一个整体
// var obj2 = {
//     name: "obj2"
// }(obj2.bar = obj1.foo)()

(obj2.bar = obj1.foo)()
