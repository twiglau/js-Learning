function foo() {
    console.log(n) // undefined
    var n = 200
    console.log(n) // 200
}
var n = 100
foo()