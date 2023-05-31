function foo() {
    var name = "lau"
    var age = 18 // age 属性 在 AO 中是否存在? JS引擎会自动把 age 优化掉
    function bar() {
        console.log(name)
    }
    return bar
}

var fn = foo()
fn()