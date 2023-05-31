function foo() {
    // 1.
    // var m = 100 

    // 2.
    m = 100 //如果没有 var 来定义, 会认为定义在全局对象里面的

}

foo()

console.log(m) 
// 1. ReferenceError: m is not defined
// 2. 去掉 var 会输出 100