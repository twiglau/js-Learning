// 1 默认绑定: 独立函数调用
function foo() {
    console.log(this)
}

foo()

// 2 案例
function foo1() {
    console.log(this)
}
function foo2() {
    console.log(this)
    foo1()
}
function foo3() {
    console.log(this)
    foo2()
}

foo3()


// 3 案例三
var obj = {
    name: "twig",
    foo:function() {
        console.log(this)
    }
}
var bar = obj.foo
bar() // 独立函数调用, 和定义的位置是没有关系的, 没有主体

// 4 案例四
function foo() {
    console.log(this)
}
var obj = {
    name: "lau",
    foo: foo
}
var bar = obj.foo
bar()

// 5 案例五
function foo() {
    function bar() {
        console.log(this)
    }
    return bar
}
var fn = foo()
fn()