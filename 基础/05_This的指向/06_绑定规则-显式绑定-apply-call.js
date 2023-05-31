function foo() {
    console.log("函数被调用了")
}

// foo直接调用 和 call/apply 调用的不同 在于this绑定的不同
// foo直接调用指向的全局对象(window)
foo()

var obj = { name: "obj"}

// 手动方式 指定this的绑定对象
foo.call(obj)
foo.apply(obj)
foo.apply("aaaa")

// 2. call和apply有什么区别?
function sum(num1, num2) {
    console.log(num1 + num2, this)
}
sum.call("call", 10, 20)
sum.apply("apply", [10, 20])

// 3. call和apply在执行函数时, 是可以明确的绑定this, 这个绑定规则称之为显式绑定