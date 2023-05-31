function foo() {
    console.log(this)
}

foo.apply("abc")
foo.call({})

// apply/call/bind: 内部当传入 null/undefined时, 会自动将this绑定为全局对象
foo.apply(null)
foo.call(undefined)

var bar = foo.bind(null)
bar() 
