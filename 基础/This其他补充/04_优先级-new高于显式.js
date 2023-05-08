// 结论: new 关键字不能与 apply, call 一起使用

// new的优先级 高于 bind
function foo() {
    console.log(this)
}

var bar = foo.bind('aaa')
var obj = new bar()

foo.bind("bind").call("call")

// new 绑定 > 显式绑定(apply/call/bind) > 隐式绑定(obj.foo()) > 默认绑定(独立函数调用)