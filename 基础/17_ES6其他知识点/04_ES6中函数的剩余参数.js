function foo(m, n, ...args) {
    console.log(m,n, ...args)
    console.log(args)
    console.log(arguments)
}

foo(20, 30, 40, 50, 60)