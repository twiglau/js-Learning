var a = 100

function foo() {
    console.log(a)
    return
    var a = 100
}

foo()

// GO: { a: 100, foo: 0xa00}
// AO: { a: undefined }