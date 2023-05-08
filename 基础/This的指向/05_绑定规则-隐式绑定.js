// 隐式绑定: obj.fn()
// obj 对象会被js引擎绑定到fn函数中this里面

// 1. 案例
function foo() {
    console.log(this)
}
var obj = { name: "lau", foo: foo }
obj.foo()

// 2. 案例
var obj = {
    name: 'lau',
    eating:function() {
        console.log(this.name + "eating")
    },
    running:function() {
        console.log(obj.name + "running")
    }
}
obj.eating()
obj.running()

// 2.1 独立函数调用: this 指向 window, 就不是 obj对象了
var fn = obj.eating
fn()

// 3. 案例
var obj1 = {
    name: "obj1",
    foo: function() {
        console.log(this.name)
    }
}
var obj2 = {
    name: "obj2",
    bar: obj1.foo
}

obj2.bar()