var message = "Hello Global"

function foo() {
    console.log(message)
}
function bar() {
    var message = "Hello bar"
    foo()
}

bar()