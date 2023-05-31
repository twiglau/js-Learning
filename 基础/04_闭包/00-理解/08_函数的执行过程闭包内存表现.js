function foo() {
    var name = "foo"
    var age = 10
    function bar() {
        console.log(name)
        console.log(age)
    }
    return bar
}

var fn = foo()
fn()