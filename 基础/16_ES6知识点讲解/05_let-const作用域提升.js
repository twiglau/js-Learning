
// console.log(foo) // undefined
// var foo = "foo"

//ReferenceError: Cannot access 'foo' before initialization
// let/const 它们是没有作用域提升的
// foo被创建出来了, 但是不能被访问
// 作用域提升: 能提前被访问
console.log(foo)
let foo = "foo"