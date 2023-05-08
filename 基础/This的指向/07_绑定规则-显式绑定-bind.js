function foo() {
    console.log(this)
}
// 默认绑定和显式绑定bind冲突: 优先级(显式绑定更高)
var newFoo = foo.bind("aaa")

newFoo()