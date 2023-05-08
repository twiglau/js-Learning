var obj = {
    name: "obj",
    foo: function() {
        console.log(this)
    }
}

// 隐式绑定
obj.foo()

// 1. call/apply 显式绑定 > 隐式绑定
// 隐式绑定 + 显式绑定: 显式绑定 优先级 高
obj.foo.call('abc')

// 2. bind 隐式绑定
var bar = obj.foo.bind("cba")
bar()

// 3. 更明显的比较
function foo() {
    console.log(this)
}
var obj1 = {
    name: 'obj1',
    foo: foo.bind('aaa')
}

obj1.foo()